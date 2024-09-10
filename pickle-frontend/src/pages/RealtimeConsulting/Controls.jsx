import React from 'react';
import styled from 'styled-components';

const Controls = ({ muted, cameraOff, onMuteClick, onCameraClick, onShareClick }) => {
	return (
		<ControlsContainer>
			<ControlButton active={!muted} onClick={onMuteClick}>
				{muted ? '마이크 켜기' : '마이크 끄기'}
			</ControlButton>
			<ControlButton active={!cameraOff} onClick={onCameraClick}>
				{cameraOff ? '카메라 켜기' : '카메라 끄기'}
			</ControlButton>
			<ControlButton onClick={onShareClick}>화면 공유하기</ControlButton>
		</ControlsContainer>
	);
};

const ControlsContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px;
	background-color: #2a2a2a;
`;

const ControlButton = styled.button`
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

export default Controls;
