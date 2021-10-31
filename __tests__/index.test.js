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
  { expected: 'stylishOutput.txt', format: 'stylish' },
  { expected: 'plainOutput.txt', format: 'plain' },
  { expected: 'JSONOutput.txt', format: 'json' },
])('comparing not flat json and yaml files', ({ expected, format }) => {
  const file1 = buildFixturePath('file1.json');
  const file2 = buildFixturePath('file2.yaml');
  expect(genDiff(file1, file2, format)).toBe(readFile(expected));
});
