import bodybuilder from 'bodybuilder'

export const loginHelper = (param, callback) => {
  param.esHelper.updateById(param.index, 'user', param.id, param.updateData, (error, response) => {
    if (error) {
      callback(error, null)
    } else {
      param.esHelper.searchById(param.index, 'user', param.id, (error, response) => {
        if (error) {
          callback(error, null)
        } else {
          callback(null, response)
        }
      })
    }
  })
}

export const logoutHelper = (param, callback) => {
  param.esHelper.updateById(param.index, 'user', param.id, param.updateData, (error, response) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, '登出成功')
    }
  })
}

export const resetPasswordHelper = (param, callback) => {
  param.esHelper.updateById(param.index, 'user', param.id, param.updateData, (error, response) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, '密码更新成功')
    }
  })
}

export const one = (param, callback) => {
  let body = ''
  let keyValue = param.param
  for (let key in keyValue) {
    body = bodybuilder().query('match', key, keyValue[key]).build()
  }
  param.esHelper.search(param.index, 'user', body, (error, response) => {
    if (error) {
      callback(error, null)
    } else {
      let hits = response.hits.hits
      if (hits.length === 0) {
        callback(null, null)
      } else {
        let user = hits[0]._source
        let id = hits[0]._id
        user.id = parseInt(id)
        callback(null, user)
      }
    }
  })
}