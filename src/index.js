import fs from 'fs';
import getObject from './parsers.js';
import getObjectDifferences from './utilities.js';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const genDiff = (filePath1, fileExtens1, filePath2, fileExtens2) => {
  const content1 = readFile(filePath1);
  const сontent2 = readFile(filePath2);

  const data1 = getObject(content1, fileExtens1);
  const data2 = getObject(сontent2, fileExtens2);

  return getObjectDifferences(data1, data2);
};

export default genDiff;
