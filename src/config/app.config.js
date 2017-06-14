export default {
  dev: {
    ip: '66.1.33.112',
    port: 3001,
    salt_round: 10,
    token_secret: '%zoe615!',
    redis: {
      host: '66.1.33.112',
      port: 6379
    },
    es: {
      host: 'http://66.1.33.112:9200',
      index: 'index_v1'
    }
  },
  prod: {
    ip: '66.1.33.112',
    port: 3001,
    salt_round: 10,
    token_secret: '%zoe615!',
    redis: {
      host: '66.1.33.112',
      port: 6379
    },
    es: {
      host: 'http://66.1.33.112:9200',
      index: 'index_v1'
    }
  }
}