#!/usr/bin/env node

import path from 'path';
import { cwd } from 'process';
import { Command } from '../node_modules/commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();
const getFilePath = (fileName) => path.resolve(`${cwd()}`, '__fixtures__', `${fileName}`);
const getFileExtension = (fileName) => path.extname(fileName);

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((fileName1, fileName2) => {
    const filePath1 = getFilePath(fileName1);
    const filePath2 = getFilePath(fileName2);
    const fileExtens1 = getFileExtension(fileName1);
    const fileExtens2 = getFileExtension(fileName2);
    console.log(genDiff(filePath1, fileExtens1, filePath2, fileExtens2));
  });

program.parse(process.argv);
