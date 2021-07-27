import { test, expect } from '@jest/globals';
import path from 'path';
import genDiff from '../src/index.js';
import { cwd } from 'process';

test('cool', () => {
  const filePathFirst = path.resolve(`${cwd()}`, 'fixtures', 'file1.json');
  const filePathSecond = path.resolve(__dirname, 'fixtures', 'file2.json');
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
