import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Latency = ({ async }) => {
  const handleChange = event => {
    fetch(
      `http://localhost:4200/debounce-network/${event.target.value * 1000}`
    );
  };

  useEffect(() => handleChange({ target: { value: 2 } }));

  return (
    <Container>
      <label htmlFor="latency-slider">Latency (s)</label>
      <p>
        0
        <input
          type="range"
          defaultValue="2"
          min="0"
          max="5"
          step="1"
          onChange={handleChange}
        />
        5
      </p>
    </Container>
  );
};

export default Latency;
