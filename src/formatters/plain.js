import _ from 'lodash';

const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return value;
};

const getPlain = (innerTree) => {
  const iter = (innerDiff, path) => {
    const plainResult = innerDiff
      .filter((element) => element.type !== 'unchanged')
      .map((element) => {
        const nodeName = `${path}${element.name}`;
        if (element.type === 'nested') {
          return `${iter(element.children, `${nodeName}.`)}`;
        }
        if (element.type === 'deleted') {
          return `Property '${nodeName}' was removed`;
        }
        if (element.type === 'added') {
          return `Property '${nodeName}' was added with value: ${getValue(element.value)}`;
        }
        if (element.type === 'changed') {
          return `Property '${nodeName}' was updated. From ${getValue(element.value1)} to ${getValue(element.value2)}`;
        }
        return `${element.name}`;
      });

    return plainResult.join('\n');
  };
  return iter(innerTree, '');
};

export default getPlain;
