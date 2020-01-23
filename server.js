const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'arianna',
    password: '',
    database: 'image-rec',
  },
});

console.log(db.select('*').from('users'));

app.use(cors());
app.use(bodyParser.json()); 
app.get('/', (req, res) => res.send(db));

app.post('/signin', async (req, res) => {
  // bcrypt.compare(req.body.password, hash, (err, res) => {
  //   console.log('in there', res)
  const { email, password } = req.body;
  const { users } = db;
  const thisUSer = await db.select('*').from('users').where({'email': email})
  
  try {
    
    if (thisUSer.email === users[i].email && thisUSer.password == users[i].password) {
      return res.json("this is the user", db.users[i])
    }
  }
  catch (error) {
    console.log(error)
    res.status(400).json('wrong credentials')
  // }
  }
}),
  
  
app.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  const response = await db('users')
    .returning("*")
    .insert({
    name: name,
    email: email,
    joined: new Date(),
    })
  .catch(error => res.status(400).json(error)) 
 
  return res.json(response)
}),

app.put('/image', (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  const { users } = db;
  for (let i = 0; i < users.length; i++) {
    if (id === users[i].id) {
      console.log(true);
      users[i].entries++;
      return res.json(db.users[i].entries);
    }
  }
})


  // return res.json(db.users[db.users.length - 1]);
  // db
  //   .transaction(trx => {
  //     trx
  //       .insert({
  //         hash: hash,
  //         email: email,
  //       })
  //       .into('login')
  //       .returning('email')
  //       .then(email => {
  //         return trx('users')
  //           .returning('*')
  //           .insert({
  //             email: email[0],
  //             name: name,
  //             joined: new Date(),
  //           })
  //           .then(user => {
  //             res.json(user[0]);
  //           });
  //       })
  //       .then(trx.commit)
  //       .catch(trx.rollback);
  //   })
  // .catch(err => res.status(400).json('unable to register'));
// });

app.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const thisUSer = await db.select('*').from('users').where({ "id": id })
  console.log(thisUSer)
return thisUSer.length? res.json(thisUSer) :res.status(400).json('user not found');
  
    
}),

app.listen(3000, () => console.log('Example app listening on port 3000!'));
