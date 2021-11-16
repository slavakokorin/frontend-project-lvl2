import _ from 'lodash';

const ident = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth);

const labels = {
  deleted: '-',
  added: '+',
  unchanged: ' ',
  changed: '+',
};

const stringify = (nodeValue, depth) => {
  if (!_.isPlainObject(nodeValue)) {
    return String(nodeValue);
  }
  const lines = _.entries(nodeValue)
    .map(([key, value]) => `\n${ident(depth + 1)}${key}: ${stringify(value, depth + 1)}`).join('');
  return `{${lines}\n${ident(depth)}}`;
};

const formatStylish = (innerTree) => {
  const formatNodes = (nodes, depth) => {
    const stylishResult = nodes.map((node) => {
      switch (node.type) {
        case 'nested':
          return `\n${ident(depth)}${node.name}: ${formatNodes(node.children, depth + 1)}`;
        case 'deleted':
        case 'added':
        case 'unchanged':
          return `\n${ident(depth).slice(2)}${labels[node.type]} ${node.name}: ${stringify(node.value, depth)}`;
        case 'changed': {
          const deletedNode = `\n${ident(depth).slice(2)}${labels.deleted} ${node.name}: ${stringify(node.value1, depth)}`;
          const addedNode = `\n${ident(depth).slice(2)}${labels.changed} ${node.name}: ${stringify(node.value2, depth)}`;
          return `${deletedNode}${addedNode}`;
        }
        default:
          throw new Error(`Element type ${node.type} is not supported!`);
      }
    });
    return ['{', ...stylishResult, `\n${ident(depth - 1)}}`].join('');
  };
  return formatNodes(innerTree, 1);
};

export default formatStylish;
