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
app.get('/', (req, res) => res.send(database));

app.post('/signin', (req, res) => {
  // bcrypt.compare(req.body.password, hash, (err, res) => {
  //   console.log('in there', res)
  const { email, password } = req.body;
  const { users } = database;
  // });
  for (let i = 0; i < users.length; i++) {
    if (email === users[i].email) {
      if (email === users[i].email && password == users[i].password) {
        return res.json(database.users[i]);
      }
    }
  }
  return res.json();
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  const { users } = database;
  for (let i = 0; i < users.length; i++) {
    if (id === users[i].id) {
      console.log(true);
      users[i].entries++;
      return res.json(database.users[i].entries);
    }
  }
});

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
 
  return res.json(response)
})
  // return res.json(database.users[database.users.length - 1]);
  // database
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

app.get('/profile/:userId', (req, res) => {
  const { userId } = req.params;
  let exists = false;
  database.users.forEach(user => {
    if (user.id === userId) {
      exists = true;
      return res.json(user);
    }
  });
  if (!exists) {
    res.status(400).json('user not found');
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
