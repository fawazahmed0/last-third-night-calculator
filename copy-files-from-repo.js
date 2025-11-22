const fs = require('fs/promises')
const path = require('path')

const directoryToCopyFrom = path.join(__dirname, 'repo')
const directoryToCopyTo = path.join(__dirname, 'code')

async function main(){
    await fs.mkdir(directoryToCopyFrom, {recursive: true})
    await fs.mkdir(directoryToCopyTo, {recursive: true})

    const filesToCopy = ['common.js', 'form.html', 'form.js']
    for (const file of (await fs.readdir(directoryToCopyFrom)).filter(f => filesToCopy.includes(f))) 
        await fs.copyFile(path.join(directoryToCopyFrom, file), path.join(directoryToCopyTo, file))
    
}
main()