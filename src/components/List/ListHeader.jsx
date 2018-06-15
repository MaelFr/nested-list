import React from 'react';

const ListHeader = ({ children, scrollBarWidth }) => (
  <div className="list-header" style={{ paddingRight: `${scrollBarWidth}px` }}>
    {children}
  </div>
);

export default ListHeader;
