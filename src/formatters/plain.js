import _ from 'lodash';

const stringify = (value) => {
  if (value === null) {
    return value;
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (innerTree) => {
  const formatNodes = (nodes, path) => {
    const plainResult = nodes
      .filter((node) => node.type !== 'unchanged')
      .map((node) => {
        const nodeName = `${path}${node.name}`;
        switch (node.type) {
          case 'nested':
            return `${formatNodes(node.children, `${nodeName}.`)}`;
          case 'deleted':
            return `Property '${nodeName}' was removed`;
          case 'added':
            return `Property '${nodeName}' was added with value: ${stringify(node.value)}`;
          case 'changed':
            return `Property '${nodeName}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
          default:
            throw new Error(`Element type ${node.type} is not supported!`);
        }
      });

    return plainResult.join('\n');
  };
  return formatNodes(innerTree, '');
};

export default formatPlain;
