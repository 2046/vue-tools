#!/usr/bin/env node
var program = require('commander')
var chalk = require('chalk')
var fs = require('fs')
var path = require('path')
var list = null
var rootPath = process.cwd()

var allowedInput = ['component', 'directive', 'plugin']
var type
	, name
	, vueTemplate = `<style src="./style.css" scoped></style>
<template src="./template.html"></template>
<script>
  export default {
    props: {
    },
    methods: {}
  }
</script>`

require('shelljs/global')

try {
		list = require('../config/list.json')
} catch (e) {
		list = generateList()
}


program
	.version(require('../package.json').version)
  .option('-l, --list', 'read all packages developed', readlist)
	.option('-c, --config', 'create all developed list config', createConfig)
	.parse(process.argv)

/**
 * Help.
 */

program.on('--help', function () {
		console.log('  Examples:')
		console.log()
		console.log(chalk.gray('    # create one plugin'))
		console.log('    $ cli plugin test')
		console.log()
		console.log(chalk.gray('    # create one component'))
		console.log('    $ cli component test')
		console.log()
		console.log(chalk.gray('    # create one directive'))
		console.log('    $ cli directive test')
		console.log()
})

/**
 * Help.
 */

function help () {
		if (program.args.length < 1) return program.help()
}
function generateList () {
		var files = fs.readdirSync(rootPath)
			, dir
			, list = {}
		allowedInput.forEach(item => {
				dir = path.resolve(path.join(rootPath, `${item}s`))
				try {
						list[item] = fs.readdirSync(dir)
						if (item == 'plugin') {
								list[item] = list[item].map(item => {
										return item.replace(/\.js$/, '')
								}).filter(item => {
										return item != 'wx'
								})
						}
				} catch (e) {
						list[item] = []
				}
		})
		if(!fs.existsSync(`${rootPath}/config`)){
				cd(rootPath)
				mkdir('config')
		}
		fs.writeFileSync(`${rootPath}/config/list.json`, JSON.stringify(list, 2, '\t'), 'utf-8')
		return list
}
function createConfig(){
		generateList()
		console.log()
		console.log(chalk.green('   recreate all developed list config, enjoy it'))
		console.log()
		exit(1)
}
function toHeadUpper (s) {
		return s.substr(0, 1).toUpperCase() + s.substr(1)
}
function readlist () {
		console.log()
		Object.keys(list).forEach(item => {
				if (list[item].length == 0) {
						return false
				}
				console.log(chalk.bold(`    ${toHeadUpper(item)}s`))
				console.log()
				list[item].forEach(p => {
						console.log(`      ${p}`)
				})
				console.log()
		})
		exit(1)
}

help()

/**
 * Padding.
 */
process.on('exit', function () {
		console.log()
})

if (program.args.length == 2) {
		type = program.args[0]
		name = program.args[1]
		console.log()
		if (allowedInput.indexOf(type) == -1) {
				console.log(chalk.yellow('    Please check your input, list the correct pose below'))
				console.log('    $ cli plugin test')
				console.log('    $ cli component test')
				console.log('    $ cli directive test')
				return
		}
		create(type, name)
}
function create (type, name) {
		let target

			, pluginTemplate = `function plugin(Vue) {
		if(plugin.installed){
				return
		}
		// write your code
}
if(typeof window !== 'undefined' && window.Vue){
		window.Vue.use(plugin)
}
module.exports = plugin
`
		switch (type) {
				case 'component':
						const fileList = ['style.css', 'template.html', 'index.vue']
						target = `${rootPath}/${type}s/${name}`
						if(fs.existsSync(target)){
								console.log(chalk.red(`   ${type} ${name} has been created`))
								return
						}
						mkdir('-p', target)
						console.log(chalk.blue(`    created ${type} ${name} successfully`))
						console.log(chalk.green(`    ${type}s/${name}`))

						cd(target)
						fileList.forEach( (item, i) => {
								if(i == 2){
										exec(`echo "${vueTemplate}" >> index.vue`)
								} else {
										touch(item)
								}
								console.log(chalk.green(`    ${type}s/${name}/${item}`))
						})

						break
				case 'plugin':
						target = `${rootPath}/${type}s/${name}.js`
						if(fs.existsSync(target)){
								console.log(chalk.red(`   ${type} ${name} has been created`))
								return
						}
						exec(`echo "${pluginTemplate}" > ${target}`)
						console.log(chalk.blue(`    created ${type} ${name} successfully`))
						console.log()
						console.log(chalk.green(`    ${type}s/${name}.js`))
						break
				case 'directive':
						// TODO
						break

		}
		createExamples(type, name)
		generateList()
}
function createExamples(type, name){
		let target = `${rootPath}/examples/pages/${type}s/${name}`
		if(!fs.existsSync(target)){
				mkdir('-p', target)
				console.log(chalk.green(`    examples/pages/${type}s/${name}`))
		}
		cd(target)

		const fileList = ['template.html', 'index.vue']
		fileList.forEach((item, i) => {
				if(i == 1){
						exec(`echo "${vueTemplate}" > ${target}/index.vue`)
				} else {
						touch(item)
				}
				console.log(chalk.green(`    examples/pages/${type}s/${name}/${item}`))
		})
}
function writeFile (path, data, options) {
		if (!path || !data || !options) {
				return Promise.reject('args empty')
		}
		return new Promise((resolve, reject) => {
				fs.writeFile(path, data, options, function (err, data) {
						if (err) reject(err)
						resolve(data)
				})
		})
}
