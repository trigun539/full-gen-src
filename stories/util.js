import React from 'react';

const centerCSS = {
  display: 'flex',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center'
};

const Center = ({ children }) => {
  return (
    <div style={ centerCSS }>
      { children }
    </div>
  );
}

export default Center;
