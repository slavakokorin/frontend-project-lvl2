import _ from 'lodash';

export const getObjectDifferences = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = [...keys1];
  for (let key of keys2) {
    if (!allKeys.includes(key)) {
      allKeys.push(key);
    }
  }
  allKeys.sort();
  const resultDiff = [];
  for (const key of allKeys) {
    if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
      resultDiff.push(`    ${key}: ${data1[key]}`);
    } else if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      resultDiff.push(`  - ${key}: ${data1[key]}`);
      resultDiff.push(`  + ${key}: ${data2[key]}`);
    } else if (!_.has(data2, key)) {
      resultDiff.push(`  - ${key}: ${data1[key]}`);
    } else {
      resultDiff.push(`  + ${key}: ${data2[key]}`);
    }
  }
  const resultToString = resultDiff.join('\n');
  console.log(`{\n${resultToString}\n}`);
};
