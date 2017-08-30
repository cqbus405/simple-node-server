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
    let sortObj = {}
    sortObj[orderBy] = sort
    sortQuery.push(sortObj)
  }

  let query = {
    bool: {
      filter: []
    }
  }

  if (status !== 'all') {
    query.bool.filter.push({
      term: {
        status
      }
    })
  }

  if (category !== 'all') {
    query.bool.filter.push({
      term: {
        category
      }
    })
  }

  let body = {
    from: start,
    size,
    sort: sortQuery,
    query
  }

  param.esHelper.search(param.index, 'article', body, (err, response) => {
    if (err) {
      callback(err, null)
    } else {
      let success = response._shards.failed === 0
      if (success) {
        let articles = []
        let list = response.hits.hits
        for (let i = 0; i < list.length; ++i) {
          let article = list[i]._source
          article['_id'] = list[i]._id
          articles.push(article)
        }
        callback(null, articles)
      } else {
        callback('获取文章列表失败', null)
      }
    }
  })
}

export const getCategoryListHelper = (param, callback) => {
  let body = {
    "size": 0,
    "aggs": {
      "categories": {
        "terms": {
          "field": "category"
        }
      }
    }
  }

  param.esHelper.search(param.index, 'article', body, (err, response) => {
    if (err) {
      callback(err, null)
    } else {
      let success = response._shards.failed === 0
      if (success) {
        let categories = []
        let list = response.aggregations.categories.buckets
        for (let i = 0; i < list.length; ++i) {
          let key = list[i].key
          if (!key) key = 'uncategoried'
          let count = list[i].doc_count
          let category = {}
          category[key] = count
          categories[i] = category
        }
        let totalCount = response.hits.total
        let category = {}
        category['total'] = totalCount
        categories.push(category)
        callback(null, categories)
      } else {
        callback('获取分类列表失败', null)
      }
    }
  })
}