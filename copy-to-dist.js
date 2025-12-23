const fs = require('fs/promises')
const path = require('path')

const {minifyFile, listDirRecursive} = require('./utilities')

const sourceDir = path.join(__dirname, 'code')
const distDir = path.join(__dirname, 'docs')

async function main() {
  await fs.rm(distDir, { recursive: true, force: true })
  await fs.cp(sourceDir, distDir, { recursive: true })

  for(const filePath of await listDirRecursive(distDir, true))
    await minifyFile(filePath, filePath)

 
}

main()