import formidable from 'formidable'
import passport from 'passport'
import settings from '../config/settings'

export const uploadFile = (req, res, next) => {
  passport.authenticate('bearer', {
    session: false
  }, (err, user, info) => {
    if (err) {
      logger.error(err)
      return res.json({
        status: 500,
        msg: err
      })
    }

    if (!user) {
      return res.json({
        status: 500,
        msg: 'Unauthorized user.'
      })
    }

    if (user.role !== 0) {
      return res.json({
        status: 500,
        msg: 'No authority.'
      })
    }

    const form = new formidable.IncomingForm();

    form.uploadDir = settings.development.formidable.uploadDir
    form.keepExtensions = settings.development.formidable.keepExtensions
    form.maxFieldsSize = settings.development.formidable.maxFieldsSize
    form.maxFields = settings.development.formidable.maxFields

    let files = []

    form.on('file', (name, file) => {
      const path = file.path
      const filename = path.substring(10)
      files.push(filename)
    })

    form.parse(req, (err, fields) => {
      if (err) {
        res.json({
          status: 500,
          msg: err
        })
      }

      const productId = fields.productId

      if (!productId) {
        return res.json({
          status: 500,
          msg: 'Invalid product.'
        })
      }

      if (!files || files.length === 0) {
        return res.json({
          status: 500,
          msg: 'No image uploaded.'
        })
      }

      const Product = req.models.product

      Product.get(productId, (err, product) => {
        if (err) {
          return res.json({
            status: 500,
            msg: err
          })
        }

        if (!product) {
          return res.json({
            status: 500,
            msg: 'No product found'
          })
        }

        const pictureUrl = product.pictureUrl

        if (!pictureUrl) {
          product.pictureUrl = JSON.stringify(files)
        } else {
          const pictureArray = JSON.parse(pictureUrl)

          files.forEach((element, index, array) => {
            pictureArray.push(element)
          })

          product.pictureUrl = JSON.stringify(pictureArray)
        }

        product.modified = new Date()

        product.save(err => {
          if (err) {
            return res.json({
              status: 500,
              msg: err
            })
          }

          return res.json({
            status: 200,
            msg: 'upload the picture successfully',
          })
        })
      })
    })
  })(req, res, next)
}