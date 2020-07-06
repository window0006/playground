#!/usr/bin/env node
/**
 * Cli tools for shopee freshman's entry task.
 * Target:
 *  init template & env(ts、tsx、tslint)
 *  scripts
 *    dev(devServer)
 *    test(jest)
 *    build(after test)
 *  git hooks(lint)
 */
const { Command } = require('commander');
const program = new Command();

program.version('0.0.1', '-v, --vers', 'output the current version');

program.parse(process.argv);

function init() {}
function fetchTemplate() {}
