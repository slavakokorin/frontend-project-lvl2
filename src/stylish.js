import _ from 'lodash';

const stylish = (content, replacer = '  ', spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    const firstSpace = replacer.repeat(spacesCount * depth);
    const secondSpace = replacer.repeat(spacesCount * (depth - 1));
    const resultString = ['{'];
    _.mapValues(currentValue, (item) => {
      if (item.condition === 'has children') {
        if (item.nodeCondition === 'changed') {
          resultString.push(`\n${firstSpace}${item.name}: ${iter(item.children, depth + 1)}`);
        } else if (item.nodeCondition === 'added') {
          resultString.push(`\n${firstSpace.slice(2)}+ ${item.name}: ${iter(item.children, depth + 1)}`);
        } else {
          resultString.push(`\n${firstSpace.slice(2)}- ${item.name}: ${iter(item.children, depth + 1)}`);
          if (_.has(item, 'secondValue')) {
            resultString.push(`\n${firstSpace.slice(2)}+ ${item.name}: ${item.secondValue}`);
          }
        }
      } else if (item.condition === 'changed') {
        resultString.push(`\n${firstSpace.slice(2)}- ${item.name}: ${item.firstValue}`);
        resultString.push(`\n${firstSpace.slice(2)}+ ${item.name}: ${item.secondValue}`);
      } else if (item.condition === 'deleted') {
        resultString.push(`\n${firstSpace.slice(2)}- ${item.name}: ${item.firstValue}`);
      } else if (item.condition === 'added') {
        resultString.push(`\n${firstSpace.slice(2)}+ ${item.name}: ${item.secondValue}`);
      } else {
        resultString.push(`\n${firstSpace.slice(2)}  ${item.name}: ${item.firstValue}`);
      }
    });
    resultString.push(`\n${secondSpace}}`);
    return resultString.join('');
  };
  return iter(content, 1);
};

export default stylish;
