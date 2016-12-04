import getLogger from '../lib/log4js'

const logger = getLogger('controller-product');

export function addProduct(req, res, next) {
  const product = req.body.product

  if (!product) {
    return res.json({
      status: 500,
      msg: 'no input data'
    })
  }

  const name = product.name
  const description = product.description
  const specification = product.specification
  const coverPicture = product.cover_picture

  const baseErrMsg = 'cannot be null'

  if (!name) {
    return res.json({
      status: 500,
      msg: `name ${baseErrMsg}`
    })
  }

  if (!description) {
    return res.json({
      status: 500,
      msg: `description ${baseErrMsg}`
    })
  }

  if (!specification) {
    return res.json({
      status: 500,
      msg: `specification ${baseErrMsg}`
    })
  }

  if (!coverPicture) {
    return res.json({
      status: 500,
      msg: `cover picture ${baseErrMsg}`
    })
  }

  product.coverPicture = coverPicture;
  product.created = new Date()

  const Product = req.models.product

  Product.create(product, (err, results) => {
    if (err) {
      logger.error(err)

      return res.json({
        status: 500,
        msg: err
      })
    }

    return res.json({
      satus: 200,
      msg: 'add the product successfully',
      data: results
    })
  })
}

export function editProduct(req, res, next) {
  const updatedProduct = req.body.product

  if (!updatedProduct) {
    return res.json({
      status: 500,
      msg: 'no input data'
    })
  }

  const id = updatedProduct.id
  if (!id) {
    return res.json({
      status: 500,
      msg: 'invalid item'
    })
  }

  const Product = req.models.product
  Product.get(id, (err, product) => {
    if (err) {
      logger.error(err)

      return res.json({
        status: 500,
        msg: err
      })
    }

    // let foundProduct = product

    if (updatedProduct['name']) {
      product.name = updatedProduct['name']
    }

    if (updatedProduct['description']) {
      product.description = updatedProduct['description']
    }

    if (updatedProduct['video_url']) {
      product.videoUrl = updatedProduct['video_url']
    }

    if (updatedProduct['picture_url']) {
      product.pictureUrl = updatedProduct['pictureUrl']
    }

    if (updatedProduct['specification']) {
      product.specification = updatedProduct['specification']
    }

    if (updatedProduct['cover_picture']) {
      product.coverPicture = updatedProduct['cover_picture']
    }

    product.modified = new Date()

    product.save(err => {
      if (err) {
        logger.error(err)

        return res.json({
          status: 500,
          msg: err
        })
      }

      return res.json({
        status: 200,
        msg: 'update the product successfully',
      })
    })
  })
}

export function removeProduct(req, res, next) {
  const id = req.params.id
  if (!id) {
    return res.json({
      status: 500,
      msg: 'invalid item'
    })
  }

  const Product = req.models.product
  Product.get(id, (err, product) => {
    if (err) {
      let msg

      if (err.message === 'Not found') {
        msg = 'item not found'
      } else {
        logger.error(err)
        msg = err
      }

      return res.json({
        status: 500,
        msg: msg
      })
    }

    product.remove(err => {
      let msg

      if (err) {
        logger.error(err)

        return res.json({
          status: 500,
          msg: msg
        })
      }

      return res.json({
        status: 200,
        msg: 'item removed'
      })
    })
  })
}

export function getProducts(req, res, next) {
  let pageItemCount = req.query.page_item_count
  let pageNumber = req.query.page_number

  if (!pageItemCount || pageItemCount <= 0) {
    return res.json({
      status: 500,
      msg: 'invalid item count'
    })
  }

  if (!pageNumber || pageNumber <= 0) {
    return res.json({
      status: 500,
      msg: 'invalid page number'
    })
  }

  const Product = req.models.product
  Product.settings.set('pagination.perpage', pageItemCount)

  Product.pages((err, pages) => {
    if (err) {
      logger.error(err)
      return res.json({
        status: 500,
        msg: err
      })
    }

    if (pageNumber > pages) {
      pageNumber = pages
    }

    if (pageNumber <= 0) {
      pageNumber = 1
    }

    Product.page(pageNumber, (err, offset) => {
      const db = req.db
      db.driver.execQuery(`select * from product limit ${pageItemCount} offset ${offset}`, (err, products) => {
        if (err) {
          logger.error(err)
          return res.json({
            satus: 500,
            msg: err
          })
        }

        return res.json({
          status: 200,
          msg: 'success',
          data: products
        })
      })
    })
  })
}