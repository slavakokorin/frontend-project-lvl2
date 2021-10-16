import _ from 'lodash';

const getTreeElement = (elementName, symbol, elementValue, depth, replacer = '  ', spacesCount = 2) => {
  const space = replacer.repeat(spacesCount * depth);
  if (!_.isObject(elementValue)) {
    return `\n${space.slice(2)}${symbol} ${elementName}: ${elementValue}`;
  }
  const entries = _.entries(elementValue);
  const result = entries.map(([key, value]) => {
    if (!_.isObject(value)) {
      return `\n${space}    ${key}: ${elementValue[key]}`;
    }
    return `${getTreeElement(key, ' ', value, depth + 1)}`;
  }).join('');
  return `\n${space.slice(2)}${symbol} ${elementName}: {${result}\n${space}}`;
};

const getStylish = (innerTree, replacer = '  ', spacesCount = 2) => {
  const iter = (currentDiffValue, depth) => {
    const resultString = currentDiffValue.map((element) => {
      if (element.type === 'nested') {
        return `\n${replacer.repeat(spacesCount * depth)}${element.name}: ${iter(element.children, depth + 1)}`;
      }
      if (element.type === 'deleted') {
        return getTreeElement(element.name, '-', element.oldValue, depth);
      }
      if (element.type === 'added') {
        return getTreeElement(element.name, '+', element.newValue, depth);
      }
      if (element.type === 'unchanged') {
        return getTreeElement(element.name, ' ', element.oldValue, depth);
      }
      return `${getTreeElement(element.name, '-', element.oldValue, depth)}${getTreeElement(element.name, '+', element.newValue, depth)}`;
    });
    return ['{', ...resultString, `\n${replacer.repeat(spacesCount * (depth - 1))}}`].join('');
  };
  return iter(innerTree, 1);
};

export default getStylish;
