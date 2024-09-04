import styled, { css, keyframes } from 'styled-components';
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

export const SmallVideo = styled.video`
	position: absolute;
	width: 200px;
	height: 150px;
	bottom: 20px;
	right: 20px;
	border-radius: 10px;
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
`;

export const ChatMessages = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 10px;
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
