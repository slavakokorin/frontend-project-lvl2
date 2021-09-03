import _ from 'lodash';

const getObjectDifferences = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const allKeys = _.union(keys1, keys2).sort();
  const resultDiff = [];
  for (const key of allKeys) {
    if (_.has(data2, key) && data1[key] === data2[key]) {
      resultDiff.push(`    ${key}: ${data1[key]}`);
    } else if (!_.has(data1, key)) {
      resultDiff.push(`  + ${key}: ${data2[key]}`);
    } else if (!_.has(data2, key)) {
      resultDiff.push(`  - ${key}: ${data1[key]}`);
    } else {
      resultDiff.push(`  - ${key}: ${data1[key]}`);
      resultDiff.push(`  + ${key}: ${data2[key]}`);
    }
  }
  const resultToString = resultDiff.join('\n');
  return `{\n${resultToString}\n}`;
};

export default getObjectDifferences;
