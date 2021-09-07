import _ from 'lodash';

const getAllKeys = (o1, o2) => {
  const keys1 = _.keys(o1);
  const keys2 = _.keys(o2);
  const allKeys = _.union(keys1, keys2).sort();
  return allKeys;
};

const getObjectDifferences = (data1, data2) => {
  const iter = (d1, d2) => {
    const unic = getAllKeys(d1, d2);
    const result = unic.map((key) => {
      const diffInf = { name: key };
      if (!_.has(d2, key) && !_.isObject(d1[key])) {
        diffInf.condition = 'deleted';
        diffInf.firstValue = d1[key];
        diffInf.secondValue = 'no';
      } else if (!_.has(d1, key) && !_.isObject(d2[key])) {
        diffInf.condition = 'added';
        diffInf.firstValue = 'no';
        diffInf.secondValue = d2[key];
      } else if (!_.isObject(d1[key]) && !_.isObject(d2[key]) && d1[key] === d2[key]) {
        diffInf.condition = 'not changed';
        diffInf.firstValue = d1[key];
        diffInf.secondValue = 'no';
      } else if (
        (!_.isObject(d1[key]) || d1[key] === null) &&
        (!_.isObject(d2[key]) || d2[key] === null) &&
        d1[key] !== d2[key]
      ) {
        diffInf.condition = 'changed';
        diffInf.firstValue = d1[key];
        diffInf.secondValue = d2[key];
      } else if (_.isObject(d1[key]) && _.isObject(d2[key])) {
        diffInf.nodeCondition = 'changed';
        diffInf.condition = 'has children';
        diffInf.children = iter(d1[key], d2[key]);
      } else if (!_.isObject(d1[key]) && _.isObject(d2[key])) {
        diffInf.nodeCondition = 'added';
        diffInf.condition = 'has children';
        diffInf.children = iter(d2[key], d2[key]);
      } else if (!_.isObject(d2[key]) && _.isObject(d1[key])) {
        if (!_.has(d2, key)) {
          diffInf.condition = 'has children';
          diffInf.children = iter(d1[key], d1[key]);
        } else if (_.has(d1, key) || _.has(d2, key)) {
          diffInf.secondValue = d2[key];
          diffInf.condition = 'has children';
          diffInf.children = iter(d1[key], d1[key]);
        }
      }
      return diffInf;
    });
    return result;
  };

  const stringify = (content) => {
    const iterr = (currentVal, depth) => {
      const replacer = '  ';
      const spacesCount = 2;
      const firstSpace = replacer.repeat(spacesCount * depth);
      const secondSpace = replacer.repeat(spacesCount * (depth - 1));
      const resultString = ['{'];
      _.mapValues(currentVal, (item) => {
        if (item.condition === 'has children') {
          if (item.nodeCondition === 'changed') {
            resultString.push(`\n${firstSpace}${item.name}: ${iterr(item.children, depth + 1)}`);
          } else if (item.nodeCondition === 'added') {
            resultString.push(`\n${firstSpace.slice(2)}+ ${item.name}: ${iterr(item.children, depth + 1)}`);
          } else {
            resultString.push(`\n${firstSpace.slice(2)}- ${item.name}: ${iterr(item.children, depth + 1)}`);
            if (_.has(item, 'secondValue')) {
              resultString.push(`\n${firstSpace.slice(2)}+ ${item.name}: ${item.secondValue}`);
            }
          }
        } else if (item.condition === 'changed') {
          resultString.push(`\n${firstSpace.slice(2)}- ${item.name}: ${item.firstValue}`);
          resultString.push(`\n${firstSpace.slice(2)}+ ${item.name}: ${item.secondValue}`);
        } else if (item.condition === 'deleted') {
          resultString.push(`\n${firstSpace.slice(2)}- ${item.name}: ${item.firstValue}`);
        } else if (item.condition === 'not changed') {
          resultString.push(`\n${firstSpace.slice(2)}  ${item.name}: ${item.firstValue}`);
        } else if (item.condition === 'added') {
          resultString.push(`\n${firstSpace.slice(2)}+ ${item.name}: ${item.secondValue}`);
        }
        return null;
      });
      resultString.push(`\n${secondSpace}}`);
      return resultString.join('');
    };
    return iterr(content, 1);
  };
  return stringify(iter(data1, data2));
};

export default getObjectDifferences;
