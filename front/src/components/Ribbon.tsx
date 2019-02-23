import * as React from 'react';

const Ribbon = () => (
  <div
    style={{
      width: '12em',
      padding: '.6em 0',
      position: 'absolute',
      top: '2em',
      left: '-3em',
      fontSize: '1.2em',
      backgroundColor: '#33a00b',
      color: 'white',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(#000, .4)',
      transform: 'rotate(-45deg)',
      opacity: .66,
      pointerEvents: 'none',
      zIndex: 10000,
      overflow: 'hidden',
    }}
  >
    alpha
  </div>
);

export default Ribbon;