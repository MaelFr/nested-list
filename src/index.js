import React from 'react';
import { render } from 'react-dom';
import { findRecursiveById, initialMap, accDemReducer, grow } from './shared';
import { NestedList, TitleLine, LineContent, RecursiveList } from './components/List';
import MyLineContent from './MyLineContent';

import './style.css';

import { data as initialData } from './data';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  //maxWidth: '800px',
};

////////////

class App extends React.Component {
  state = { lines: initialData.lines.map(initialMap) };

  patchLine = id => {
    console.log('patch find', findRecursiveById(this.state.lines, id));
  };

  handleAddClick = (id, cb) => {
    const updateFn = item => ({
      ...item,
      value: item.id === id ? item.value + 1 : item.value,
      children: item.children.map(updateFn),
    });
    this.setState(
      prevState => ({
        lines: [...prevState.lines.map(updateFn)],
      }),
      () => {
        this.patchLine(id);
      },
    );
  };

  handleVisibleClick = id => {
    console.log('handleVisibleClick', id);
    const updateFn = item => ({
      ...item,
      show: id === item.id ? !item.show : item.show,
      children: item.children.map(updateFn),
    });
    this.setState(prevState => ({
      lines: [...prevState.lines.map(updateFn)],
    }));
  };

  updateMap = (line, searchId, field, value) => {
    let { children } = line;
    if (line.children.length) {
      children = line.children.map(child => this.updateMap(child, searchId, field, value));
    }

    return line.id !== searchId
      ? {
          ...line,
          children,
          ...(children.length
            ? children.reduce(accDemReducer, {
                dem: 0,
                acc: 0,
              })
            : null),
        }
      : {
          ...line,
          children,
          [field]: value,
        };
  };

  updateFn = (item, searchId, field, value) => {
    if (item.id !== searchId) {
      return { ...item, children: item.children.map(child => this.updateFn(child, searchId, field, value)) };
    }

    return {
      ...item,
      [field]: value,
      children: item.children.map(child => this.updateFn(child, searchId, field, value)),
    };
  };

  valueReducer = (acc, cur) =>
    cur.children.length > 0 ? cur.children.reduce(this.valueReducer, acc) : acc + cur.value;

  handleValueChange = (id, field, value) => {
    const intValue = parseInt(value, 10) || 0;
    this.setState(
      prevState => ({
        lines: [...prevState.lines.map(line => this.updateMap(line, id, field, intValue))],
      }),
      () => {
        this.patchLine(id);
      },
    );
  };

  reduceFn = field => (acc, cur) =>
    cur.children.length ? cur.children.reduce(this.reduceFn(field), acc) : acc + cur[field];
  total = field => grow(this.state.lines.reduce(this.reduceFn(field), 0));

  render() {
    return (
      <div style={styles}>
        {this.state.lines && (
          <React.Fragment>
            <h1>Nested List</h1>

            <div>
              Totaux:{' '}
              <p>
                dem {this.total('dem')} acc {this.total('acc')}
              </p>
            </div>

            <NestedList>
              <TitleLine>
                <MyLineContent label="Libellé" acc="acc" dem="dem" />
              </TitleLine>
              {this.state.lines.map(line => (
                <RecursiveList key={`rec-${line.id}`} line={line}>
                  <LineContent>
                    <MyLineContent readonly={false} handleValueChange={this.handleValueChange} />
                  </LineContent>
                </RecursiveList>
              ))}
            </NestedList>
          </React.Fragment>
        )}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
