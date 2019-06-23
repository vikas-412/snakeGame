import React from 'react';

const Comp1 = props => {
  return (
    <h1>
      {props.name} {props.lastName}
    </h1>
  );
};

function withProps(lastName) {
  return C => {
    return props => {
      return <C {...props} lastName="Bhardwaj" />;
    };
  };
}
const x = withProps('Bhardwaj')(Comp1);
export default x;
