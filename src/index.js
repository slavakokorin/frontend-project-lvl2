import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import parse from './parsers.js';
import buildTree from './diff.js';
import formate from './formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (fileName) => path.resolve(__dirname, '..', '__fixtures__', `${fileName}`);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const extractFormat = (filePath) => path.extname(filePath).replace('.', '');

const genDiff = (fileName1, fileName2, format = 'stylish') => {
  const filePath1 = getFilePath(fileName1);
  const filePath2 = getFilePath(fileName2);
  const content1 = readFile(filePath1);
  const сontent2 = readFile(filePath2);
  const formatName1 = extractFormat(filePath1);
  const formatName2 = extractFormat(filePath2);
  const data1 = parse(content1, formatName1);
  const data2 = parse(сontent2, formatName2);
  const innerTree = buildTree(data1, data2);
  return formate(innerTree, format);
};

export default genDiff;
