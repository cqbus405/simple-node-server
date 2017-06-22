import elasticsearch from 'elasticsearch'

const createIndex = indexName => {
  console.log('Index: ' + indexName)

  const client = new elasticsearch.client({
    index: indexName,
    log: 'trace'
  })

  console.log('Check existing...')
  const exist = client.indices.exists({
    index: indexName
  }, (err, exists, status) => {
    if (error) {
      console.log(err)
      return
    }

    if (exists) {
      console.log('Index "' + indexName + '" already exists.')
      return
    }
    console.log('Index does not exist. Creating right now.')

    client.indices.create({

    }, (err, response, status) => {

    })
  })
}

createIndex('zoe_index_v1')