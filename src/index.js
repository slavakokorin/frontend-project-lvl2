import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import buildTree from './diff.js';
import format from './formatters/index.js';

const buildFilePath = (fileName) => path.resolve(process.cwd(), fileName);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8').trim();
const extractFormat = (filePath) => path.extname(filePath).substring(1);

const genDiff = (fileName1, fileName2, ontputFormat = 'stylish') => {
  const filePath1 = buildFilePath(fileName1);
  const filePath2 = buildFilePath(fileName2);
  const content1 = readFile(filePath1);
  const сontent2 = readFile(filePath2);
  const formatName1 = extractFormat(filePath1);
  const formatName2 = extractFormat(filePath2);
  const data1 = parse(content1, formatName1);
  const data2 = parse(сontent2, formatName2);
  const innerTree = buildTree(data1, data2);
  return format(innerTree, ontputFormat);
};

export default genDiff;
