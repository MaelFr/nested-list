import React from 'react';

const ListFilter = ({ onChange, ...props }) => (
  <div className="list-filter">
    <input
      name="list-filter"
      onChange={e => {
        onChange(e.target.value);
      }}
      {...props}
    />
  </div>
);

ListFilter.defaultProps = {
  onChange: () => {},
};

export default ListFilter;
