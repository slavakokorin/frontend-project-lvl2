#!/usr/bin/env node

import path from 'path';
import { cwd } from 'process';
import { Command } from '../node_modules/commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const filePathFirst = path.resolve(`${cwd()}`, '__fixtures__', `${filepath1}`);
    const filePathSecond = path.resolve(`${cwd()}`, '__fixtures__', `${filepath2}`);
    console.log(genDiff(filePathFirst, filePathSecond));
  });

program.parse(process.argv);
