import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

const attack = keyframes`
  from {
    transform: translateX(0);
  }


  20% {
    transform: translateX(0);
  }

  60% {
    transform: translate3d(250px, -60px, 0);
  }

  to {
    transform: translateX(0);
  }
`;

const attackSecond = keyframes`
  from {
    transform: translateX(0);
  }

  20% {
    transform: translateX(0);
  }

  60% {
    transform: translate3d(-250px, 60px, 0);
  }

  to {
    transform: translateX(0);
  }
`;

const PokemonImageContainer = styled.div`
  position: absolute;
  height: 62px;

  ${({ attacking, position }) =>
    attacking && position === "first"
      ? css`
          animation: ${attack} 1s linear 1;
        `
      : attacking
      ? css`
          animation: ${attackSecond} 1s linear 1;
        `
      : css``}


      ${({ targeted, dead }) =>
        targeted
          ? css`
              ::after {
                content: "";
                display: block;
                width: 100%;
                height: 100%;
                background: url("../../Attaque.svg");
                background-repeat: no-repeat;
                background-size: cover;
                position: absolute;
                z-index: 2;
                left: 0;
                top: 0;
              }
            `
          : dead
          ? css`
              ::after {
                content: "";
                display: block;
                width: 100%;
                height: 100%;
                background: url("../../Nuage.svg");
                background-repeat: no-repeat;
                position: absolute;
                z-index: 2;
                left: 0;
                top: 0;
              }
            `
          : css``}


  ${({ position }) =>
    position === "first"
      ? css`
          z-index: 1;
          left: 100px;
          bottom: 120px;
        `
      : css`
          right: 100px;
          top: 150px;
        `}
`;

const PokemonImage = styled.img`
  height: 100%;
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
  position === "first" ? `/api/img/back/${name}.gif` : `/api/img/${name}.gif`;

const Opponent = ({ position, data, attacking, dead }) => {
  const [isAnimationStarted, setAnimation] = useState(false);
  const [targeted, setTargeted] = useState(false);

  useEffect(
    () => {
      if (!attacking) {
        setTargeted(true);

        setTimeout(() => {
          setTargeted(false);
        }, 500);
        return;
      }
      setAnimation(true);

      setTimeout(() => {
        setAnimation(false);
      }, 1500);
    },
    [attacking]
  );

  return (
    <>
      <PokemonImageContainer
        position={position}
        attacking={isAnimationStarted}
        targeted={targeted}
        dead={dead}
      >
        <PokemonImage src={getImage(position, data.name)} alt={data.name} />
      </PokemonImageContainer>
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
};

export default Opponent;
