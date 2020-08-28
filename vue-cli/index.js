#!/usr/bin/env node

const { program } = require('commander');

program
  .command('create <app-name>')
  .option('-d, --default', 'Skip prompts and use default preset')
  .action((name, cmd) => {

    const options = cleanArgs(cmd)

    console.log(options);

    require('./lib/create')(name, options);
  })


program.parse(process.argv);

function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}

