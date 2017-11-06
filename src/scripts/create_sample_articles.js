import elasticsearch from 'elasticsearch'
import moment from 'moment'
import config from '../config/app.config'
import path from 'path'

let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
let settings = config[env]

const client = new elasticsearch.Client({
  host: settings.es.host
})

const createSampleArticle = () => {
  console.log('Creating sample articles...')
  for (let i = 1; i < 16; ++i) {
    createSampleArticleHelper(i, (err, response) => {
      if (err) {
        console.log(err)
      } else {
        console.log(JSON.stringify(response))
      }
    })
  }
}

const createSampleArticleHelper = (id, callback) => {
  const current = moment().unix()
  const rootDir = path.join(__dirname, '../../public/images')
  const images = [
    rootDir + '/time.jpg',
    rootDir + '/time-1.jpg',
    rootDir + '/time-2.jpg',
    rootDir + '/time-3.jpg',
    rootDir + '/time-4.jpg'
  ]
  const categories = [
    'published',
    'drafted',
    'deleted'
  ]

  let category = ''
  if (id % 2 === 0) {
    category = 'music'
  } else if (id % 3 === 0) {
    category = 'movie'
  }

  client.index({
    index: 'article',
    type: 'article',
    body: {
      id,
      title: 'Hello World ' + id,
      content: 'Hello World!',
      status: categories[getNum(0, 2)],
      category,
      tag: '',
      viewed: 0,
      favorited: 0,
      shared: 0,
      created: current,
      modified: current,
      author: 'zoe',
      images
    }
  }, function(err, response) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, response)
    }
  })
}

const getNum = (min, max) => {
  let range = max - min;
  let random = Math.random();
  let num = min + Math.round(random * range); //四舍五入
  return num;
}

createSampleArticle()