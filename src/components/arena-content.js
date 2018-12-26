import React from "react";

const ArenaContent = ({ match }) => {
  const { first, second } = match.params;

  return (
    <div>
      <img
        src={`http://localhost:4200/${first}.gif`}
        alt={first}
      />
      <img
        src={`http://localhost:4200/${second}.gif`}
        alt={second}
      />
    </div>
  );
};

export default ArenaContent;
