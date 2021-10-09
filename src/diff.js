import _ from 'lodash';

const buildTree = (data1, data2) => {
  const iter = (currentData1, currentData2) => {
    const uniqueKeys = _.union(_.keys(currentData1), _.keys(currentData2));
    const sortedKeys = _.sortBy(uniqueKeys);
    const result = sortedKeys.map((key) => {
      if (!_.has(currentData2, key)) {
        return !_.isObject(currentData1[key])
          ? {
            name: key,
            condition: 'deleted',
            firstValue: currentData1[key],
          }
          : {
            name: key,
            nodeCondition: 'deleted',
            children: iter(currentData1[key], currentData1[key]),
          };
      }
      if (!_.has(currentData1, key)) {
        return !_.isObject(currentData2[key])
          ? {
            name: key,
            condition: 'added',
            secondValue: currentData2[key],
          }
          : {
            name: key,
            nodeCondition: 'added',
            secondValue: currentData2[key],
            children: iter(currentData2[key], currentData2[key]),
          };
      }
      if (_.has(currentData1, key) && _.has(currentData2, key)) {
        if (_.isObject(currentData1[key]) && _.isObject(currentData2[key])) {
          return {
            name: key,
            nodeCondition: 'not changed',
            children: iter(currentData1[key], currentData2[key]),
          };
        }
        if (currentData1[key] === currentData2[key]) {
          return {
            name: key,
            condition: 'not changed',
            firstValue: currentData1[key],
          };
        }
        if (_.isObject(currentData1[key]) && !_.isObject(currentData2[key])) {
          return {
            name: key,
            nodeCondition: 'updated to str',
            firstValue: currentData1[key],
            secondValue: currentData2[key],
            children: iter(currentData1[key], currentData1[key]),
          };
        }
        if (!_.isObject(currentData1[key]) && _.isObject(currentData2[key])) {
          return {
            name: key,
            nodeCondition: 'updated to obj',
            firstValue: currentData1[key],
            secondValue: currentData2[key],
            children: iter(currentData2[key], currentData2[key]),
          };
        }
      }
      return {
        name: key,
        condition: 'changed',
        firstValue: currentData1[key],
        secondValue: currentData2[key],
      };
    });
    return result;
  };
  return iter(data1, data2);
};

export default buildTree;
