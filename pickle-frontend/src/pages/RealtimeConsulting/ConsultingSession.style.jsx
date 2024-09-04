import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #1a1a1a;
	color: white;
`;

export const VideoContainer = styled.div`
	display: flex;
	flex: 1;
	position: relative;
	background-color: #2a2a2a;
	border-radius: 10px;
	overflow: hidden;
	margin: 20px;
`;

export const Video = styled.video`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const ControlsContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px;
	background-color: #2a2a2a;
`;

export const ControlButton = styled.button`
	background-color: ${(props) => (props.active ? '#4a4a4a' : '#3a3a3a')};
	color: white;
	border: none;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	margin: 0 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #5a5a5a;
	}
`;

export const ChatContainer = styled.div`
	position: absolute;
	right: 20px;
	top: 20px;
	width: 300px;
	height: calc(100% - 140px);
	background-color: rgba(42, 42, 42, 0.8);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	cursor: grab;
	animation: ${fadeIn} 0.5s ease-in-out;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

	&:active {
		cursor: grabbing;
	}
`;

export const ChatMessages = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 10px;
	scrollbar-width: thin;
	scrollbar-color: #3a3a3a transparent;

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #3a3a3a;
		border-radius: 10px;
	}
`;

export const ChatInputContainer = styled.div`
	display: flex;
	padding: 10px;
`;

export const ChatInput = styled.input`
	flex: 1;
	padding: 10px;
	border: none;
	border-radius: 20px;
	background-color: #3a3a3a;
	color: white;
`;

export const SendButton = styled.button`
	background-color: #4a4a4a;
	color: white;
	border: none;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	margin-left: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	&:hover {
		background-color: #5a5a5a;
	}
`;

export const Timer = styled.div`
	position: absolute;
	top: 20px;
	left: 20px;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 5px 10px;
	border-radius: 15px;
	font-size: 14px;
`;

export const DeviceSelect = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-bottom: 10px;

	select {
		padding: 5px;
		border-radius: 5px;
		border: 1px solid #ccc;
		background-color: white;
		font-size: 14px;
	}
`;

export const SharedScreenContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.8);

	video {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
`;
export const VideoGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1rem;
	width: 100%;
	height: 100%;
`;
export const VideoWrapper = styled.div`
	position: relative;
	width: 50%;
	height: 100%;
`;

export const VideoLayout = styled.div`
	display: flex;
	flex-direction: ${(props) => (props.isBothSharing ? 'column' : 'row')};
	height: 100%;
`;

export const MainVideo = styled.video`
	width: ${(props) => {
		if (!props.isSharing) return '50%';
		if (props.isBothSharing) return '50%';
		return '70%';
	}};
	height: ${(props) => {
		if (!props.isSharing) return '100%';
		if (props.isBothSharing) return '70%';
		return '100%';
	}};
	object-fit: cover;
`;

export const SecondaryVideos = styled.div`
	display: flex;
	flex-direction: ${(props) => (props.isBothSharing ? 'row' : 'column')};
	width: ${(props) => (props.isBothSharing ? '100%' : '30%')};
	height: ${(props) => (props.isBothSharing ? '30%' : '100%')};
`;

export const SmallVideo = styled.video`
	width: ${(props) => (props.isBothSharing ? '50%' : '100%')};
	height: ${(props) => (props.isBothSharing ? '100%' : '50%')};
	object-fit: cover;
`;

export const PlaceholderVideo = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #2a2a2a;
	color: white;

	p {
		margin-top: 10px;
		font-size: 18px;
	}
`;
