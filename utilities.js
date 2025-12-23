const fs = require('fs/promises')
const path = require('path')
const util = require('node:util');
const swc = require('@swc/core')
const swcHTML = require('@swc/html')
const exec = util.promisify(require('node:child_process').exec);

async function getJSON(pathToJSON) {
    let data = await fs.readFile(pathToJSON, { encoding: 'utf8' })
    return JSON.parse(data)
}

async function saveJSON(pathToJSON, json, pretty = true) {
    await fs.mkdir(path.dirname(pathToJSON), { recursive: true })
    await fs.writeFile(pathToJSON, JSON.stringify(json, null, pretty ? 4 : undefined))
}

async function zipWith7zip(pathArr, pathToZipSave, password) {

    if (!Array.isArray(pathArr))
        pathArr = [pathArr]
    await deleteAfter(pathToZipSave)
    let passwordWithFlag = ` -p${password}`
    await exec(`7z a "${pathToZipSave}" ${pathArr.map(e => `"${e}"`).join(' ')} -t7z -m0=lzma2 -mx=9 -aoa -mfb=64 -md=32m -ms=on -mhe=on -mmt=on${password ? passwordWithFlag : ''}`)
}

// Returns files path in Array
async function extractWith7zip(pathToZip, pathToSave, password) {
    let passwordWithFlag = ` -p${password}`
    await fs.mkdir(pathToSave, { recursive: true })
    await exec(`7z x -y "${pathToZip}" -o"${pathToSave}"${password ? passwordWithFlag : ''}`).catch(console.error)
    let pathArr = await listDirRecursive(pathToSave, true);
    return pathArr
}

// Minifies a file if possible, else copies it
async function minifyFile(pathToSourceFile, pathToDestFile) {
    const extension = path.extname(pathToSourceFile)

    const jsExtensions = ['.js', '.mjs', '.cjs']
    const htmlExtensions = ['.html', '.htm'] 
    const jsonExtensions = ['.json']

    if(![...jsExtensions, ...htmlExtensions, ...jsonExtensions].includes(extension)){
        if(pathToSourceFile != pathToDestFile)
        await fs.copyFile(pathToSourceFile, pathToDestFile);
        return;
    }

     let sourceCode = await fs.readFile(pathToSourceFile)
     let minifiedCode = {};
     if(jsExtensions.includes(extension))
        minifiedCode = await swc.minify(sourceCode).catch(() => swc.minify(sourceCode, {module:true}))
     else if(htmlExtensions.includes(extension)) 
        minifiedCode = await swcHTML.minify(sourceCode)
     else if(jsonExtensions.includes(extension))
        minifiedCode.code = JSON.stringify(JSON.parse(sourceCode));


    await fs.writeFile(pathToDestFile, minifiedCode.code)
}

// Takes a single path or pathsArray
async function deleteAfter(pathArr, afterTime = 0) {

    if (pathArr === undefined)
        return

    await sleep(afterTime)
    if (!Array.isArray(pathArr))
        pathArr = [pathArr]
    await Promise.allSettled(pathArr.map(e => fs.rm(e, { recursive: true, force: true }).catch(console.error)))
}

// lists all files and directories in folder, returns full path
async function listDirRecursive(pathToDir, onlyFiles, onlyDir) {
    let result = await fs.readdir(pathToDir, { withFileTypes: true, recursive: true })
    if (onlyFiles)
        result = result.filter(e => e.isFile())
    else if (onlyDir)
        result = result.filter(e => e.isDirectory())

    return result.map(e => path.join(e.parentPath, e.name))


}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    getJSON,
    saveJSON,
    deleteAfter,
    zipWith7zip,
    extractWith7zip,
    listDirRecursive,
    sleep,
    minifyFile,
}