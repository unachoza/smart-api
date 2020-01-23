const registerUser = async (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  if (!email || !password || !name) {
    return res.status(400).json('incorrect form submission');
  }
  try {
    const result = await db.transaction(trx => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*')
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date(),
            })
            .then(user => {
              res.json(user[0]);
            });
        })

        .then(trx.commit);
    });
    return res.json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerUser
};
