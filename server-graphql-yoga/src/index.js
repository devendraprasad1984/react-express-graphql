//ERR_MODULE_NOT_FOUND occurs when we have type=module in package.json, but while importing we dont specify extension
import BaseServer from './server/index.js'


BaseServer.start({port: 6209}, () => {
    console.log('server started on',6209)
})