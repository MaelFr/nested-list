import React from 'react';

const LineContent = ({ children, ...props }) => (
  <div className="list-line">{React.Children.map(children, child => React.cloneElement(child, { ...props }))}</div>
);

export default LineContent;
