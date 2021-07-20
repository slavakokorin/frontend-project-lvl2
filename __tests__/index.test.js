//import { expect } from '@jest/globals';
import path from 'path';
import { cwd } from 'process';
import genDiff from '../src/index.js';
import { xxx } from '../src/index.js';

test('cool diff', () => {
  expect(xxx(2, 4)).toEqual(8);
});

test('cool', () => {
  const filePathFirst = path.resolve(`${cwd()}`, 'fixtures', `file1.json`);
  const filePathSecond = path.resolve(`${cwd()}`, 'fixtures', `file2.json`);
  expect(genDiff(filePathFirst, filePathSecond)).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
  );
});
