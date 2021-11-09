import _ from 'lodash';

const buildSpace = (depth, replacer = '  ', spacesCount = 2) => replacer.repeat(spacesCount * depth);

const stringifyValue = (elementName, symbol, elementValue, depth) => {
  const nodes = (name, sym, eValue, dep) => {
    if (!_.isPlainObject(eValue)) {
      return `\n${buildSpace(depth).slice(2)}${sym} ${name}: ${eValue}`;
    }
    const lines = _.entries(eValue).map(([key, value]) => `${stringifyValue(key, ' ', value, dep + 1)}`).join('');

    return `\n${buildSpace(depth).slice(2)}${sym} ${name}: {${lines}\n${buildSpace(dep)}}`;
  };

  return nodes(elementName, symbol, elementValue, depth);
};

const formatStylish = (innerTree) => {
  const nodes = (currentDiffValue, depth) => {
    const resultString = currentDiffValue.map((element) => {
      switch (element.type) {
        case 'nested':
          return `\n${buildSpace(depth)}${element.name}: ${nodes(element.children, depth + 1)}`;
        case 'deleted':
          return stringifyValue(element.name, '-', element.value, depth);
        case 'added':
          return stringifyValue(element.name, '+', element.value, depth);
        case 'unchanged':
          return stringifyValue(element.name, ' ', element.value, depth);
        case 'changed':
          return `${stringifyValue(element.name, '-', element.value1, depth)}${stringifyValue(element.name, '+', element.value2, depth)}`;
        default:
          throw new Error(`Element type ${element.type} is not supported!`);
      }
    });
    return ['{', ...resultString, `\n${buildSpace(depth - 1)}}`].join('');
  };
  return nodes(innerTree, 1);
};

export default formatStylish;
