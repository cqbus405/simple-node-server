import path from 'path'
import passport from 'passport'

export default function(app, controllers) {
  app.get('/', function(req, res, next) {
    return res.sendFile(path.resolve(__dirname, '../../public/html/index.html'))
  })

  app.post('/product/add', controllers.product.addProduct)
  app.post('/product/edit', controllers.product.editProduct)
  app.delete('/product/:id', controllers.product.removeProduct)
  app.get('/product/list', controllers.product.findProducts)

  app.post('/user/signup', controllers.user.signUp)
  app.post('/user/login', controllers.user.login)
  app.get('/user/list', controllers.user.findUsers)
}