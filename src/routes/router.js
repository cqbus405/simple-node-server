export default function(app, controllers) {
  app.get('/', function(req, res) {
    return res.send('<p>Server is running!</p>')
  })

  app.post('/user/login', controllers.user.login)
  app.get('/user/logout', controllers.user.logout)
  app.post('/user/password/reset', controllers.user.resetPassword)

  app.get('*', function(req, res) {
    return res.status(404).send('404')
  })
}