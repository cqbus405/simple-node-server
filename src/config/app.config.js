export default {
  dev: {
    port: 3001,
    redis: {
      host: '66.1.33.112',
      port: 6379
    },
    es: {
      host: 'http://66.1.33.112:9200',
      index: 'zoe_index_v1'
    },
    secret: 'zoe&q'
  },
  prod: {
    port: 3001,
    redis: {
      host: '66.1.33.112',
      port: 6379
    },
    es: {
      host: 'http://66.1.33.112:9200',
      index: 'zoe_index_v1'
    },
    secret: 'zoe&q'
  },
  office: {
    port: 3001,
    redis: {
      host: '66.1.33.112',
      port: 6379
    },
    es: {
      host: 'http://66.1.33.112:9200',
      index: 'zoe_index_v1'
    },
    secret: 'zoe&q'
  },
  home: {
    port: 3001,
    redis: {
      host: 'localhost',
      port: 6379
    },
    es: {
      host: 'http://localhost:9200',
      index: 'zoe_index_v1'
    },
    secret: 'zoe&q'
  }
}