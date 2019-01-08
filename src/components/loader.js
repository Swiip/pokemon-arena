import React from 'react';
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(360deg);
  }
`;

const Pokeball = styled.svg`
  width: 100%;
  height: 100%;
  animation: ${rotate} 3s linear infinite;
`;

const alternateFill = keyframes`
  0% {
    fill: #FFFFFF;
  }

  50% {
    fill: #FF0000;
  }

  100% {
    fill: #FFFFFF;
  }
`;

const MiddleCircle = styled.circle`
  animation: ${alternateFill} 10s linear infinite;
`;

const Loader = () => {
  return (
    <Pokeball viewBox="0 0 100 100">
     <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="4" />
     <path d="M5,50 h90 a45,45,0,0,1,-90,0" fill="red" stroke="black" strokeWidth="4" />
     <circle cx="50" cy="50" r="15" fill="white" stroke="black" strokeWidth="4" />
     <MiddleCircle cx="50" cy="50" r="8" fill="white" stroke="black" strokeWidth="2" />
    </Pokeball>
  );
}

export default Loader;
