import _ from 'lodash';

const getValue = (value) => {
  if (value === null) {
    return value;
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return !_.isString(value) ? String(value) : `'${value}'`;
};

const formatPlain = (innerTree) => {
  const nodes = (innerDiff, path) => {
    const plainResult = innerDiff
      .filter((element) => element.type !== 'unchanged')
      .map((element) => {
        const nodeName = `${path}${element.name}`;
        switch (element.type) {
          case 'nested':
            return `${nodes(element.children, `${nodeName}.`)}`;
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
  return nodes(innerTree, '');
};

export default formatPlain;
