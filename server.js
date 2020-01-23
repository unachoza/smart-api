const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const image = require('./Controllers/image')
const signin = require('./Controllers/signin')
const profile = require('./Controllers/getProfile')
const register = require('./Controllers/resgister')


const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'arianna',
    password: '',
    database: 'image-rec',
  },
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('hello world'));
app.post('/signin', (req, res) => { signin.handleSignin( req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.registerUser(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.getProfile(req, res, db)})
app.put('/image', (req, res) => { image.sendImage(req, res, db)})

app.listen(3000, () => console.log('Example app listening on port 3000!'));
