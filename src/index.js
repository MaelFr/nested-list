import React from 'react';
import { render } from 'react-dom';
import { findRecursiveById, initialMap, accDemReducer, grow } from './shared';
import List, { ListHeader, ListContent, ListItemRecursive, ListFilter, ListFooter } from './components/List';
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

  filterReducer = line => {
    let children = null;
    if (line.children.length) {
      children = line.children.map(this.filterReducer);
    }

    return null;
  };

  render() {
    return (
      <div style={styles}>
        {this.state.lines && (
          <React.Fragment>
            <h1>Nested List</h1>

            <p>
              Totaux: dem {this.total('dem')} acc {this.total('acc')}
            </p>

            <List>
              <ListFilter onChange={console.log} />
              <ListHeader>
                <MyLineContent />
              </ListHeader>
              <ListContent>
                {this.state.lines.map(line => (
                  <ListItemRecursive
                    key={`line-${line.id}`}
                    item={line}
                    render={<MyLineContent handleValueChange={this.handleValueChange} />}
                    children={line.children}
                    readOnly={false}
                  />
                ))}
              </ListContent>
              <ListFooter>
                <MyLineContent item={{ label: 'Total:', dem: this.total('dem'), acc: this.total('acc') }} />
              </ListFooter>
            </List>
          </React.Fragment>
        )}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
