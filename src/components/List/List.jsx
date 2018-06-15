import React from 'react';

class List extends React.Component {
  state = {
    scrollBarWidth: 0,
  };

  handleScrollBarWidthChange = value => {
    this.setState({ scrollBarWidth: value });
  };

  render() {
    const { children } = this.props;

    return (
      <div className="list">
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            scrollBarWidth: this.state.scrollBarWidth,
            onSizeChange: this.handleScrollBarWidthChange,
            root: true,
          }),
        )}
      </div>
    );
  }
}

export default List;
