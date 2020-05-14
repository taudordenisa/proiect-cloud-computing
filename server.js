const express = require("express")
const Sequelize = require('sequelize')
const axios = require("axios")

const sequelize = new Sequelize('music', 'taudordenisa', 'tdenisa5', {
    dialect: "mysql",
    host: "localhost"
})
    
sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database")
})

const Songs = sequelize.define('songs', {
    singer: Sequelize.STRING,
    album: Sequelize.STRING,
    name: Sequelize.TEXT
})

const app = express()
app.use('/', express.static('frontend'))

app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})

app.use(express.json())
app.use(express.urlencoded())

app.post('/songs', (request, response) => {
    Songs.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.get('/songs', (request, response) => {
    Songs.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/songs/:id', (request, response) => {
    Songs.findByPk(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/songs/:id', (request, response) => {
    Songs.findByPk(request.params.id).then((name) => {
        if(name) {
            name.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/songs/:id', (request, response) => {
    Songs.findByPk(request.params.id).then((name) => {
        if(name) {
            name.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.listen(process.env.PORT||8080)