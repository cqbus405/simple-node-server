export default (app, controllers) => {
  app.get('/', (req, res) => {
    return res.send('<p>Server is running!</p>')
  })

  app.post('/admin/user/login', controllers.user.login)
  app.post('/admin/user/logout', controllers.user.logout)
  app.post('/admin/user/password/reset', controllers.user.resetPassword)

  app.post('/admin/article/add', controllers.article.addArticle)
  app.get('/admin/article/list', controllers.article.getArticleList)
  app.get('/admin/article/categories', controllers.article.getCategoryList)

  app.get('*', (req, res) => {
    return res.status(404).send('404')
  })
}