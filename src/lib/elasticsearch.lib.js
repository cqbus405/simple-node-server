import elasticsearch from 'elasticsearch'

export default function(req, res, next) {
  const esClient = new elasticsearch.Client({
    host: req.settings.es.host
  })
  req.esClient = esClient

  const elasticsearchHelper = {
    searchById: (index, type, id, callback) => {
      esClient.get({
        index,
        type,
        id
      }, (error, response) => {
        if (error) {
          callback(error.message, null)
        } else {
          if (error) {
            callback(error.message, null)
          } else {
            let found = response.found
            if (!found) {
              callback('文档不存在', null)
            } else {
              let data = response._source
              callback(null, data)
            }
          }
        }
      })
    },
    create: (index, type, param, callback) => {
      esClient.create({
        index,
        type,
        id,
        body: param
      }, function(error, response) {
        if (error) {
          callback(error, null)
        } else {
          callback(null, response)
        }
      })
    },
    updateById: (index, type, id, param, callback) => {
      esClient.update({
        index,
        type,
        id,
        body: {
          doc: param
        }
      }, (error, response) => {
        if (error) {
          callback(error.message, null)
        } else {
          let successful = response._shards.successful
          if (successful !== 1) {
            callback('文档更新失败', null)
          } else {
            callback(null, '文档更新成功')
          }
        }
      })
    },
    deleteById: (index, type, id, callback) => {
      esClient.delete({
        index,
        type,
        id
      }, function(error, response) {
        if (error) {
          callback(error.message, null)
        } else {
          callback(null, response)
        }
      })
    },
    search: (index, type, param, callback) => {
      esClient.search({
        index,
        type,
        body: param
      }, function(error, response) {
        if (error) {
          callback(error.message, null)
        } else {
          callback(null, response)
        }
      })
    }
  }

  req.esHelper = elasticsearchHelper

  next()
}