import _ from 'lodash';

const ident = (depth, replacer = '  ', spacesCount = 2) => replacer.repeat(spacesCount * depth);

const stringifyValue = (nodeName, symbol, nodeValue, depth) => {
  const nodes = (name, sym, eValue, dep) => {
    if (!_.isPlainObject(eValue)) {
      return `\n${ident(depth).slice(2)}${sym} ${name}: ${eValue}`;
    }
    const lines = _.entries(eValue).map(([key, value]) => `${stringifyValue(key, ' ', value, dep + 1)}`).join('');

    return `\n${ident(depth).slice(2)}${sym} ${name}: {${lines}\n${ident(dep)}}`;
  };

  return nodes(nodeName, symbol, nodeValue, depth);
};

const formatStylish = (innerTree) => {
  const formatNodes = (nodes, depth) => {
    const stylishResult = nodes.map((node) => {
      switch (node.type) {
        case 'nested':
          return `\n${ident(depth)}${node.name}: ${formatNodes(node.children, depth + 1)}`;
        case 'deleted':
          return stringifyValue(node.name, '-', node.value, depth);
        case 'added':
          return stringifyValue(node.name, '+', node.value, depth);
        case 'unchanged':
          return stringifyValue(node.name, ' ', node.value, depth);
        case 'changed':
          return `${stringifyValue(node.name, '-', node.value1, depth)}${stringifyValue(node.name, '+', node.value2, depth)}`;
        default:
          throw new Error(`Element type ${node.type} is not supported!`);
      }
    });
    return ['{', ...stylishResult, `\n${ident(depth - 1)}}`].join('');
  };
  return formatNodes(innerTree, 1);
};

export default formatStylish;
