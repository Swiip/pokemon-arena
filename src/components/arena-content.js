import React from "react";
import styled from "styled-components";
import { unstable_createResource as createResource } from "react-cache";

const Container = styled.div`
  max-width: 600px;
  min-height: 400px;
  width: 100%;
  margin: 0 auto;
  background-image: url("/battle.jpg");
  background-size: cover;
  position: relative;
`;

const timeout = duration =>
  new Promise(resolve => setTimeout(resolve, duration));

const fetchApi = async name => {
  await timeout(1000);
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  const result = await response.json();
  return result;
};

const ApiResource = createResource(fetchApi);

const getHp = data =>
  data.stats.find(stat => stat.stat.name === "hp").base_stat;

const Pokemon = styled.img`
  position: absolute;
`;

const PokemonFirst = styled(Pokemon)`
  left: 100px;
  bottom: 120px;
`;

const PokemonSecond = styled(Pokemon)`
  right: 100px;
  top: 150px;
`;

const StatBar = styled.div`
  position: absolute;
`;

const StatBarFirst = styled(StatBar)`
  bottom: 20px;
  left: 20px;
`;

const StatBarSecond = styled(StatBar)`
  top: 50px;
  right: 20px;
`;

const StatBarName = styled.h2`
  color: white;
  font-size: 20px;
  font-family: pokemon;
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
  } else if (health > 0.2) {
    return "orange";
  } else {
    return "red";
  }
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

const ArenaContent = ({ match }) => {
  const { first, second } = match.params;
  const data = [ApiResource.read(first), ApiResource.read(second)];

  return (
    <Container>
      <PokemonFirst
        src={`http://www.pokestadium.com/sprites/xy/back/${first}.gif`}
        alt={first}
      />
      <StatBarFirst>
        <StatBarName>{first}</StatBarName>
        <LifeBarSection>
          <LifeBarContainer>
            <LifeBar health={getHp(data[0]) / getHp(data[0])} />
          </LifeBarContainer>
          <LifeBarNumbers>
            {getHp(data[0])} / {getHp(data[0])}
          </LifeBarNumbers>
        </LifeBarSection>
      </StatBarFirst>
      <PokemonSecond src={`http://localhost:4200/${second}.gif`} alt={second} />
      <StatBarSecond>
        <StatBarName>{second}</StatBarName>
        <LifeBarSection>
          <LifeBarContainer>
            <LifeBar health={getHp(data[1]) / getHp(data[1])} />
          </LifeBarContainer>
          <LifeBarNumbers>
            {getHp(data[1])} / {getHp(data[1])}
          </LifeBarNumbers>
        </LifeBarSection>
      </StatBarSecond>
    </Container>
  );
};

export default ArenaContent;
