import path from 'path'
import passport from 'passport'

export default function(app, controllers) {
  app.get('/', function(req, res, next) {
    return res.sendFile(path.resolve(__dirname, '../../public/html/index.html'))
  })

  app.post('/product/add', passport.authenticate('bearer', {
    session: false
  }), controllers.product.addProduct)
  app.post('/product/edit', passport.authenticate('bearer', {
    session: false
  }), controllers.product.editProduct)
  app.delete('/product/:id', passport.authenticate('bearer', {
    session: false
  }), controllers.product.removeProduct)
  app.get('/product/list', passport.authenticate('bearer', {
    session: false
  }), controllers.product.getProducts)

  app.post('/user/login', passport.authenticate('local'), controllers.user.login)
  app.get('/user/list', controllers.user.getUsers)
}