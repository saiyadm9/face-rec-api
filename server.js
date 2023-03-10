const express = require('express');
const bodyParser = require('body-parser');
//const { use } = require('express/lib/application');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
//const { database } = require('pg/lib/defaults');
//const { response } = require('express');
//const { user } = require('pg/lib/defaults');

const db = knex({
  client: 'pg',
  connection: {
    host : 'b0mha1jfmdk4ly7yjrct-postgresql.services.clever-cloud.com',
    user : 'upaq3zwogz5caohvuk4n',
    password : 'S6BE05yneMc2raEUIpOh',
    database : 'b0mha1jfmdk4ly7yjrct'
  }
});

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res)=> {res.send('it is working!')})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post ('/imageurl', (req, res) => {image.handleApiCall(req, res)})

// Load hash from your password DB.


app.listen(process.env.PORT || 9000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})



