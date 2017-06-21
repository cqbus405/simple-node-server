export default function(app, controllers) {
  app.get('/', function(req, res) {
    return res.send('<p>Server is running!</p>')
  })

  app.get('/env', controllers.config.getAppEnvironment)
  app.get('/settings', controllers.config.getAppSettings)
  app.get('/es-test', controllers.config.esTest)

  app.get('*', function(req, res) {
    res.status(404).send('404')
  })
}