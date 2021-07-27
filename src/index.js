import fs from 'fs';
import getObjectDifferences from './utilities.js';

const getObject = (jsonContent) => JSON.parse(jsonContent);

const genDiff = (filepath1, filepath2) => {
  const jsonContent1 = fs.readFileSync(filepath1, 'utf-8');
  const jsonContent2 = fs.readFileSync(filepath2, 'utf-8');

  const data1 = getObject(jsonContent1);
  const data2 = getObject(jsonContent2);

  return getObjectDifferences(data1, data2);
};

export default genDiff;
