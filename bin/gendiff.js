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
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((fileName1, fileName2) => {
    const firstFilePath = getFilePath(fileName1);
    const secondFilePath = getFilePath(fileName2);
    const firstFileExtension = getFileExtension(fileName1);
    const secondFileExtension = getFileExtension(fileName2);
    console.log(genDiff(firstFilePath, firstFileExtension, secondFilePath, secondFileExtension));
  });

program.parse(process.argv);
