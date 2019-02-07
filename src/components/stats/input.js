import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  unstable_LowPriority as LowPriority,
  unstable_runWithPriority as runWithPriority,
  unstable_scheduleCallback as scheduleCallback
} from "scheduler";

const InputContainer = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputTag = styled.input`
  font-size: 24px;
  border: 2px solid black;
  border-radius: 3px;
  width: 300px;
  text-align: center;
  margin: 10px;
`;

const Input = ({ async, onChange }) => {
  const [count, setCount] = useState(10);

  useEffect(() => onChange(count), [count, onChange]);

  const changeHandler = event => {
    const newCount = parseInt(event.target.value, 10);
    setCount(newCount);

    if (async) {
      runWithPriority(LowPriority, () => {
        scheduleCallback(() => {
          onChange(newCount);
        });
      });
    } else {
      onChange(newCount);
    }
  };

  return (
    <InputContainer>
      Show first
      <InputTag type="number" value={count} onChange={changeHandler} />
      Pokemons:
    </InputContainer>
  );
};

export default Input;
