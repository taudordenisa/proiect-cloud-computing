{"filter":false,"title":"server.js","tooltip":"/server.js","undoManager":{"mark":75,"position":75,"stack":[[{"start":{"row":0,"column":0},"end":{"row":0,"column":34},"action":"insert","lines":["app.listen(process.env.PORT||8080)"],"id":1}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":34},"action":"remove","lines":["app.listen(process.env.PORT||8080)"],"id":2},{"start":{"row":0,"column":0},"end":{"row":139,"column":34},"action":"insert","lines":["const express = require(\"express\")","const Sequelize = require('sequelize')","const axios = require(\"axios\")","let sequelize","","if(process.env.MYSQLCONNSTR_localdb) {","    let result = process.env.MYSQLCONNSTR_localdb.split(\";\")","    ","    sequelize = new Sequelize(result[0].split(\"=\")[1], result[2].split(\"=\")[1], result[3].split(\"=\")[1], {","        dialect: \"mysql\",","        host: result[1].split(\"=\")[1].split(\":\")[0],","        port: result[1].split(\"=\")[1].split(\":\")[1]","    })","} else {","    sequelize = new Sequelize('profile', 'root', 'password', {","        dialect: \"mysql\",","        host: \"aatty9p2au0i0u.chzq885goq4p.us-east-1.rds.amazonaws.com\",","        port: 3306","    })","}","","sequelize.authenticate().then(() => {","    console.log(\"Connected to database\")","}).catch(() => {","    console.log(\"Unable to connect to database\")","})","","const Messages = sequelize.define('messages', {","    subject: Sequelize.STRING,","    name: Sequelize.STRING,","    message: Sequelize.TEXT","})","","const app = express()","","app.use('/', express.static('frontend'))","","//definesc un endpoint de tip GET /hello","app.get('/hello', (request, response) => {","   response.status(200).json({hello: process.env})","})","","app.post('/github/:code', async (req, res) => {","    const code = req.params.code","    try {","        let auth = await axios({","            url: 'https://github.com/login/oauth/access_token',","            method: 'POST',","            data: {","                client_id: '78ee08dd6f900a5e9a47',","                client_secret: '8c5a5340527a6fe3c6345bfcf30cb3475d4959a8',","                code: code,","            },","            headers: {","                'Accept': 'application/json' ","            }","        })","        res.status(200).json(auth['data'])","    } catch(err) {","        res.status(500).json(err)","    }","})","","app.get('/createdb', (request, response) => {","    sequelize.sync({force:true}).then(() => {","        response.status(200).send('tables created')","    }).catch((err) => {","        console.log(err)","        response.status(200).send('could not create tables')","    })","})","","app.use(express.json())","app.use(express.urlencoded())","","//definire endpoint POST /messages","app.post('/messages', (request, response) => {","    Messages.create(request.body).then((result) => {","        response.status(201).json(result)","    }).catch((err) => {","        response.status(500).send(\"resource not created\")","    })","})","","app.get('/messages', (request, response) => {","    Messages.findAll().then((results) => {","        response.status(200).json(results)","    })","})","","app.get('/messages/:id', (request, response) => {","    Messages.findByPk(request.params.id).then((result) => {","        if(result) {","            response.status(200).json(result)","        } else {","            response.status(404).send('resource not found')","        }","    }).catch((err) => {","        console.log(err)","        response.status(500).send('database error')","    })","})","","app.put('/messages/:id', (request, response) => {","    Messages.findByPk(request.params.id).then((message) => {","        if(message) {","            message.update(request.body).then((result) => {","                response.status(201).json(result)","            }).catch((err) => {","                console.log(err)","                response.status(500).send('database error')","            })","        } else {","            response.status(404).send('resource not found')","        }","    }).catch((err) => {","        console.log(err)","        response.status(500).send('database error')","    })","})","","app.delete('/messages/:id', (request, response) => {","    Messages.findByPk(request.params.id).then((message) => {","        if(message) {","            message.destroy().then((result) => {","                response.status(204).send()","            }).catch((err) => {","                console.log(err)","                response.status(500).send('database error')","            })","        } else {","            response.status(404).send('resource not found')","        }","    }).catch((err) => {","        console.log(err)","        response.status(500).send('database error')","    })","})","","app.listen(process.env.PORT||8080)"]}],[{"start":{"row":74,"column":0},"end":{"row":137,"column":2},"action":"remove","lines":["","//definire endpoint POST /messages","app.post('/messages', (request, response) => {","    Messages.create(request.body).then((result) => {","        response.status(201).json(result)","    }).catch((err) => {","        response.status(500).send(\"resource not created\")","    })","})","","app.get('/messages', (request, response) => {","    Messages.findAll().then((results) => {","        response.status(200).json(results)","    })","})","","app.get('/messages/:id', (request, response) => {","    Messages.findByPk(request.params.id).then((result) => {","        if(result) {","            response.status(200).json(result)","        } else {","            response.status(404).send('resource not found')","        }","    }).catch((err) => {","        console.log(err)","        response.status(500).send('database error')","    })","})","","app.put('/messages/:id', (request, response) => {","    Messages.findByPk(request.params.id).then((message) => {","        if(message) {","            message.update(request.body).then((result) => {","                response.status(201).json(result)","            }).catch((err) => {","                console.log(err)","                response.status(500).send('database error')","            })","        } else {","            response.status(404).send('resource not found')","        }","    }).catch((err) => {","        console.log(err)","        response.status(500).send('database error')","    })","})","","app.delete('/messages/:id', (request, response) => {","    Messages.findByPk(request.params.id).then((message) => {","        if(message) {","            message.destroy().then((result) => {","                response.status(204).send()","            }).catch((err) => {","                console.log(err)","                response.status(500).send('database error')","            })","        } else {","            response.status(404).send('resource not found')","        }","    }).catch((err) => {","        console.log(err)","        response.status(500).send('database error')","    })","})"],"id":3}],[{"start":{"row":38,"column":0},"end":{"row":70,"column":2},"action":"remove","lines":["app.get('/hello', (request, response) => {","   response.status(200).json({hello: process.env})","})","","app.post('/github/:code', async (req, res) => {","    const code = req.params.code","    try {","        let auth = await axios({","            url: 'https://github.com/login/oauth/access_token',","            method: 'POST',","            data: {","                client_id: '78ee08dd6f900a5e9a47',","                client_secret: '8c5a5340527a6fe3c6345bfcf30cb3475d4959a8',","                code: code,","            },","            headers: {","                'Accept': 'application/json' ","            }","        })","        res.status(200).json(auth['data'])","    } catch(err) {","        res.status(500).json(err)","    }","})","","app.get('/createdb', (request, response) => {","    sequelize.sync({force:true}).then(() => {","        response.status(200).send('tables created')","    }).catch((err) => {","        console.log(err)","        response.status(200).send('could not create tables')","    })","})"],"id":4}],[{"start":{"row":36,"column":0},"end":{"row":38,"column":0},"action":"remove","lines":["","//definesc un endpoint de tip GET /hello",""],"id":5}],[{"start":{"row":34,"column":0},"end":{"row":36,"column":0},"action":"remove","lines":["","app.use('/', express.static('frontend'))",""],"id":6}],[{"start":{"row":27,"column":0},"end":{"row":31,"column":2},"action":"remove","lines":["const Messages = sequelize.define('messages', {","    subject: Sequelize.STRING,","    name: Sequelize.STRING,","    message: Sequelize.TEXT","})"],"id":7}],[{"start":{"row":4,"column":0},"end":{"row":25,"column":2},"action":"remove","lines":["","if(process.env.MYSQLCONNSTR_localdb) {","    let result = process.env.MYSQLCONNSTR_localdb.split(\";\")","    ","    sequelize = new Sequelize(result[0].split(\"=\")[1], result[2].split(\"=\")[1], result[3].split(\"=\")[1], {","        dialect: \"mysql\",","        host: result[1].split(\"=\")[1].split(\":\")[0],","        port: result[1].split(\"=\")[1].split(\":\")[1]","    })","} else {","    sequelize = new Sequelize('profile', 'root', 'password', {","        dialect: \"mysql\",","        host: \"aatty9p2au0i0u.chzq885goq4p.us-east-1.rds.amazonaws.com\",","        port: 3306","    })","}","","sequelize.authenticate().then(() => {","    console.log(\"Connected to database\")","}).catch(() => {","    console.log(\"Unable to connect to database\")","})"],"id":8}],[{"start":{"row":9,"column":0},"end":{"row":9,"column":40},"action":"insert","lines":["app.use('/', express.static('frontend'))"],"id":9}],[{"start":{"row":11,"column":0},"end":{"row":12,"column":29},"action":"remove","lines":["app.use(express.json())","app.use(express.urlencoded())"],"id":10}],[{"start":{"row":11,"column":0},"end":{"row":11,"column":16},"action":"insert","lines":["app.listen(8080)"],"id":11}],[{"start":{"row":0,"column":34},"end":{"row":3,"column":13},"action":"remove","lines":["","const Sequelize = require('sequelize')","const axios = require(\"axios\")","let sequelize"],"id":12}],[{"start":{"row":11,"column":0},"end":{"row":11,"column":34},"action":"remove","lines":["app.listen(process.env.PORT||8080)"],"id":13}],[{"start":{"row":6,"column":0},"end":{"row":6,"column":1},"action":"insert","lines":["/"],"id":14},{"start":{"row":6,"column":1},"end":{"row":6,"column":2},"action":"insert","lines":["/"]}],[{"start":{"row":6,"column":1},"end":{"row":6,"column":2},"action":"remove","lines":["/"],"id":15},{"start":{"row":6,"column":0},"end":{"row":6,"column":1},"action":"remove","lines":["/"]}],[{"start":{"row":3,"column":0},"end":{"row":8,"column":2},"action":"insert","lines":["const Sequelize = require('sequelize')","","const sequelize = new Sequelize('profile', 'root', '', {","    dialect: \"mysql\",","    host: \"localhost\"","})"],"id":16}],[{"start":{"row":5,"column":33},"end":{"row":5,"column":40},"action":"remove","lines":["profile"],"id":17},{"start":{"row":5,"column":33},"end":{"row":5,"column":34},"action":"insert","lines":["m"]},{"start":{"row":5,"column":34},"end":{"row":5,"column":35},"action":"insert","lines":["e"]},{"start":{"row":5,"column":35},"end":{"row":5,"column":36},"action":"insert","lines":["l"]},{"start":{"row":5,"column":36},"end":{"row":5,"column":37},"action":"insert","lines":["o"]},{"start":{"row":5,"column":37},"end":{"row":5,"column":38},"action":"insert","lines":["d"]},{"start":{"row":5,"column":38},"end":{"row":5,"column":39},"action":"insert","lines":["i"]},{"start":{"row":5,"column":39},"end":{"row":5,"column":40},"action":"insert","lines":["i"]}],[{"start":{"row":8,"column":2},"end":{"row":9,"column":0},"action":"insert","lines":["",""],"id":18},{"start":{"row":9,"column":0},"end":{"row":10,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":10,"column":0},"end":{"row":14,"column":2},"action":"insert","lines":["sequelize.authenticate().then(() => {","    console.log(\"Connected to database\")","}).catch(() => {","    console.log(\"Unable to connect to database\")","})"],"id":19}],[{"start":{"row":5,"column":52},"end":{"row":5,"column":53},"action":"insert","lines":["t"],"id":20},{"start":{"row":5,"column":53},"end":{"row":5,"column":54},"action":"insert","lines":["d"]},{"start":{"row":5,"column":54},"end":{"row":5,"column":55},"action":"insert","lines":["e"]},{"start":{"row":5,"column":55},"end":{"row":5,"column":56},"action":"insert","lines":["n"]},{"start":{"row":5,"column":56},"end":{"row":5,"column":57},"action":"insert","lines":["i"]},{"start":{"row":5,"column":57},"end":{"row":5,"column":58},"action":"insert","lines":["s"]},{"start":{"row":5,"column":58},"end":{"row":5,"column":59},"action":"insert","lines":["a"]}],[{"start":{"row":5,"column":59},"end":{"row":5,"column":60},"action":"insert","lines":["5"],"id":21}],[{"start":{"row":5,"column":44},"end":{"row":5,"column":48},"action":"remove","lines":["root"],"id":22},{"start":{"row":5,"column":44},"end":{"row":5,"column":45},"action":"insert","lines":["t"]}],[{"start":{"row":5,"column":44},"end":{"row":5,"column":45},"action":"remove","lines":["t"],"id":23},{"start":{"row":5,"column":44},"end":{"row":5,"column":56},"action":"insert","lines":["taudordenisa"]}],[{"start":{"row":5,"column":33},"end":{"row":5,"column":40},"action":"remove","lines":["melodii"],"id":26},{"start":{"row":5,"column":33},"end":{"row":5,"column":34},"action":"insert","lines":["m"]},{"start":{"row":5,"column":34},"end":{"row":5,"column":35},"action":"insert","lines":["u"]},{"start":{"row":5,"column":35},"end":{"row":5,"column":36},"action":"insert","lines":["s"]},{"start":{"row":5,"column":36},"end":{"row":5,"column":37},"action":"insert","lines":["i"]},{"start":{"row":5,"column":37},"end":{"row":5,"column":38},"action":"insert","lines":["c"]}],[{"start":{"row":15,"column":0},"end":{"row":16,"column":0},"action":"insert","lines":["",""],"id":27},{"start":{"row":16,"column":0},"end":{"row":17,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":16,"column":0},"end":{"row":20,"column":2},"action":"insert","lines":["const Messages = sequelize.define('messages', {","    subject: Sequelize.STRING,","    name: Sequelize.STRING,","    message: Sequelize.TEXT","})"],"id":28}],[{"start":{"row":16,"column":35},"end":{"row":16,"column":43},"action":"remove","lines":["messages"],"id":29},{"start":{"row":16,"column":35},"end":{"row":16,"column":36},"action":"insert","lines":["s"]},{"start":{"row":16,"column":36},"end":{"row":16,"column":37},"action":"insert","lines":["o"]},{"start":{"row":16,"column":37},"end":{"row":16,"column":38},"action":"insert","lines":["n"]},{"start":{"row":16,"column":38},"end":{"row":16,"column":39},"action":"insert","lines":["g"]},{"start":{"row":16,"column":39},"end":{"row":16,"column":40},"action":"insert","lines":["s"]}],[{"start":{"row":17,"column":4},"end":{"row":17,"column":11},"action":"remove","lines":["subject"],"id":31},{"start":{"row":17,"column":4},"end":{"row":17,"column":17},"action":"insert","lines":["singer's name"]}],[{"start":{"row":17,"column":10},"end":{"row":17,"column":11},"action":"remove","lines":["'"],"id":32}],[{"start":{"row":17,"column":10},"end":{"row":17,"column":11},"action":"remove","lines":["s"],"id":33}],[{"start":{"row":18,"column":4},"end":{"row":18,"column":8},"action":"remove","lines":["name"],"id":34},{"start":{"row":18,"column":4},"end":{"row":18,"column":5},"action":"insert","lines":["s"]},{"start":{"row":18,"column":5},"end":{"row":18,"column":6},"action":"insert","lines":["o"]},{"start":{"row":18,"column":6},"end":{"row":18,"column":7},"action":"insert","lines":["n"]},{"start":{"row":18,"column":7},"end":{"row":18,"column":8},"action":"insert","lines":["g"]}],[{"start":{"row":18,"column":8},"end":{"row":18,"column":9},"action":"insert","lines":[" "],"id":35},{"start":{"row":18,"column":9},"end":{"row":18,"column":10},"action":"insert","lines":["n"]},{"start":{"row":18,"column":10},"end":{"row":18,"column":11},"action":"insert","lines":["a"]},{"start":{"row":18,"column":11},"end":{"row":18,"column":12},"action":"insert","lines":["m"]},{"start":{"row":18,"column":12},"end":{"row":18,"column":13},"action":"insert","lines":["e"]}],[{"start":{"row":18,"column":4},"end":{"row":18,"column":13},"action":"remove","lines":["song name"],"id":36},{"start":{"row":18,"column":4},"end":{"row":18,"column":5},"action":"insert","lines":["a"]},{"start":{"row":18,"column":5},"end":{"row":18,"column":6},"action":"insert","lines":["l"]},{"start":{"row":18,"column":6},"end":{"row":18,"column":7},"action":"insert","lines":["b"]},{"start":{"row":18,"column":7},"end":{"row":18,"column":8},"action":"insert","lines":["u"]},{"start":{"row":18,"column":8},"end":{"row":18,"column":9},"action":"insert","lines":["m"]}],[{"start":{"row":19,"column":4},"end":{"row":19,"column":11},"action":"remove","lines":["message"],"id":37},{"start":{"row":19,"column":4},"end":{"row":19,"column":5},"action":"insert","lines":["s"]},{"start":{"row":19,"column":5},"end":{"row":19,"column":6},"action":"insert","lines":["o"]},{"start":{"row":19,"column":6},"end":{"row":19,"column":7},"action":"insert","lines":["n"]},{"start":{"row":19,"column":7},"end":{"row":19,"column":8},"action":"insert","lines":["g"]}],[{"start":{"row":19,"column":8},"end":{"row":19,"column":9},"action":"insert","lines":[" "],"id":38},{"start":{"row":19,"column":9},"end":{"row":19,"column":10},"action":"insert","lines":["n"]},{"start":{"row":19,"column":10},"end":{"row":19,"column":11},"action":"insert","lines":["a"]},{"start":{"row":19,"column":11},"end":{"row":19,"column":12},"action":"insert","lines":["m"]},{"start":{"row":19,"column":12},"end":{"row":19,"column":13},"action":"insert","lines":["e"]}],[{"start":{"row":17,"column":14},"end":{"row":17,"column":15},"action":"remove","lines":["e"],"id":39},{"start":{"row":17,"column":13},"end":{"row":17,"column":14},"action":"remove","lines":["m"]},{"start":{"row":17,"column":12},"end":{"row":17,"column":13},"action":"remove","lines":["a"]},{"start":{"row":17,"column":11},"end":{"row":17,"column":12},"action":"remove","lines":["n"]},{"start":{"row":17,"column":10},"end":{"row":17,"column":11},"action":"remove","lines":[" "]}],[{"start":{"row":19,"column":8},"end":{"row":19,"column":9},"action":"remove","lines":[" "],"id":40},{"start":{"row":19,"column":7},"end":{"row":19,"column":8},"action":"remove","lines":["g"]},{"start":{"row":19,"column":6},"end":{"row":19,"column":7},"action":"remove","lines":["n"]},{"start":{"row":19,"column":5},"end":{"row":19,"column":6},"action":"remove","lines":["o"]},{"start":{"row":19,"column":4},"end":{"row":19,"column":5},"action":"remove","lines":["s"]}],[{"start":{"row":23,"column":40},"end":{"row":24,"column":0},"action":"insert","lines":["",""],"id":41},{"start":{"row":24,"column":0},"end":{"row":25,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":25,"column":0},"end":{"row":32,"column":2},"action":"insert","lines":["app.get('/createdb', (request, response) => {","    sequelize.sync({force:true}).then(() => {","        response.status(200).send('tables created')","    }).catch((err) => {","        console.log(err)","        response.status(200).send('could not create tables')","    })","})"],"id":42}],[{"start":{"row":36,"column":0},"end":{"row":37,"column":0},"action":"remove","lines":["",""],"id":43},{"start":{"row":35,"column":0},"end":{"row":36,"column":0},"action":"remove","lines":["",""]},{"start":{"row":34,"column":16},"end":{"row":35,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"remove","lines":["",""],"id":44}],[{"start":{"row":0,"column":34},"end":{"row":1,"column":0},"action":"remove","lines":["",""],"id":45}],[{"start":{"row":14,"column":6},"end":{"row":14,"column":14},"action":"remove","lines":["Messages"],"id":46},{"start":{"row":14,"column":6},"end":{"row":14,"column":7},"action":"insert","lines":["S"]},{"start":{"row":14,"column":7},"end":{"row":14,"column":8},"action":"insert","lines":["o"]},{"start":{"row":14,"column":8},"end":{"row":14,"column":9},"action":"insert","lines":["n"]},{"start":{"row":14,"column":9},"end":{"row":14,"column":10},"action":"insert","lines":["g"]},{"start":{"row":14,"column":10},"end":{"row":14,"column":11},"action":"insert","lines":["s"]}],[{"start":{"row":30,"column":2},"end":{"row":31,"column":0},"action":"insert","lines":["",""],"id":47},{"start":{"row":31,"column":0},"end":{"row":32,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":32,"column":0},"end":{"row":42,"column":2},"action":"insert","lines":["app.use(express.json())","app.use(express.urlencoded())","","//definire endpoint POST /messages","app.post('/messages', (request, response) => {","    Messages.create(request.body).then((result) => {","        response.status(201).json(result)","    }).catch((err) => {","        response.status(500).send(\"resource not created\")","    })","})"],"id":48}],[{"start":{"row":37,"column":4},"end":{"row":37,"column":12},"action":"remove","lines":["Messages"],"id":49},{"start":{"row":37,"column":4},"end":{"row":37,"column":5},"action":"insert","lines":["S"]},{"start":{"row":37,"column":5},"end":{"row":37,"column":6},"action":"insert","lines":["o"]},{"start":{"row":37,"column":6},"end":{"row":37,"column":7},"action":"insert","lines":["n"]},{"start":{"row":37,"column":7},"end":{"row":37,"column":8},"action":"insert","lines":["g"]},{"start":{"row":37,"column":8},"end":{"row":37,"column":9},"action":"insert","lines":["s"]}],[{"start":{"row":36,"column":11},"end":{"row":36,"column":19},"action":"remove","lines":["messages"],"id":50},{"start":{"row":36,"column":11},"end":{"row":36,"column":12},"action":"insert","lines":["s"]},{"start":{"row":36,"column":12},"end":{"row":36,"column":13},"action":"insert","lines":["o"]},{"start":{"row":36,"column":13},"end":{"row":36,"column":14},"action":"insert","lines":["n"]},{"start":{"row":36,"column":14},"end":{"row":36,"column":15},"action":"insert","lines":["g"]},{"start":{"row":36,"column":15},"end":{"row":36,"column":16},"action":"insert","lines":["s"]}],[{"start":{"row":1,"column":38},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":51}],[{"start":{"row":2,"column":0},"end":{"row":3,"column":13},"action":"insert","lines":["const axios = require(\"axios\")","let sequelize"],"id":52}],[{"start":{"row":3,"column":0},"end":{"row":3,"column":13},"action":"remove","lines":["let sequelize"],"id":53},{"start":{"row":2,"column":30},"end":{"row":3,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":22,"column":40},"end":{"row":23,"column":0},"action":"insert","lines":["",""],"id":54},{"start":{"row":23,"column":0},"end":{"row":24,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":24,"column":0},"end":{"row":26,"column":2},"action":"insert","lines":["app.get('/hello', (request, response) => {","   response.status(200).json({hello: process.env})","})"],"id":55}],[{"start":{"row":47,"column":2},"end":{"row":48,"column":0},"action":"insert","lines":["",""],"id":56},{"start":{"row":48,"column":0},"end":{"row":49,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":49,"column":0},"end":{"row":53,"column":2},"action":"insert","lines":["app.get('/messages', (request, response) => {","    Messages.findAll().then((results) => {","        response.status(200).json(results)","    })","})"],"id":57}],[{"start":{"row":49,"column":10},"end":{"row":49,"column":18},"action":"remove","lines":["messages"],"id":58},{"start":{"row":49,"column":10},"end":{"row":49,"column":11},"action":"insert","lines":["s"]},{"start":{"row":49,"column":11},"end":{"row":49,"column":12},"action":"insert","lines":["o"]},{"start":{"row":49,"column":12},"end":{"row":49,"column":13},"action":"insert","lines":["n"]},{"start":{"row":49,"column":13},"end":{"row":49,"column":14},"action":"insert","lines":["g"]},{"start":{"row":49,"column":14},"end":{"row":49,"column":15},"action":"insert","lines":["s"]}],[{"start":{"row":50,"column":4},"end":{"row":50,"column":12},"action":"remove","lines":["Messages"],"id":59},{"start":{"row":50,"column":4},"end":{"row":50,"column":5},"action":"insert","lines":["S"]},{"start":{"row":50,"column":5},"end":{"row":50,"column":6},"action":"insert","lines":["o"]},{"start":{"row":50,"column":6},"end":{"row":50,"column":7},"action":"insert","lines":["n"]},{"start":{"row":50,"column":7},"end":{"row":50,"column":8},"action":"insert","lines":["g"]},{"start":{"row":50,"column":8},"end":{"row":50,"column":9},"action":"insert","lines":["s"]}],[{"start":{"row":53,"column":2},"end":{"row":54,"column":0},"action":"insert","lines":["",""],"id":60},{"start":{"row":54,"column":0},"end":{"row":55,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":55,"column":0},"end":{"row":66,"column":2},"action":"insert","lines":["app.get('/messages/:id', (request, response) => {","    Messages.findByPk(request.params.id).then((result) => {","        if(result) {","            response.status(200).json(result)","        } else {","            response.status(404).send('resource not found')","        }","    }).catch((err) => {","        console.log(err)","        response.status(500).send('database error')","    })","})"],"id":61}],[{"start":{"row":55,"column":10},"end":{"row":55,"column":18},"action":"remove","lines":["messages"],"id":62},{"start":{"row":55,"column":10},"end":{"row":55,"column":11},"action":"insert","lines":["s"]},{"start":{"row":55,"column":11},"end":{"row":55,"column":12},"action":"insert","lines":["o"]},{"start":{"row":55,"column":12},"end":{"row":55,"column":13},"action":"insert","lines":["n"]},{"start":{"row":55,"column":13},"end":{"row":55,"column":14},"action":"insert","lines":["g"]},{"start":{"row":55,"column":14},"end":{"row":55,"column":15},"action":"insert","lines":["s"]}],[{"start":{"row":56,"column":4},"end":{"row":56,"column":12},"action":"remove","lines":["Messages"],"id":63},{"start":{"row":56,"column":4},"end":{"row":56,"column":5},"action":"insert","lines":["S"]},{"start":{"row":56,"column":5},"end":{"row":56,"column":6},"action":"insert","lines":["o"]},{"start":{"row":56,"column":6},"end":{"row":56,"column":7},"action":"insert","lines":["n"]},{"start":{"row":56,"column":7},"end":{"row":56,"column":8},"action":"insert","lines":["g"]},{"start":{"row":56,"column":8},"end":{"row":56,"column":9},"action":"insert","lines":["s"]}],[{"start":{"row":66,"column":2},"end":{"row":67,"column":0},"action":"insert","lines":["",""],"id":64},{"start":{"row":67,"column":0},"end":{"row":68,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":68,"column":0},"end":{"row":84,"column":2},"action":"insert","lines":["app.put('/messages/:id', (request, response) => {","    Messages.findByPk(request.params.id).then((message) => {","        if(message) {","            message.update(request.body).then((result) => {","                response.status(201).json(result)","            }).catch((err) => {","                console.log(err)","                response.status(500).send('database error')","            })","        } else {","            response.status(404).send('resource not found')","        }","    }).catch((err) => {","        console.log(err)","        response.status(500).send('database error')","    })","})"],"id":65}],[{"start":{"row":68,"column":10},"end":{"row":68,"column":18},"action":"remove","lines":["messages"],"id":66},{"start":{"row":68,"column":10},"end":{"row":68,"column":11},"action":"insert","lines":["s"]},{"start":{"row":68,"column":11},"end":{"row":68,"column":12},"action":"insert","lines":["o"]},{"start":{"row":68,"column":12},"end":{"row":68,"column":13},"action":"insert","lines":["n"]},{"start":{"row":68,"column":13},"end":{"row":68,"column":14},"action":"insert","lines":["g"]},{"start":{"row":68,"column":14},"end":{"row":68,"column":15},"action":"insert","lines":["s"]}],[{"start":{"row":69,"column":4},"end":{"row":69,"column":12},"action":"remove","lines":["Messages"],"id":67},{"start":{"row":69,"column":4},"end":{"row":69,"column":5},"action":"insert","lines":["S"]},{"start":{"row":69,"column":5},"end":{"row":69,"column":6},"action":"insert","lines":["o"]},{"start":{"row":69,"column":6},"end":{"row":69,"column":7},"action":"insert","lines":["n"]},{"start":{"row":69,"column":7},"end":{"row":69,"column":8},"action":"insert","lines":["g"]},{"start":{"row":69,"column":8},"end":{"row":69,"column":9},"action":"insert","lines":["s"]}],[{"start":{"row":69,"column":44},"end":{"row":69,"column":51},"action":"remove","lines":["message"],"id":68},{"start":{"row":69,"column":44},"end":{"row":69,"column":45},"action":"insert","lines":["n"]},{"start":{"row":69,"column":45},"end":{"row":69,"column":46},"action":"insert","lines":["a"]},{"start":{"row":69,"column":46},"end":{"row":69,"column":47},"action":"insert","lines":["m"]},{"start":{"row":69,"column":47},"end":{"row":69,"column":48},"action":"insert","lines":["e"]}],[{"start":{"row":70,"column":11},"end":{"row":70,"column":18},"action":"remove","lines":["message"],"id":69},{"start":{"row":70,"column":11},"end":{"row":70,"column":12},"action":"insert","lines":["n"]},{"start":{"row":70,"column":12},"end":{"row":70,"column":13},"action":"insert","lines":["a"]},{"start":{"row":70,"column":13},"end":{"row":70,"column":14},"action":"insert","lines":["m"]},{"start":{"row":70,"column":14},"end":{"row":70,"column":15},"action":"insert","lines":["e"]}],[{"start":{"row":71,"column":12},"end":{"row":71,"column":19},"action":"remove","lines":["message"],"id":70},{"start":{"row":71,"column":12},"end":{"row":71,"column":13},"action":"insert","lines":["n"]},{"start":{"row":71,"column":13},"end":{"row":71,"column":14},"action":"insert","lines":["a"]},{"start":{"row":71,"column":14},"end":{"row":71,"column":15},"action":"insert","lines":["m"]},{"start":{"row":71,"column":15},"end":{"row":71,"column":16},"action":"insert","lines":["e"]}],[{"start":{"row":84,"column":2},"end":{"row":85,"column":0},"action":"insert","lines":["",""],"id":71},{"start":{"row":85,"column":0},"end":{"row":86,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":86,"column":0},"end":{"row":102,"column":2},"action":"insert","lines":["app.delete('/messages/:id', (request, response) => {","    Messages.findByPk(request.params.id).then((message) => {","        if(message) {","            message.destroy().then((result) => {","                response.status(204).send()","            }).catch((err) => {","                console.log(err)","                response.status(500).send('database error')","            })","        } else {","            response.status(404).send('resource not found')","        }","    }).catch((err) => {","        console.log(err)","        response.status(500).send('database error')","    })","})"],"id":72}],[{"start":{"row":86,"column":13},"end":{"row":86,"column":21},"action":"remove","lines":["messages"],"id":73},{"start":{"row":86,"column":13},"end":{"row":86,"column":14},"action":"insert","lines":["s"]},{"start":{"row":86,"column":14},"end":{"row":86,"column":15},"action":"insert","lines":["o"]},{"start":{"row":86,"column":15},"end":{"row":86,"column":16},"action":"insert","lines":["n"]},{"start":{"row":86,"column":16},"end":{"row":86,"column":17},"action":"insert","lines":["g"]},{"start":{"row":86,"column":17},"end":{"row":86,"column":18},"action":"insert","lines":["s"]}],[{"start":{"row":87,"column":4},"end":{"row":87,"column":12},"action":"remove","lines":["Messages"],"id":74},{"start":{"row":87,"column":4},"end":{"row":87,"column":5},"action":"insert","lines":["S"]},{"start":{"row":87,"column":5},"end":{"row":87,"column":6},"action":"insert","lines":["o"]},{"start":{"row":87,"column":6},"end":{"row":87,"column":7},"action":"insert","lines":["n"]},{"start":{"row":87,"column":7},"end":{"row":87,"column":8},"action":"insert","lines":["g"]},{"start":{"row":87,"column":8},"end":{"row":87,"column":9},"action":"insert","lines":["s"]}],[{"start":{"row":87,"column":44},"end":{"row":87,"column":51},"action":"remove","lines":["message"],"id":75},{"start":{"row":87,"column":44},"end":{"row":87,"column":45},"action":"insert","lines":["n"]},{"start":{"row":87,"column":45},"end":{"row":87,"column":46},"action":"insert","lines":["a"]},{"start":{"row":87,"column":46},"end":{"row":87,"column":47},"action":"insert","lines":["m"]},{"start":{"row":87,"column":47},"end":{"row":87,"column":48},"action":"insert","lines":["e"]},{"start":{"row":87,"column":48},"end":{"row":87,"column":49},"action":"insert","lines":["s"]}],[{"start":{"row":87,"column":48},"end":{"row":87,"column":49},"action":"remove","lines":["s"],"id":76}],[{"start":{"row":88,"column":11},"end":{"row":88,"column":18},"action":"remove","lines":["message"],"id":77},{"start":{"row":88,"column":11},"end":{"row":88,"column":12},"action":"insert","lines":["n"]},{"start":{"row":88,"column":12},"end":{"row":88,"column":13},"action":"insert","lines":["a"]},{"start":{"row":88,"column":13},"end":{"row":88,"column":14},"action":"insert","lines":["m"]},{"start":{"row":88,"column":14},"end":{"row":88,"column":15},"action":"insert","lines":["e"]}],[{"start":{"row":89,"column":12},"end":{"row":89,"column":19},"action":"remove","lines":["message"],"id":78},{"start":{"row":89,"column":12},"end":{"row":89,"column":13},"action":"insert","lines":["n"]},{"start":{"row":89,"column":13},"end":{"row":89,"column":14},"action":"insert","lines":["a"]},{"start":{"row":89,"column":14},"end":{"row":89,"column":15},"action":"insert","lines":["m"]},{"start":{"row":89,"column":15},"end":{"row":89,"column":16},"action":"insert","lines":["e"]}],[{"start":{"row":26,"column":2},"end":{"row":26,"column":4},"action":"insert","lines":["*/"],"id":79},{"start":{"row":24,"column":0},"end":{"row":24,"column":2},"action":"insert","lines":["/*"]}]]},"ace":{"folds":[],"scrolltop":630,"scrollleft":0,"selection":{"start":{"row":52,"column":6},"end":{"row":52,"column":6},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":49,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1589381940310,"hash":"de59a5e40c1e963e02ff70152950b8d4b110c777"}