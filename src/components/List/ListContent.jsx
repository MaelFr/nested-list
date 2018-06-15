import React from 'react';

class ListContent extends React.Component {
  componentDidMount() {
    if (this.props.root) {
      // dans la liste root, on test la largeur de la scrollBar et on retire l'épaisseur des borders
      this.props.onSizeChange(this.element.offsetWidth - this.element.clientWidth - 2);
    }
  }

  render() {
    const { children, className, hidden } = this.props;

    return (
      <ul
        className={`list-content ${className ? className : ''}`}
        hidden={hidden}
        ref={r => {
          this.element = r;
        }}
      >
        {children}
      </ul>
    );
  }
}

export default ListContent;
