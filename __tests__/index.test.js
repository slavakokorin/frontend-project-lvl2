import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

// следующие две строки нужны для работы __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test('comparing flat json files', () => {
  const readFirstFile = getFixturePath('file1.json');
  const readSecondFile = getFixturePath('file2.json');
  expect(genDiff(readFirstFile, '.json', readSecondFile, '.json')).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  );
});

test('comparing flat yaml files', () => {
  const readFirstFile = getFixturePath('file3.yaml');
  const readSecondFile = getFixturePath('file4.yaml');
  expect(genDiff(readFirstFile, '.yaml', readSecondFile, '.yaml')).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  );
});
