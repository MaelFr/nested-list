import React from 'react';
import { grow } from './shared';
import { TempNumberField } from './components/Form';

class MyLineContent extends React.Component {
  state = {
    readOnly: true,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.item.acc !== nextProps.item.acc || this.props.item.dem !== nextProps.item.dem;
  }

  isControlled = field => this.props[field] !== undefined;

  getState = () => ({
    readOnly: this.isControlled('readOnly') ? this.props.readOnly : this.state.readOnly,
  });

  render() {
    const { readOnly } = this.getState();
    const { item: { id, label, dem, acc, children }, handleValueChange } = this.props;

    return (
      <React.Fragment>
        <div className="my-line-label" title={label}>
          {label}
        </div>

        <div className="my-line-value">
          {readOnly || children.length ? (
            <span>{grow(dem)}</span>
          ) : (
            <TempNumberField
              value={dem}
              name="dem"
              onChange={e => {
                handleValueChange(id, e.target.name, e.target.value);
              }}
            />
          )}
        </div>

        <div className="my-line-value">
          {readOnly || children.length ? (
            <span>{grow(acc)}</span>
          ) : (
            <TempNumberField
              value={acc}
              name="acc"
              onChange={e => {
                handleValueChange(id, e.target.name, e.target.value);
              }}
            />
          )}
        </div>

        <div className="my-line-actions" />
      </React.Fragment>
    );
  }
}

MyLineContent.defaultProps = {
  item: {
    label: 'Libellé',
    dem: 'dem',
    acc: 'acc',
  },
  readonly: true,
};

export default MyLineContent;
