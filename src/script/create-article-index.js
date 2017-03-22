import client from '../util/_elasticsearch'

const indexName = process.argv[2]

if (!client.indices.exists(indexName)) {
  console.log('The article index doesn\'t exist, creating...')
}

const createArticleIndex = indexName => {
  const body = {
    "settings": {
      "index": {
        "number_of_shards": 2,
        "number_of_replicas": 1,
        "analysis": {
          "analyzer": {
            "case_sensitive": {
              "type": "custom",
              "tokenizer": "keyword"
            }
          }
        }
      }
    },
    "mappings": {
      "user": {
        "_all": {
          "enabled": false
        },
        "properties": {
          "title": {
            "type": "text"
          },
          "name": {
            "type": "text"
          },
          "age": {
            "type": "integer"
          }
        }
      },
      "article": {
        "_all": {
          "enabled": false
        },
        "properties": {
          "title": {
            "type": "text"
          },
          "body": {
            "type": "text"
          },
          "user_id": {
            "type": "keyword"
          },
          "created": {
            "type": "date",
            "format": "strict_date_optional_time||epoch_millis"
          }
        }
      }
    }
  }

  client.indices.create({
    index: indexName,
    body: body
  }, (err, result) => {
    if (err) {
      console.log('Create article index failed. ' + err)
    }
    console.log('The article index create successfully.')
  })
}