const fs = require('fs/promises')
const path = require('path')

const sourceDir = path.join(__dirname, 'code')
const distDir = path.join(__dirname, 'docs')
const pathToConfig = path.join(__dirname, 'config.ini')

async function main() {
  const config = JSON.parse(await fs.readFile(pathToConfig, 'utf-8'))
  const pathToRepoDir = process.env.CI ? path.join(__dirname, 'repo') : path.join(__dirname, ...config.repoPath)
  const {minifyFile, listDirRecursive} = require(path.join(pathToRepoDir, 'utilities.js'))

  await fs.rm(distDir, { recursive: true, force: true })
  await fs.cp(sourceDir, distDir, { recursive: true })

  for(const filePath of await listDirRecursive(distDir, true))
    await minifyFile(filePath, filePath)

 
}

main()