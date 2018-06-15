import React from 'react';
import ClassNames from 'classnames';
import ListContent from './ListContent';

class ListItemRecursive extends React.Component {
  state = {
    showChildren: true,
  };

  render() {
    const { showChildren } = this.state;
    const { item, render, children, ...props } = this.props;

    const classes = ClassNames({
      'item-content': true,
      'item-leaf': !children.length,
    });

    return (
      <li className="list-item-recursive">
        <div className={classes}>
          {children.length ? (
            <button
              className={`toggle-hide ${showChildren ? 'hide' : 'show'}`}
              onClick={() => this.setState(prevState => ({ showChildren: !prevState.showChildren }))}
            />
          ) : null}
          {React.cloneElement(render, { item, ...props })}
        </div>
        {children.length ? (
          <ListContent className="item-children" hidden={!showChildren}>
            {children.map(child => (
              <ListItemRecursive
                key={`line-${child.id}`}
                item={child}
                render={render}
                children={child.children}
                {...props}
              />
            ))}
          </ListContent>
        ) : null}
      </li>
    );
  }
}

export default ListItemRecursive;
