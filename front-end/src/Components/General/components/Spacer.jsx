import React from 'react';

const Spacer = ({ height, width }) => {
  // Inline styles to define the size of the spacer
  const style = {
    height: height || '1em',  // default height if none specified
    width: width || '0px'    // default width if none specified
  };

  return <div style={style} />;
};

export default Spacer;