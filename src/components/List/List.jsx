import React from 'react';

const List = ({ data, children }) =>
  data ? <ul>{data.map(item => <li>{React.cloneElement(children, { ...item })}</li>)}</ul> : 'No element';

List.defaultProps = {
  data: null,
  children: () => {},
};

export default List;
