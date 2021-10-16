import _ from 'lodash';

const buildTree = (data1, data2) => {
  const uniqueKeys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(uniqueKeys);
  const result = sortedKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        name: key,
        type: 'nested',
        children: buildTree(data1[key], data2[key]),
      };
    }
    if (!_.has(data2, key)) {
      return {
        name: key,
        type: 'deleted',
        oldValue: data1[key],
      };
    }
    if (!_.has(data1, key)) {
      return {
        name: key,
        type: 'added',
        newValue: data2[key],
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        name: key,
        type: 'unchanged',
        oldValue: data1[key],
      };
    }
    return {
      name: key,
      type: 'changed',
      oldValue: data1[key],
      newValue: data2[key],
    };
  });
  return result;
};

export default buildTree;
