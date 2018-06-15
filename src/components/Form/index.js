import React from 'react';
import { grow } from '../../shared';

export class TempNumberField extends React.Component {
  static defaultProps = {
    onBlur: () => {},
    onFocus: () => {},
  };

  state = {
    focused: false,
  };

  toggleFocus = () => {
    this.setState(prevState => ({ focused: !prevState.focused }));
  };

  render() {
    const { type, focused } = this.state;
    const { value, onBlur, onFocus, ...props } = this.props;
    return (
      <input
        onFocus={e => {
          this.toggleFocus();
          onFocus(e);
        }}
        onBlur={e => {
          this.toggleFocus();
          onBlur(e);
        }}
        value={focused ? value : grow(value)}
        {...props}
        ref={r => (this.input = r)}
      />
    );
  }
}
