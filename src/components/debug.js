import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: white;
  border: 2px solid black;
`;

const Debug = ({ async, syncRender, asyncRender }) => {
  const syncChange = () => {
    console.log("coucou sync");
    syncRender();
  };
  const asyncChange = () => {
    console.log("coucou async");
    asyncRender();
  };
  return (
    <Container>
      <label htmlFor="sync">Normal rendering</label>
      <input
        type="radio"
        name="render"
        value="sync"
        checked={!async}
        id="sync"
        onChange={syncChange}
      />
      <label htmlFor="async">Concurrent rendering</label>
      <input
        type="radio"
        name="render"
        value="async"
        checked={async}
        id="async"
        onChange={asyncChange}
      />
    </Container>
  );
};

export default Debug;
