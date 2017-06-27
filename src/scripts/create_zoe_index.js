import elasticsearch from 'elasticsearch'

const createIndex = indexName => {
  console.log('Index: ' + indexName)

  const client = new elasticsearch.Client({
    host: '66.1.33.112:9200'
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
          number_of_shards: 2,
          number_of_replicas: 1
        },
        mappings: {
          user: {
            _all: {
              enabled: false
            },
            properties: {
              name: {
                type: 'text',
                analyzer: 'keyword'
              },
              avatar: {
                type: 'text'
              },
              role: {
                type: 'keyword'
              },
              account: {
                type: 'text'
              },
              password: {
                type: 'text'
              },
              token: {
                type: 'text',
                analyzer: 'keyword'
              },
              token_created: {
                type: 'date'
              },
              group: {
                type: 'keyword'
              },
              status: {
                type: 'keyword'
              },
              login_ip_address: {
                type: 'ip'
              },
              created: {
                type: 'date'
              },
              modified: {
                type: 'date'
              },
              last_login: {
                type: 'date'
              }
            }
          },
          article: {
            _all: {
              enabled: false
            },
            properties: {
              title: {
                type: 'text'
              },
              content: {
                type: 'text',
                analyzer: 'keyword'
              },
              status: {
                type: 'keyword'
              },
              category: {
                type: 'keyword'
              },
              tag: {
                type: 'keyword'
              },
              viewed: {
                type: 'integer'
              },
              favorited: {
                type: 'integer'
              },
              shared: {
                type: 'integer'
              },
              created: {
                type: 'date'
              },
              modified: {
                type: 'date'
              }
            }
          }
        }
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

createIndex('zoe_index_v1')