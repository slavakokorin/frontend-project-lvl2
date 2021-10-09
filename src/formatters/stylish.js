const getStylish = (innerTree, replacer = '  ', spacesCount = 2) => {
  const iter = (currentDiffValue, depth) => {
    const firstSpace = replacer.repeat(spacesCount * depth);
    const secondSpace = replacer.repeat(spacesCount * (depth - 1));
    const makeString = (element, symbol, value) => `\n${firstSpace.slice(2)}${symbol} ${element.name}: ${element[value]}`;
    const resultString = currentDiffValue.map((element) => {
      if (element.condition === 'not changed' || element.nodeCondition === 'not changed') {
        return (element.nodeCondition === 'not changed')
          ? [`\n${firstSpace}${element.name}: ${iter(element.children, depth + 1)}`]
          : [makeString(element, ' ', 'oldValue')];
      }
      if (element.condition === 'added' || element.nodeCondition === 'added') {
        return (element.nodeCondition === 'added')
          ? [`\n${firstSpace.slice(2)}+ ${element.name}: ${iter(element.children, depth + 1)}`]
          : [makeString(element, '+', 'newValue')];
      }
      if (element.condition === 'deleted' || element.nodeCondition === 'deleted') {
        return (element.nodeCondition === 'deleted')
          ? [`\n${firstSpace.slice(2)}- ${element.name}: ${iter(element.children, depth + 1)}`]
          : [makeString(element, '-', 'oldValue')];
      }
      if (element.nodeCondition === 'updated to str') {
        return [`\n${firstSpace.slice(2)}- ${element.name}: ${iter(element.children, depth + 1)}`,
          makeString(element, '+', 'newValue')].join('');
      }
      if (element.nodeCondition === 'updated to obj') {
        return [makeString(element, '-', 'oldValue'),
          `\n${firstSpace.slice(2)}+ ${element.name}: ${iter(element.children, depth + 1)}`].join('');
      }
      return `${makeString(element, '-', 'oldValue')}${makeString(element, '+', 'newValue')}`;
    });
    return ['{', ...resultString, `\n${secondSpace}}`].join('');
  };
  return iter(innerTree, 1);
};

export default getStylish;
