#!/usr/bin/env node

import path from 'path';
import { cwd } from 'process';
import commander from 'commander';
import genDiff from '../src/index.js';

const getFilePath = (fileName) => path.resolve(`${cwd()}`, '__fixtures__', `${fileName}`);

commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((fileName1, fileName2) => {
    const options = commander.opts();
    const filePath1 = getFilePath(fileName1);
    const filePath2 = getFilePath(fileName2);
    console.log(genDiff(filePath1, filePath2, options.format));
  });

commander.parse(process.argv);
