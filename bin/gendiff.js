#!/usr/bin/env node

import commander from 'commander';
import genDiff from '../src/index.js';

commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((fileName1, fileName2) => {
    const options = commander.opts();
    console.log(genDiff(fileName1, fileName2, options.format));
  });

commander.parse(process.argv);
