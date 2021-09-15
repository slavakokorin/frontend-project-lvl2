import _ from 'lodash';

const getStylish = (diff, replacer = '  ', spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    const firstSpace = replacer.repeat(spacesCount * depth);
    const secondSpace = replacer.repeat(spacesCount * (depth - 1));
    const resultString = ['{'];
    _.mapValues(currentValue, (element) => {
      if (element.condition === 'has children') {
        if (element.nodeCondition === 'changed') {
          resultString.push(`\n${firstSpace}${element.name}: ${iter(element.children, depth + 1)}`);
        } else if (element.nodeCondition === 'added') {
          resultString.push(`\n${firstSpace.slice(2)}+ ${element.name}: ${iter(element.children, depth + 1)}`);
        } else {
          resultString.push(`\n${firstSpace.slice(2)}- ${element.name}: ${iter(element.children, depth + 1)}`);
          if (_.has(element, 'secondValue')) {
            resultString.push(`\n${firstSpace.slice(2)}+ ${element.name}: ${element.secondValue}`);
          }
        }
      } else if (element.condition === 'changed') {
        resultString.push(`\n${firstSpace.slice(2)}- ${element.name}: ${element.firstValue}`);
        resultString.push(`\n${firstSpace.slice(2)}+ ${element.name}: ${element.secondValue}`);
      } else if (element.condition === 'deleted') {
        resultString.push(`\n${firstSpace.slice(2)}- ${element.name}: ${element.firstValue}`);
      } else if (element.condition === 'added') {
        resultString.push(`\n${firstSpace.slice(2)}+ ${element.name}: ${element.secondValue}`);
      } else {
        resultString.push(`\n${firstSpace.slice(2)}  ${element.name}: ${element.firstValue}`);
      }
    });
    resultString.push(`\n${secondSpace}}`);
    return resultString.join('');
  };
  return iter(diff, 1);
};

export default getStylish;
