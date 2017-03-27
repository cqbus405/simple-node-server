import path from 'path'
import passport from 'passport'
import {
  create
} from 'svg-captcha'

export default function(app, controllers) {
  app.get('/', function(req, res, next) {
    return res.sendFile(path.resolve(__dirname, '../../view/home.html'))
  })

  app.post('/file/upload', controllers.upload.uploadFile)

  app.post('/product/add', controllers.product.addProduct)
  app.post('/product/edit', controllers.product.editProduct)
  app.post('/product/delete', controllers.product.removeProductByPrimaryKey)
  app.get('/product/list', controllers.product.findProducts)
  app.get('/product/:id', controllers.product.findProductByPrimaryKey)

  app.post('/user/login', controllers.user.login)
  app.post('/user/logout', controllers.user.logout)

  // app.post('/user/signup', controllers.user.signUp)
  // app.get('/user/list', controllers.user.findUsers)
  // app.get('/captcha', controllers.general.generateCaptcha)

  app.get('*', function(req, res) {
    res.status(404).send('404');
  });
}