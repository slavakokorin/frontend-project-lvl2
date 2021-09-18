import _ from 'lodash';

const getUniqueKeys = (object1, object2) => {
  const keys1 = _.keys(object1);
  const keys2 = _.keys(object2);
  const uniqueKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(uniqueKeys);
  return sortedKeys;
};

const getObjectDifferences = (data1, data2) => {
  const iter = (currentData1, currentData2) => {
    const keys = getUniqueKeys(currentData1, currentData2);
    const result = keys.map((key) => {
      const diffInfo = { name: key };
      if (!_.has(currentData2, key)) {
        if (!_.isObject(currentData1[key])) {
          diffInfo.condition = 'deleted';
          diffInfo.firstValue = currentData1[key];
        } else if (_.isObject(currentData1, key)) {
          diffInfo.nodeCondition = 'deleted';
          diffInfo.children = iter(currentData1[key], currentData1[key]);
        }
      } else if (!_.has(currentData1, key)) {
        if (!_.isObject(currentData2[key])) {
          diffInfo.condition = 'added';
          diffInfo.secondValue = currentData2[key];
        } else if (_.isObject(currentData2[key])) {
          diffInfo.nodeCondition = 'added';
          diffInfo.secondValue = currentData2[key];
          diffInfo.children = iter(currentData2[key], currentData2[key]);
        }
      } else if (_.has(currentData1, key) && _.has(currentData2, key)) {
        if (_.isObject(currentData1[key]) && _.isObject(currentData2[key])) {
          diffInfo.nodeCondition = 'not changed';
          diffInfo.children = iter(currentData1[key], currentData2[key]);
        } else if (currentData1[key] === currentData2[key]) {
          diffInfo.condition = 'not changed';
          diffInfo.firstValue = currentData1[key];
        } else if (
          !_.isObject(currentData1[key]) &&
          !_.isObject(currentData2[key]) &&
          currentData1[key] !== currentData2[key]
        ) {
          diffInfo.condition = 'changed';
          diffInfo.firstValue = currentData1[key];
          diffInfo.secondValue = currentData2[key];
        } else if (_.isObject(currentData1[key]) && !_.isObject(currentData2[key])) {
          diffInfo.nodeCondition = 'updated to str';
          diffInfo.firstValue = currentData1[key];
          diffInfo.secondValue = currentData2[key];
          diffInfo.children = iter(currentData1[key], currentData1[key]);
        } else if (!_.isObject(currentData1[key]) && _.isObject(currentData2[key])) {
          diffInfo.nodeCondition = 'updated to obj';
          diffInfo.firstValue = currentData1[key];
          diffInfo.secondValue = currentData2[key];
          diffInfo.children = iter(currentData2[key], currentData2[key]);
        }
      }
      return diffInfo;
    });
    return result;
  };
  return iter(data1, data2);
};

export default getObjectDifferences;
