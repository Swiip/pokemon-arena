import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-family: "Pokemon";
  font-size: 1.5rem;

  position: fixed;
  width: 150px;
  height: 150px;

  left: 50%;
  top: 50%;

  margin-left: -75px;
  margin-top: -75px;

  padding: 8px;

  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.24);
  cursor: pointer;

  border: 2px solid rgba(255, 0, 0, 0.9);
  background-color: rgba(255, 255, 255, 0.9);
  color: rgba(255, 0, 0, 0.8);

  transition: all 0.3s;
  &:hover {
    background-color: rgba(255, 255, 255, 1);
    border: 3px solid rgba(255, 0, 0, 1);
    color: rgba(255, 0, 0, 1);
  }
  &[disabled] {
    filter: grayscale(100%);
  }
`;

const FightButton = ({ first, second }) => (
  <Button type="submit" disabled={!first || !second}>
    Fight!
  </Button>
);

export default FightButton;
