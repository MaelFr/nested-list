import * as React from 'react';
import classnames from 'classnames';

const initialState = {
  hideChildren: false,
};

class RecursiveList extends React.Component {
  state = { ...initialState };

  handleToggleHideChildren = () => {
    this.setState(prevState => ({
      hideChildren: !prevState.hideChildren,
    }));
  };

  render() {
    const { children, line, ...props } = this.props;

    const classes = classnames({
      'toggle-hide': true,
      hide: !this.state.hideChildren,
      show: this.state.hideChildren,
    });

    return (
      <li className="recursive-list">
        {props.hideable && (
          <button className={classes} onClick={this.handleToggleHideChildren} hidden={!(line.children.length > 0)} />
        )}
        {React.cloneElement(children, { line })}
        {line.children.length ? (
          <ul hidden={this.state.hideChildren}>
            {line.children.map(childLine => (
              <RecursiveList key={`line-${childLine.id}`} {...props} line={childLine}>
                {children}
              </RecursiveList>
            ))}
          </ul>
        ) : null}
      </li>
    );
  }
}

RecursiveList.defaultProps = {
  hideable: true,
};

export default RecursiveList;
