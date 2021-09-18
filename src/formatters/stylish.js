import _ from 'lodash';

const getStylish = (diff, replacer = '  ', spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    const firstSpace = replacer.repeat(spacesCount * depth);
    const secondSpace = replacer.repeat(spacesCount * (depth - 1));
    const makeString = (element, symbol, value) =>
      `\n${firstSpace.slice(2)}${symbol} ${element.name}: ${element[value]}`;
    const resultString = ['{'];
    _.mapValues(currentValue, (element) => {
      if (element.condition === 'not changed' || element.nodeCondition === 'not changed') {
        if (element.nodeCondition === 'not changed') {
          resultString.push(`\n${firstSpace}${element.name}: ${iter(element.children, depth + 1)}`);
        } else {
          resultString.push(makeString(element, ' ', 'firstValue'));
        }
      } else if (element.condition === 'added' || element.nodeCondition === 'added') {
        if (element.nodeCondition === 'added') {
          resultString.push(`\n${firstSpace.slice(2)}+ ${element.name}: ${iter(element.children, depth + 1)}`);
        } else {
          resultString.push(makeString(element, '+', 'secondValue'));
        }
      } else if (element.condition === 'deleted' || element.nodeCondition === 'deleted') {
        if (element.nodeCondition === 'deleted') {
          resultString.push(`\n${firstSpace.slice(2)}- ${element.name}: ${iter(element.children, depth + 1)}`);
        } else {
          resultString.push(makeString(element, '-', 'firstValue'));
        }
      } else if (element.nodeCondition === 'updated to str') {
        resultString.push(`\n${firstSpace.slice(2)}- ${element.name}: ${iter(element.children, depth + 1)}`);
        resultString.push(makeString(element, '+', 'secondValue'));
      } else if (element.nodeCondition === 'updated to obj') {
        resultString.push(makeString(element, '-', 'firstValue'));
        resultString.push(`\n${firstSpace.slice(2)}+ ${element.name}: ${iter(element.children, depth + 1)}`);
      } else if (element.condition === 'changed') {
        resultString.push(makeString(element, '-', 'firstValue'));
        resultString.push(makeString(element, '+', 'secondValue'));
      }
    });
    resultString.push(`\n${secondSpace}}`);
    return resultString.join('');
  };
  return iter(diff, 1);
};

export default getStylish;
