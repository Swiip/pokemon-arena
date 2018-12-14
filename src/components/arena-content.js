import React from "react";

const ArenaContent = ({ match }) => {
  const { first, second } = match.params;

  return (
    <div>
      <img
        src={`http://www.pokestadium.com/sprites/xy/${first}.gif`}
        alt={first}
      />
      <img
        src={`http://www.pokestadium.com/sprites/xy/${second}.gif`}
        alt={second}
      />
    </div>
  );
};

export default ArenaContent;
