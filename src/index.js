#!/usr/bin/env node

const yargs = require('yargs')
const { noop } = require('lodash')
const utils = require('./utils')
const mainProcess = require('./cli')
let setConfig = false

if ( yargs.length > 0 ) {
  console.log(yargs.argv)
  if ( 'set' in yargs.argv ) {
    setConfig = true
    let array = [yargs.argv[ 'set' ]]
    if ( yargs.argv[ '_' ] ) {
      array = [...array, ...yargs.argv["_"]]
    }
    utils.setNewConfigJsonFile(array)
  }
}


if ( !setConfig ) {
  yargs
    .usage('Usage: $0 <command> [options]')
    .command('$0', 'Generate README.md', noop, args => {
      const { path: customTemplatePath, yes: useDefaultAnswers } = args
      mainProcess({
        customTemplatePath,
        useDefaultAnswers
      })
    })
    .string('p')
    .alias('p', 'path')
    .describe('path', 'Path to your own template')
    .boolean('yes')
    .alias('y', 'yes')
    .describe('yes', 'Use default values for all fields')
    .help()
    .alias('v', 'version')
    .epilog(
      'for more information, find our manual at https://github.com/kefranabg/readme-md-generator')
    .parse()
}

