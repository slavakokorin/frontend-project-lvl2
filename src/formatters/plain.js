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
        switch (element.type) {
          case 'nested':
            return `${iter(element.children, `${nodeName}.`)}`;
          case 'deleted':
            return `Property '${nodeName}' was removed`;
          case 'added':
            return `Property '${nodeName}' was added with value: ${getValue(element.value)}`;
          case 'changed':
            return `Property '${nodeName}' was updated. From ${getValue(element.value1)} to ${getValue(element.value2)}`;
          default:
            throw new Error(`Element type ${element.type} is not supported!`);
        }
      });

    return plainResult.join('\n');
  };
  return iter(innerTree, '');
};

export default getPlain;
