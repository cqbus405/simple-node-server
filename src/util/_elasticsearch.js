import elasticsearch from 'elasticsearch'
import config from '../config/appConfig'

const client = new elasticsearch.Client({
  hosts: config.es.hosts
})

export default client