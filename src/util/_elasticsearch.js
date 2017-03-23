import elasticsearch from 'elasticsearch'
import config from '../config/appConfig'

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'
const esClient = new elasticsearch.Client({
  host: config[mode].es.host
})

export default esClient