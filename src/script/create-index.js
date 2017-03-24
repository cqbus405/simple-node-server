import esClient from '../util/_elasticsearch'
import config from '../config/appConfig'

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'
const indexName = config[mode].es.index

esClient.indices.exists({
  index: indexName
}).then(isExist => {
  if (!isExist) {
    console.log(`The ${indexName} doesn't exist, creating...`)
    createArticleIndex(indexName)
  } else {
    console.log(`The ${indexName} already exists, all good`)
  }
}).then(err => {
  if (err) {
    console.log(err)
  }
})

const createArticleIndex = indexName => {
  const body = {
    "mappings": {
      "document": {
        "properties": {
          "title": {
            "type": "text"
          },
          "type": {
            "type": "text"
          },
          "tag": {
            "type": "text"
          },
          "description": {
            "type": "text"
          },
          "video_url": {
            "type": "text"
          },
          "audio_url": {
            "type": "text"
          },
          "picture_url": {
            "type": "text"
          },
          "article": {
            "type": "text"
          },
          "link": {
            "type": "text"
          },
          "view": {
            "type": "integer"
          },
          "status": {
            "type": "keyword"
          },
          "created": {
            "type": "date",
            "format": "strict_date_optional_time||epoch_millis"
          },
          "modified": {
            "type": "date",
            "format": "strict_date_optional_time||epoch_millis"
          }
        }
      }
    }
  }

  esClient.indices.create({
    index: indexName,
    body: body
  }).then(resp => {
    if (resp) {
      console.log(`The ${indexName} create successfully.`)
    }
  }).then(err => {
    if (err) {
      console.log(`Create ${indexName} failed. ` + err)
    }
  })
}