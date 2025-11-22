const fs = require('fs/promises')
const path = require('path')

const pathToConfig = path.join(__dirname, 'config.ini')
const directoryToCopyTo = path.join(__dirname, 'code')

// Files to copy from the repo
const filesToCopy = ['common.js', 'form.html', 'form.js']

async function main(){
    const config = JSON.parse(await fs.readFile(pathToConfig, 'utf-8'))
    const directoryToCopyFrom = process.env.CI ? path.join(__dirname, 'repo') : path.join(__dirname, ...config.repoPath)

    for (const file of (await fs.readdir(directoryToCopyFrom)).filter(f => filesToCopy.includes(f))) 
        await fs.copyFile(path.join(directoryToCopyFrom, file), path.join(directoryToCopyTo, file))
    
}
main()