const {
  updateUser: update
} = require('../util/')

module.exports = function updateUser (req, res) {
  if (req.body.admin && !req.authUser.admin) return res.send(400, 'cannot promote user')

  update(req.db, req.salt, req.user.id, {
    name: req.body.name,
    email: req.body.email,
    pass: req.body.pass,
    admin: req.body.admin
  })
    .then((token) => res.send(200, token))
    .catch((err) => res.send(err.code, err.message))
}
