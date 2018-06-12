import React from 'react';
import List from './List';
import TitleLine from './TitleLine';
import RecursiveList from './RecursiveList';

function NestedList({ children }) {
  return (
    <div className="nested-list-wrapper">
      {/* Returns TitleLine */}
      {React.Children.map(children, child => (child.type === TitleLine ? child : null))}
      {/* Returns recursives lines */}
      <ul className="nested-list-content">
        {React.Children.map(children, child => (child.type === RecursiveList ? child : null))}
      </ul>
    </div>
  );
}

export default NestedList;
