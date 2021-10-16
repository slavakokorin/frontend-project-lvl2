import _ from 'lodash';

// const buildTree = (data1, data2) => {
//   const iter = (currentData1, currentData2) => {
//     const uniqueKeys = _.union(_.keys(currentData1), _.keys(currentData2));
//     const sortedKeys = _.sortBy(uniqueKeys);
//     const result = sortedKeys.map((key) => {
//       if (!_.has(currentData2, key)) {
//         return !_.isObject(currentData1[key])
//           ? {
//             name: key,
//             condition: 'deleted',
//             oldValue: currentData1[key],
//           }
//           : {
//             name: key,
//             nodeCondition: 'deleted',
//             children: iter(currentData1[key], currentData1[key]),
//           };
//       }
//       if (!_.has(currentData1, key)) {
//         return !_.isObject(currentData2[key])
//           ? {
//             name: key,
//             condition: 'added',
//             newValue: currentData2[key],
//           }
//           : {
//             name: key,
//             nodeCondition: 'added',
//             newValue: currentData2[key],
//             children: iter(currentData2[key], currentData2[key]),
//           };
//       }
//       if (_.has(currentData1, key) && _.has(currentData2, key)) {
//         if (_.isObject(currentData1[key]) && _.isObject(currentData2[key])) {
//           return {
//             name: key,
//             nodeCondition: 'not changed',
//             children: iter(currentData1[key], currentData2[key]),
//           };
//         }
//         if (currentData1[key] === currentData2[key]) {
//           return {
//             name: key,
//             condition: 'not changed',
//             oldValue: currentData1[key],
//           };
//         }
//         if (_.isObject(currentData1[key]) && !_.isObject(currentData2[key])) {
//           return {
//             name: key,
//             nodeCondition: 'updated to str',
//             oldValue: currentData1[key],
//             newValue: currentData2[key],
//             children: iter(currentData1[key], currentData1[key]),
//           };
//         }
//         if (!_.isObject(currentData1[key]) && _.isObject(currentData2[key])) {
//           return {
//             name: key,
//             nodeCondition: 'updated to obj',
//             oldValue: currentData1[key],
//             newValue: currentData2[key],
//             children: iter(currentData2[key], currentData2[key]),
//           };
//         }
//       }
//       return {
//         name: key,
//         condition: 'changed',
//         oldValue: currentData1[key],
//         newValue: currentData2[key],
//       };
//     });
//     return result;
//   };
//   return iter(data1, data2);
// };

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
