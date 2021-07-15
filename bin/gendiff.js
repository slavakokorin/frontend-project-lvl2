#!/usr/bin/env node

import { Command } from '../node_modules/commander/esm.mjs';
const program = new Command();

program.version('0.0.1');

program.parse(process.argv);
