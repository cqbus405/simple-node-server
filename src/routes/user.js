export const login = (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const User = req.models.user
  User.loginHelper({
    username: username,
    password: password
  }, (err, response) => {
    res.json({
      msg: response,
      status: 200
    })
  })
}