import esClient from '../util/_elasticsearch'
import config from '../config/appConfig'

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'
const indexName = config[mode].es.index

for (let i = 30; i < 60; ++i) {
  esClient.create({
    index: indexName,
    type: 'document',
    id: i,
    body: {
      title: 'My lovely title ' + i,
      type: 'article',
      tag: ['love', 'creative', 'summer'],
      description: 'description ' + i,
      video_url: 'https://www.baidu.com',
      audio_url: 'https://www.apple.cn',
      picture_url: ['https://images.example.com/' + i, 'https://images.example.com/112'],
      artile: 'nothing',
      created: new Date(),
      view: 1202,
      status: 'display'
    }
  }, (err, resp) => {
    if (err) {
      console.log(err)
    } else {
      console.log(resp)
    }
  })
}