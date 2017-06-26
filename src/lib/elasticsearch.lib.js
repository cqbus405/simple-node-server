import elasticsearch from 'elasticsearch'

export default function(req, res, next) {
  const esClient = new elasticsearch.Client({
    host: req.settings.es.host
  })
  req.esClient = esClient
  next()
}