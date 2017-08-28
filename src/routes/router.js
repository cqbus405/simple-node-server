export default function(app, controllers) {
  app.get('/', function(req, res) {
    return res.send('<p>Server is running!</p>')
  })

  app.post('/user/login', controllers.user.login)
  app.post('/user/logout', controllers.user.logout)
  app.post('/user/password/reset', controllers.user.resetPassword)

  app.post('/article/add', controllers.article.addArticle)
  app.get('/article/list', controllers.article.getArticleList)

  app.get('*', function(req, res) {
    return res.status(404).send('404')
  })
}