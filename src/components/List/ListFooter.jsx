import React from 'react';

const ListFooter = ({ children, scrollBarWidth }) => (
  <div className="list-footer" style={{ paddingRight: `${scrollBarWidth}px` }}>
    {children}
  </div>
);

export default ListFooter;
