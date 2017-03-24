import passport from 'passport'
import moment from 'moment'
import getLogger from '../util/_log4js'
import esClient from '../util/_elasticsearch'
import config from '../config/appConfig'
import * as util from '../util/helper'

const logger = getLogger('controller-product');

export const findDocuments = (req, res, next) => {
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

    const pageItemCount = parseInt(req.query.page_item_count)
    const pageNumber = parseInt(req.query.page_number)

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

    const mode = req.mode
    const indexName = config[mode].es.index
    const offset = util.getOffset(pageNumber, pageItemCount)

    esClient.search({
      index: indexName,
      type: 'document',
      body: {
        "from": offset,
        "size": pageItemCount,
        "sort": [{
          "created": "desc"
        }]
      }
    }, function(err, resp) {
      if (err) {
        logger.error(err)
        return res.json({
          status: 500,
          msg: err
        })
      }

      const total = resp.hits.total
      const pages = util.getPages(total, pageItemCount)

      let documentArr = []
      resp.hits.hits.forEach((value, index, array) => {
        const document = value._source
        document.id = value._id
        document.created = moment(document.created).format('YYYY-MM-DD h:mm:ssa')
        if (document.modified) {
          document.modified = moment(document.modified).format('YYYY-MM-DD h:mm:ssa')
        }
        documentArr.push(document)
      })

      return res.json({
        status: 200,
        msg: 'success',
        data: {
          documents: documentArr,
          pages: pages,
        }
      })
    });
  })(req, res, next)
}