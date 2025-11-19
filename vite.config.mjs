import * as fs from 'node:fs/promises'
export default {
  server: {
    https: {key: await fs.readFile('key.pem'), cert: await fs.readFile('cert.pem')},
  }
}