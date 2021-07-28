import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('comparing flat json files', () => {
  const filePathFirst = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const filePathSecond = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  expect(genDiff(filePathFirst, filePathSecond)).toEqual(
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

console.log('hello');
