#!/usr/bin/env node

import path from 'path';
import { cwd } from 'process';
import { Command } from '../node_modules/commander/esm.mjs';
import genDiff from '../src/index.js';
import getFormatter from '../src/formatters/index.js';

const program = new Command();
const getFilePath = (fileName) => path.resolve(`${cwd()}`, '__fixtures__', `${fileName}`);

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((fileName1, fileName2) => {
    const options = program.opts();
    const formatter = getFormatter(options.format);
    const filePath1 = getFilePath(fileName1);
    const filePath2 = getFilePath(fileName2);
    console.log(genDiff(filePath1, filePath2, formatter));
  });

program.parse(process.argv);
