import React, { useState, useEffect, useRef } from 'react';
import { Mic, Video, MonitorUp, MessageCircle, Send, PhoneOff } from 'lucide-react';
import {
	Container,
	VideoContainer,
	SmallVideo,
	ControlsContainer,
	ControlButton,
	ChatContainer,
	ChatMessages,
	ChatInputContainer,
	ChatInput,
	SendButton,
	Timer,
	DeviceSelect,
} from './ConsultingSession.style';

const DEVICE_TYPES = {
	AUDIO: 'audioinput',
	VIDEO: 'videoinput',
};

const ACTION_STREAM_TYPES = {
	PEERFACE: 'peerface',
	SCREENSHARE: 'screenshare',
	STOP_PEERFACE: 'stopPeerface',
	STOP_SCREENSHARE: 'stopScreenshare',
};

const MESSAGE_TYPES = { METADATA: 'metadata', CHAT: 'chat', SYSTEM: 'system' };

const ConsultingSession = ({ userId, userName, roomId, socket, onLeave }) => {
	const [muted, setMuted] = useState(false);
	const [cameraOff, setCameraOff] = useState(false);
	const [isScreenSharing, setIsScreenSharing] = useState(false);
	const [isPeerScreenSharing, setIsPeerScreenSharing] = useState(false);
	const [chatMessages, setChatMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState('');
	const [elapsedTime, setElapsedTime] = useState(0);
	const [cameras, setCameras] = useState([]);
	const [microphones, setMicrophones] = useState([]);
	const [selectedCamera, setSelectedCamera] = useState('');
	const [selectedMicrophone, setSelectedMicrophone] = useState('');
	const [isChatVisible, setIsChatVisible] = useState(false);

	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const [chatPosition, setChatPosition] = useState({ x: 20, y: 20 });

	const myVideoRef = useRef();
	const peerVideoRef = useRef();
	const sharedScreenRef = useRef();
	const myStreamRef = useRef();
	const screenStreamRef = useRef();
	const peerConnectionRef = useRef();
	const dataChannelRef = useRef();
	const chatContainerRef = useRef();

	useEffect(() => {
		if (!socket) return;

		const initializeSession = async () => {
			await getMedia();
			makeConnection();

			await createAndSendOffer();

			socket.on('offer', handleReceiveOffer);
			socket.on('answer', handleAnswer);
			socket.on('ice', handleNewICECandidateMsg);
		};

		initializeSession();

		const timer = setInterval(() => {
			setElapsedTime((prev) => prev + 1);
		}, 1000);

		return () => {
			socket.off('offer');
			socket.off('answer');
			socket.off('ice');
			cleanupResources();
			clearInterval(timer);
		};
	}, [socket, roomId]);

	const createAndSendOffer = async () => {
		try {
			const offer = await peerConnectionRef.current.createOffer();
			await peerConnectionRef.current.setLocalDescription(offer);
			socket.emit('offer', { offer, roomId });
			console.log('Offer created and sent');
		} catch (error) {
			console.error('Error creating or sending offer:', error);
		}
	};
	const getMedia = async (deviceId) => {
		const constraints = {
			audio: deviceId ? { deviceId: { exact: deviceId } } : true,
			video: deviceId ? { deviceId: { exact: deviceId } } : { facingMode: 'user' },
		};

		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			myStreamRef.current = stream;
			myVideoRef.current.srcObject = stream;
			if (!deviceId) {
				await getCameras();
				await getMicrophones();
			}
		} catch (error) {
			console.error('getMedia error:', error);
			handleGetMediaError(error);
		}
	};

	const getCameras = async () => {
		try {
			const devices = await navigator.mediaDevices.enumerateDevices();
			const cameraDevices = devices.filter((device) => device.kind === 'videoinput');
			setCameras(cameraDevices);
			if (cameraDevices.length > 0) {
				setSelectedCamera(cameraDevices[0].deviceId);
			}
		} catch (error) {
			console.error('Error getting cameras:', error);
		}
	};

	const getMicrophones = async () => {
		try {
			const devices = await navigator.mediaDevices.enumerateDevices();
			const microphoneDevices = devices.filter((device) => device.kind === 'audioinput');
			setMicrophones(microphoneDevices);
			if (microphoneDevices.length > 0) {
				setSelectedMicrophone(microphoneDevices[0].deviceId);
			}
		} catch (error) {
			console.error('Error getting microphones:', error);
		}
	};

	const makeConnection = () => {
		peerConnectionRef.current = new RTCPeerConnection({
			iceServers: [
				{ urls: 'stun:stun.l.google.com:19302' },
				{ urls: 'stun:stun1.l.google.com:19302' },
				{ urls: 'stun:stun2.l.google.com:19302' },
				{ urls: 'stun:stun3.l.google.com:19302' },
				{ urls: 'stun:stun4.l.google.com:19302' },
			],
		});

		dataChannelRef.current = peerConnectionRef.current.createDataChannel('communication');
		dataChannelRef.current.onmessage = handleDataChannelMessageReceived;
		dataChannelRef.current.onopen = () => console.log('Data channel is open');
		dataChannelRef.current.onclose = () => console.log('Data channel is closed');

		peerConnectionRef.current.onicecandidate = handleIceCandidate;
		peerConnectionRef.current.ontrack = handleTrackEvent;
		peerConnectionRef.current.oniceconnectionstatechange = handleICEConnectionStateChange;

		myStreamRef.current.getTracks().forEach((track) => {
			peerConnectionRef.current.addTrack(track, myStreamRef.current);
		});

		peerConnectionRef.current.ondatachannel = (event) => {
			dataChannelRef.current = event.channel;
			dataChannelRef.current.onmessage = handleDataChannelMessageReceived;
		};
	};
	const handleChatToggle = () => {
		setIsChatVisible((prevState) => !prevState);
	};

	const handleMouseDown = (e) => {
		setIsDragging(true);
		const chatRect = chatContainerRef.current.getBoundingClientRect();
		setDragOffset({
			x: e.clientX - chatRect.left,
			y: e.clientY - chatRect.top,
		});
		chatContainerRef.current.style.cursor = 'grabbing';
	};

	const handleMouseMove = (e) => {
		if (!isDragging) return;
		const newX = e.clientX - dragOffset.x;
		const newY = e.clientY - dragOffset.y;
		setChatPosition({ x: newX, y: newY });
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		chatContainerRef.current.style.cursor = 'grab';
	};

	useEffect(() => {
		if (isDragging) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
		}
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging]);

	const handleIceCandidate = (event) => {
		if (event.candidate) {
			socket.emit('ice', { ice: event.candidate, roomId });
		}
	};

	const handleTrackEvent = (event) => {
		const [stream] = event.streams;
		if (event.track.kind === 'video') {
			if (isPeerScreenSharing) {
				sharedScreenRef.current.srcObject = stream;
			} else {
				peerVideoRef.current.srcObject = stream;
			}
		}
	};

	const handleICEConnectionStateChange = () => {
		if (peerConnectionRef.current) {
			const state = peerConnectionRef.current.iceConnectionState;
			if (state === 'disconnected' || state === 'failed' || state === 'closed') {
				handlePeerDisconnection();
			}
		}
	};

	const handlePeerDisconnection = () => {
		addSystemMessageToChat('상대방과의 연결이 끊어졌습니다.');
		// TODO: 내 공유 화면 및 비디오 초기화
	};
	const handleReceiveOffer = async (offer) => {
		console.log('Offer received');
		try {
			await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
			const answer = await peerConnectionRef.current.createAnswer();
			await peerConnectionRef.current.setLocalDescription(answer);
			socket.emit('answer', { answer, roomId });
			console.log('Answer created and sent');
		} catch (error) {
			console.error('Error handling received offer:', error);
		}
	};

	const handleAnswer = (answer) => {
		console.log('answer한다~!');
		peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
	};

	const handleNewICECandidateMsg = async (incoming) => {
		if (!incoming || !incoming.candidate) {
			console.error('Invalid ICE candidate received:', incoming);
			return;
		}

		try {
			const candidate = new RTCIceCandidate(incoming);
			await peerConnectionRef.current.addIceCandidate(candidate);
			console.log('Successfully added ICE candidate');
		} catch (e) {
			console.error('Error adding received ICE candidate:', e);
		}
	};

	const handleCameraClick = () => {
		if (myStreamRef.current) {
			const videoTrack = myStreamRef.current.getVideoTracks()[0];
			videoTrack.enabled = !videoTrack.enabled;
			setCameraOff(!videoTrack.enabled);
		}
	};

	const handleScreenShare = async () => {
		if (!isScreenSharing) {
			try {
				const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
				screenStreamRef.current = stream;
				sharedScreenRef.current.srcObject = stream;
				setIsScreenSharing(true);
				stream.getTracks().forEach((track) => {
					peerConnectionRef.current.addTrack(track, stream);
				});
				sendStreamMetadata(ACTION_STREAM_TYPES.SCREENSHARE);
			} catch (error) {
				console.error('Error sharing screen:', error);
			}
		} else {
			stopScreenShare();
		}
	};

	const stopScreenShare = () => {
		if (screenStreamRef.current) {
			screenStreamRef.current.getTracks().forEach((track) => track.stop());
			setIsScreenSharing(false);
			sharedScreenRef.current.srcObject = null;
			sendStreamMetadata(ACTION_STREAM_TYPES.STOP_SCREENSHARE);
		}
	};

	const handleSendMessage = () => {
		if (inputMessage.trim() && dataChannelRef.current) {
			const messageData = {
				senderId: userId,
				senderName: userName,
				content: inputMessage,
			};
			sendChatMessage(messageData);
			addMessageToChat('나', inputMessage);
			setInputMessage('');
		}
	};
	const sendChatMessage = (messageData) => {
		sendDataChannelMessage(MESSAGE_TYPES.CHAT, messageData);
	};

	const sendDataChannelMessage = (type, content) => {
		if (dataChannelRef.current && dataChannelRef.current.readyState === 'open') {
			const message = JSON.stringify({ type, content });
			dataChannelRef.current.send(message);
		}
	};
	const handleDataChannelMessageReceived = (event) => {
		const message = JSON.parse(event.data);
		switch (message.type) {
			case MESSAGE_TYPES.METADATA:
				handleStreamMetadata(message.content.action);
				break;
			case MESSAGE_TYPES.CHAT:
				const { senderId, senderName, content } = message.content;
				const sender = senderId === userId ? '나' : senderName;
				addMessageToChat(sender, content);
				break;
			case MESSAGE_TYPES.SYSTEM:
				addSystemMessageToChat(message.content);
				break;
		}
	};
	const addMessageToChat = (sender, message) => {
		setChatMessages((prev) => [...prev, { sender, message }]);
	};

	const addSystemMessageToChat = (message) => {
		setChatMessages((prev) => [...prev, { sender: 'PICKLE', message, isSystem: true }]);
	};

	const handleStreamMetadata = (streamType) => {
		switch (streamType) {
			case ACTION_STREAM_TYPES.SCREENSHARE:
				setIsPeerScreenSharing(true);
				break;
			case ACTION_STREAM_TYPES.STOP_SCREENSHARE:
				setIsPeerScreenSharing(false);
				if (sharedScreenRef.current) sharedScreenRef.current.srcObject = null;
				break;
		}
	};

	const sendStreamMetadata = (streamType) => {
		sendDataChannelMessage(MESSAGE_TYPES.METADATA, { action: streamType });
	};

	const cleanupResources = () => {
		if (myStreamRef.current) {
			myStreamRef.current.getTracks().forEach((track) => track.stop());
		}
		if (screenStreamRef.current) {
			screenStreamRef.current.getTracks().forEach((track) => track.stop());
		}
		if (peerConnectionRef.current) {
			peerConnectionRef.current.close();
		}
		if (dataChannelRef.current) {
			dataChannelRef.current.close();
		}
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	const handleCameraChange = async (event) => {
		const newDeviceId = event.target.value;
		setSelectedCamera(newDeviceId);
		await getMedia(newDeviceId);
	};

	const handleMicrophoneChange = async (event) => {
		const newDeviceId = event.target.value;
		setSelectedMicrophone(newDeviceId);
		await getMedia(newDeviceId);
	};

	const handleGetMediaError = (error) => {
		console.error('Media error:', error);
		addSystemMessageToChat('미디어 장치를 가져오는 중 오류가 발생했습니다.');
	};
	const handleMuteClick = () => {
		if (myStreamRef.current) {
			const audioTrack = myStreamRef.current.getAudioTracks()[0];
			if (audioTrack) {
				audioTrack.enabled = !audioTrack.enabled;
				setMuted(!audioTrack.enabled);
			}
		}
	};

	return (
		<Container>
			<VideoContainer>
				<video ref={peerVideoRef} autoPlay playsInline />
				<SmallVideo ref={myVideoRef} autoPlay playsInline muted />
				<Timer>진행시간 {formatTime(elapsedTime)}</Timer>
			</VideoContainer>

			<ControlsContainer>
				<ControlButton onClick={handleMuteClick} active={!muted}>
					<Mic size={24} />
				</ControlButton>
				<ControlButton onClick={handleCameraClick} active={!cameraOff}>
					<Video size={24} />
				</ControlButton>
				<ControlButton onClick={handleScreenShare} active={isScreenSharing}>
					<MonitorUp size={24} />
				</ControlButton>
				<ControlButton onClick={handleChatToggle}>
					<MessageCircle size={24} />
				</ControlButton>
				<ControlButton onClick={onLeave} style={{ backgroundColor: '#dc3545' }}>
					<PhoneOff size={24} />
				</ControlButton>
			</ControlsContainer>

			<DeviceSelect>
				<select value={selectedCamera} onChange={handleCameraChange}>
					{cameras.map((camera) => (
						<option key={camera.deviceId} value={camera.deviceId}>
							{camera.label}
						</option>
					))}
				</select>
				<select value={selectedMicrophone} onChange={handleMicrophoneChange}>
					{microphones.map((microphone) => (
						<option key={microphone.deviceId} value={microphone.deviceId}>
							{microphone.label}
						</option>
					))}
				</select>
			</DeviceSelect>
			{isChatVisible && (
				<ChatContainer
					ref={chatContainerRef}
					onMouseDown={handleMouseDown}
					style={{
						position: 'absolute',
						top: `${chatPosition.y}px`,
						left: `${chatPosition.x}px`,
						cursor: isDragging ? 'grabbing' : 'grab',
					}}
				>
					<ChatMessages>
						{chatMessages.map((msg, index) => (
							<p key={index} style={{ color: msg.isSystem ? 'lightblue' : 'white' }}>
								<strong>{msg.sender}:</strong> {msg.message}
							</p>
						))}
					</ChatMessages>
					<ChatInputContainer>
						<ChatInput
							type="text"
							placeholder="메시지를 입력하세요..."
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
						/>
						<SendButton onClick={handleSendMessage}>
							<Send size={20} />
						</SendButton>
					</ChatInputContainer>
				</ChatContainer>
			)}
		</Container>
	);
};

export default ConsultingSession;
