import elasticsearch from 'elasticsearch'
import moment from 'moment'
import {
  generatePassword
} from '../util/helper.util'

const client = new elasticsearch.Client({
  host: '66.1.33.112:9200'
})

const createAdmin = () => {
  console.log('Creating admin...')

  client.exists({
    index: 'zoe_index_v1',
    type: 'user',
    id: 1
  }, (err, exists) => {
    if (err) {
      console.log('Creating admin error:\n' + err)
    } else {
      if (exists) {
        console.log('Admin is already exist')
      } else {
        createAdminHelper((err, response) => {
          if (err) {
            console.log('Creating admin error2:\n' + err)
          } else {
            console.log(JSON.stringify(response))
          }
        })
      }
    }
  })
}

const createAdminHelper = callback => {
  const current = moment().unix()
  let pwd = generatePassword('admin')
  client.create({
    index: 'zoe_index_v1',
    type: 'user',
    id: '1',
    body: {
      name: 'Admin',
      avatar: null,
      role: 'admin',
      account: 'admin',
      password: pwd,
      token: null,
      token_created: null,
      group: 'admin',
      created: current,
      modified: current,
      status: 'active',
      last_login: null,
      login_ip_address: null
    }
  }, function(err, response) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, response)
    }
  })
}

createAdmin()