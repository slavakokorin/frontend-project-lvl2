import fs from 'fs';
import getObjectDifferences from './utilities.js';

const getObject = (jsonContent) => JSON.parse(jsonContent);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const jsonContent1 = readFile(filepath1);
  const jsonContent2 = readFile(filepath2);

  const data1 = getObject(jsonContent1);
  const data2 = getObject(jsonContent2);

  return getObjectDifferences(data1, data2);
};

export default genDiff;
