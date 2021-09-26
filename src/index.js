import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import parseToObject from './parsers.js';
import buildDiffTree from './diff.js';
import getFormatter from './formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (fileName) => path.resolve(__dirname, '..', '__fixtures__', `${fileName}`);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const extractFormat = (filePath) => path.extname(filePath);

const genDiff = (fileName1, fileName2, format) => {
  const filePath1 = getFilePath(fileName1);
  const filePath2 = getFilePath(fileName2);
  const content1 = readFile(filePath1);
  const сontent2 = readFile(filePath2);
  const firstFileFormat = extractFormat(filePath1);
  const secondFileFormat = extractFormat(filePath2);
  const dataForDifferences1 = parseToObject(content1, firstFileFormat);
  const dataForDifferences2 = parseToObject(сontent2, secondFileFormat);
  const diff = buildDiffTree(dataForDifferences1, dataForDifferences2);
  const formatDiffTree = getFormatter(format);
  return formatDiffTree(diff);
};

export default genDiff;
