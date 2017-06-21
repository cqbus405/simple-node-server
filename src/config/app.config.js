export default {
  dev: {
    port: 3001,
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
    port: 3001,
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