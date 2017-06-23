export default function(app, controllers) {
  app.get('/', function(req, res) {
    return res.send('<p>Server is running!</p>')
  })

  app.post('/user/login', controllers.user.login)

  app.get('*', function(req, res) {
    res.status(404).send('404')
  })
}