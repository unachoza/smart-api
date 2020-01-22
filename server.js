const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const database = {
  users: [
    {
      id: '123',
      name: 'Arianna',
      email: 'unachoza@gmail.com',
      password: 'arianna',
      entries: 3,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'sara',
      email: 'sara@gmail.com',
      password: 'sara',
      entries: 31,
      joined: new Date(),
    },
  ],
  // secrets: {
  //   users_id: '123',
  //   hash: 'wghhh',
  // },
};

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => res.send(database));

app.post('/signin', (req, res) => {
  // bcrypt.compare(req.body.password, hash, (err, res) => {
  //   console.log('in there', res)
  const { email, password } = req.body
  const {users} = database
  // });
  for (let i = 0; i < users.length; i++  ) {
    if (email === users[i].email) {
      if (email === users[i].email && password == users[i].password) {
        // res.json('sucessssss');
        return res.json(database.users[i].id)
      }
    }
  }
  return res.json()
})

//   if (email === database.users[num].email && password == database.users[0].password) {
//     res.json('sucessssss');
//   } else {
//     res.json('access denied');
//   }
// });

app.post('/image', (req, res) => {
  const { id } = req.body;
  console.log(req.body.user);
  let exists = false;
  database.users.forEach(user => {
    console.log(user);
    if (user.id === id) {
      exists = true;
      user.entries++;
      return res.status(300).json(user);
    }
  });
  if (!exists) {
    res.status(400).json('user not found her');
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  database.users.push({
    id: database.users.length,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  console.log("this is the database", database);
  // res.json('in there');

  return res.json(database.users[database.users.length -1])

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
});

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
