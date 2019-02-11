import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
  display: block;
  padding: 1rem 1.5rem;
  position: absolute;
  left: 2vw;
  top: 2vh;

  border-radius: 8px;
  border: 1px solid black;

  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  text-decoration: none;

  transition: all 0.3s linear;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const BackButton = ({ to }) => <Button to={to}>Back</Button>;

export default BackButton;
