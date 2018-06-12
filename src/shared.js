function combineReducers(...reducers) {
  return (state, changes) => {
    for (let reducer of reducers) {
      const result = reducer(state, changes);
      if (result !== changes) {
        return result;
      }
    }
    return changes;
  };
}

function findRecursiveById(data, searchedId, childrenName = 'children') {
  let item;
  for (var i = 0; i < data.length; i++) {
    if (data[i].id === searchedId) {
      return data[i];
    } else if (data[i][childrenName] && data[i][childrenName].length && typeof data[i][childrenName] === 'object') {
      item = findRecursiveById(data[i][childrenName], searchedId, childrenName);
    }
    if (item) {
      return item;
    }
  }
}

function accDemReducer(accu, curr) {
  return { acc: accu.acc + curr.acc, dem: accu.dem + curr.dem };
}

function initialMap(line) {
  let { children } = line;
  if (line.children.length) {
    children = line.children.map(initialMap);
  }

  return {
    ...line,
    children,
    ...(children.length
      ? children.reduce(accDemReducer, {
          dem: 0,
          acc: 0,
        })
      : null),
  };
}

function grow(value, separator = ' ') {
  if (typeof value === 'number') {
    value = value.toString();
  }
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export { combineReducers, findRecursiveById, initialMap, accDemReducer, grow };
