const path = require('path')
const express = require('express')
const proxyConf = require('./proxy')
const axios = require('axios')
const app = express()

const headerConf = {
    //   referer: 'https://api.vc.bilibili.com/',
    referer: 'https://t.bilibili.com/',
    host: 'api.vc.bilibili.com'
}


let apiRoutes = express.Router()

for (let k in proxyConf) {
    app.get(k, function(req, res) {
        axios.get(proxyConf[k], {
            headers: headerConf,
            params: req.query
        }).then(response => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.json(response.data.data) // need interceptors
        }).catch(e => {
            console.log(e)
        })
    })
}

app.use('/', apiRoutes)

const port = process.env.PORT || 5000
// use static dict
app.use('/static', express.static(path.join(__dirname, 'static')))

/**
 *
 */
app.listen(port, function () {
  console.info('server is running, enjoy it!')
})
