import bodybuilder from 'bodybuilder'

export const loginHelper = (data, callback) => {
  callback(null, 'Login success!')
}

export const one = param => {
  let body = ''
  for (let key in param) {
    body = bodybuilder().query('match', key, param[key]).build()
  }
}