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