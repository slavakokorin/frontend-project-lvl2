import path from 'path';
import fs from 'fs';
import getObject from './parsers.js';
import getObjectDifferences from './diff.js';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const getFileExtension = (filePath) => path.extname(filePath);

const genDiff = (filePath1, filePath2, formatter) => {
  const content1 = readFile(filePath1);
  const сontent2 = readFile(filePath2);
  const fileExtens1 = getFileExtension(filePath1);
  const fileExtens2 = getFileExtension(filePath2);
  const data1 = getObject(content1, fileExtens1);
  const data2 = getObject(сontent2, fileExtens2);
  const diff = getObjectDifferences(data1, data2);
  return formatter(diff);
};

export default genDiff;
