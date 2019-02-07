import React from "react";
import styled, { css } from "styled-components";

const PokemonImage = styled.img`
  position: absolute;

  ${({ position }) =>
    position === "first"
      ? css`
          left: 100px;
          bottom: 120px;
        `
      : css`
          right: 100px;
          top: 150px;
        `}
`;

const StatBar = styled.div`
  position: absolute;

  ${({ position }) =>
    position === "first"
      ? css`
          bottom: 20px;
          left: 20px;
        `
      : css`
          top: 50px;
          right: 20px;
        `}
`;

const StatBarName = styled.h2`
  color: white;
  font-size: 20px;
  font-family: pokemon;
  text-shadow: 0 0 5px black;
`;

const LifeBarSection = styled.div`
  background-color: blue;
  border-radius: 3px;
  border: 2px solid dodgerblue;
  padding: 5px;
`;

const LifeBarContainer = styled.div`
  border: 2px solid black;
  border-radius: 3px;
  height: 20px;
  width: 200px;
`;

const getColor = health => {
  if (health > 0.5) {
    return "lime";
  }
  if (health > 0.2) {
    return "orange";
  }
  return "red";
};

const LifeBar = styled.div`
  height: 100%;
  width: ${({ health }) => health * 100 + "%"};
  background-color: ${({ health }) => getColor(health)};
`;

const LifeBarNumbers = styled.p`
  margin-top: 5px;
  color: white;
`;

const getImage = (position, name) =>
  position === "first"
    ? `/api/img/back/${name}.gif`
    : `/api/img/${name}.gif`;

const Opponent = ({ position, data }) => (
  <>
    <PokemonImage
      position={position}
      src={getImage(position, data.name)}
      alt={data.name}
    />
    <StatBar position={position}>
      <StatBarName>{data.name}</StatBarName>
      <LifeBarSection>
        <LifeBarContainer>
          <LifeBar health={data.hp.current / data.hp.init} />
        </LifeBarContainer>
        <LifeBarNumbers>
          {data.hp.current} / {data.hp.init}
        </LifeBarNumbers>
      </LifeBarSection>
    </StatBar>
  </>
);

export default Opponent;
