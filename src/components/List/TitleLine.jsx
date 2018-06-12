import React from 'react';

const TitleLine = ({ children, ...props }) => (
  <div className="list-line list-title-line">
    {React.Children.map(children, child => React.cloneElement(child, { ...props }))}
  </div>
);

export default TitleLine;
