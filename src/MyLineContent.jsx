import React from 'react';
import { grow } from './shared';

class MyLineContent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.line.acc !== nextProps.line.acc || this.props.line.dem !== nextProps.line.dem;
  }

  render() {
    const { line: { id, label, dem, acc, children }, readonly, handleValueChange } = this.props;

    return (
      <React.Fragment>
        <div className="my-line-label" title={label}>
          {label}
        </div>

        <div className="my-line-value">
          {readonly || children.length ? (
            grow(dem)
          ) : (
            <input
              //type="number"
              value={dem}
              name="dem"
              onChange={e => {
                handleValueChange(id, e.target.name, e.target.value);
              }}
            />
          )}
        </div>

        <div className="my-line-value">
          {readonly || children.length ? (
            grow(acc)
          ) : (
            <input
              //type="number"
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
  line: {
    label: 'Libellé',
    dem: 'dem',
    acc: 'acc',
  },
  readonly: true,
};

export default MyLineContent;
