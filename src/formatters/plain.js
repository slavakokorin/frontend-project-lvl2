import _ from 'lodash';

const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const getPlain = (diff) => {
  const iter = (innerDiff, path) => {
    const plainResult = innerDiff
      .filter((element) => element.condition !== 'not changed')
      .map((element) => {
        const nodeName = `${path}${element.name}`;
        if (
          element.condition === 'changed' ||
          element.nodeCondition === 'updated to str' ||
          element.nodeCondition === 'updated to obj'
        ) {
          return `Property '${nodeName}' was updated. From ${getValue(element.firstValue)} to ${getValue(
            element.secondValue,
          )}`;
        }
        if (element.condition === 'deleted' || element.nodeCondition === 'deleted') {
          return `Property '${nodeName}' was removed`;
        }
        if (element.condition === 'added' || element.nodeCondition === 'added') {
          return `Property '${nodeName}' was added with value: ${getValue(element.secondValue)}`;
        }
        if (_.has(element, 'nodeCondition')) {
          return `${iter(element.children, `${nodeName}.`)}`;
        }
        return `${element.name}`;
      });

    return plainResult.join('\n');
  };
  return iter(diff, '');
};

export default getPlain;
