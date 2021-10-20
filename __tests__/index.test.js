import fs from 'fs';
import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (filename) => fs.readFileSync(buildFixturePath(filename), 'utf-8');

test.each([
  {
    readFirstFile: buildFixturePath('file1.json'),
    readSecondFile: buildFixturePath('file2.yaml'),
    expected: readFile('stylishOutput.txt'),
    format: 'stylish',
  },
  {
    readFirstFile: buildFixturePath('file1.json'),
    readSecondFile: buildFixturePath('file2.yaml'),
    expected: readFile('plainOutput.txt'),
    format: 'plain',
  },
  {
    readFirstFile: buildFixturePath('file1.json'),
    readSecondFile: buildFixturePath('file2.yaml'),
    expected: readFile('JSONOutput.txt'),
    format: 'json',
  },
])('comparing not flat json and yaml files', ({
  readFirstFile, readSecondFile, expected, format,
}) => {
  expect(genDiff(readFirstFile, readSecondFile, format)).toBe(expected);
});
