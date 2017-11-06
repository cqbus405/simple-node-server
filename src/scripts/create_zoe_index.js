import elasticsearch from 'elasticsearch'
import config from '../config/app.config'

let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
let settings = config[env]

const createIndex = (indexName, mappings) => {
  console.log('Index: ' + indexName)

  const client = new elasticsearch.Client({
    host: settings.es.host
  })

  console.log('Check existing...')
  const exist = client.indices.exists({
    index: indexName
  }, (err, response) => {
    if (response) {
      console.log('Index "' + indexName + '" already exists.')
      return
    }
    console.log('Index does not exist. Creating right now.')

    client.indices.create({
      index: indexName,
      body: {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 1
        },
        mappings
      }
    }, (err, response) => {
      if (err) {
        console.log('Elasticsearch error: \n' + err)
      } else {
        console.log('Elasticsearch response: \n' + JSON.stringify(response))
      }
    })
  })
}

const indices = settings.es.index
for (let i = 0; i < indices.length; ++i) {
  let index = indices[i]
  let properties = settings.es.properties[index]
  let mappings = {}
  mappings[index] = {
    properties
  }
  mappings[index]['_all'] = {
    enabled: false
  }
  createIndex(index, mappings)
}