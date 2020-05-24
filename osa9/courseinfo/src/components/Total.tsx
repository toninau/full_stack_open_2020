import React from 'react';

const Total: React.FC<{ total: number }> = ({ total }) => (
  <p>Number of exercises {total}</p>
);

export default Total;

