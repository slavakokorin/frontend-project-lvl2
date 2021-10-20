import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import parse from './parsers.js';
import buildTree from './diff.js';
import format from './formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildFilePath = (fileName) => path.resolve(__dirname, '..', '__fixtures__', fileName);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const extractFormat = (filePath) => path.extname(filePath).replace('.', '');

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
