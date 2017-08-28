export const createArticleHelper = (param, callback) => {
  param.esHelper.create(param.index, 'article', null, param.body, (err, response) => {
    if (err) {
      callback(err, null)
    } else {
      let success = response._shards.successful === 1
      if (success) {
        callback(null, '文档创建成功')
      } else {
        callback('文档创建失败', null)
      }
    }
  })
}

export const getArticleListHelper = (param, callback) => {
  let wrappedData = param.wrappedData
  let start = wrappedData.start
  let size = wrappedData.size
  let status = wrappedData.status
  let category = wrappedData.category
  let orderBy = wrappedData.orderBy
  let sort = wrappedData.sort

  let sortQuery = []
  if (!orderBy && !sort) {
    sortQuery = [{
      id: 'desc'
    }]
  } else {
    sortQuery.push(orderBy[sort])
    console.log(sortQuery)
  }

  let body = {
    from: start,
    size,
    sort: sortQuery,
    query: {
      bool: {
        filter: [{
          term: {
            status
          }
        }, {
          term: {
            category
          }
        }]
      }
    }
  }

  param.esHelper.search(param.index, 'article', body, (err, response) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, response)
    }
  })
}