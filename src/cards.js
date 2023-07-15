import React from 'react';

const Cards = ({ array }) => {
  return (
    <div>
      {array.map((element, index) => (
        <div key={index}>{element}</div>
      ))}
    </div>
  );
};

export default Cards;
