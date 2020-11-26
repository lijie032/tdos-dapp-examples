#!/usr/bin/env node

const path = require('path')
const child_process = require('child_process')
const fs = require('fs')

// 相对本文件的相对路径转为相对于工作目录的相对路径
function resolve(src){
    return path.relative(process.cwd(), path.join(__dirname, src))
}

let src = process.env['ENTRY'] || resolve('chatdapp.ts')

const { compileABI } = require('@salaku/js-sdk')

const dst = src.replace(/^(.*)\.ts$/, '$1.wasm')
let abort = '../../node_modules/@salaku/js-sdk/lib/prelude/abort'
abort = resolve(abort)

const abiDist = src.replace(/^(.*)\.ts$/, '$1.abi.json')


const cmd = `asc ${src} -b ${dst} --runtime none --use abort=${abort.replace(/\\/g, '/')} --sourceMap --debug`

const abi = compileABI(fs.readFileSync(src))
fs.writeFileSync(abiDist, JSON.stringify(abi, null, 2))
console.log(cmd)

child_process.execSync(cmd)