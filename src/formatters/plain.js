import _ from 'lodash';

const getValue = (value) => {
  if (value !== true && value !== false && value !== null) {
    return `'${value}'`;
  }
  if (value == null) {
    return null;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (diff) => {
  const iter = (innerDiff, route) => {
    const plainResult = innerDiff
      .filter((element) => element.condition !== 'not changed')
      .map((element) => {
        const ancestor = `${route}${element.name}`;
        if (element.condition === 'changed') {
          return `Property '${ancestor}' was updated. From ${getValue(element.firstValue)} to ${getValue(
            element.secondValue,
          )}`;
        }
        if (element.condition === 'deleted') {
          return `Property '${ancestor}' was removed`;
        }
        if (element.condition === 'added') {
          return `Property '${ancestor}' was added with value: ${getValue(element.secondValue)}`;
        }
        if (element.nodeCondition === 'added') {
          return `Property '${ancestor}' was added with value: [complex value]`;
        }
        if (element.nodeCondition === 'deleted') {
          return `Property '${ancestor}' was removed`;
        }
        if (_.has(element, 'secondValue')) {
          return `Property '${ancestor}' was updated. From [complex value] to ${getValue(element.secondValue)}`;
        }
        if (element.condition === 'has children') {
          return `${iter(element.children, `${ancestor}.`)}`;
        }
        return `${element.name}`;
      });

    return plainResult.join('\n');
  };
  return iter(diff, '');
};

export default plain;
