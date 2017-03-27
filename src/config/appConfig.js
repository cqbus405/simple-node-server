export default {
  dev: {
    ip: 'localhost',
    port: 3001,
    mysql: 'mysql://root:cqgogogo@localhost/test',
    salt_round: 10,
    token_secret: '%lindsay27!',
    redis: {
      host: 'localhost',
      port: 6379
    },
    formidable: {
      uploadDir: 'D:/upload',
      keepExtensions: true,
      maxFieldsSize: 50 * 1024 * 1024,
      maxFields: 9
    },
    es: {
      host: 'localhost:9200',
      index: 'index_v1'
    }
  },
  prod: {
    ip: 'localhost',
    port: 3001,
    mysql: 'mysql://root:gogogo@localhost/test',
    salt_round: 10,
    token_secret: '%lindsay27!',
    redis: {
      host: 'localhost',
      port: 6379
    },
    formidable: {
      uploadDir: 'D:/upload',
      keepExtensions: true,
      maxFieldsSize: 50 * 1024 * 1024,
      maxFields: 9
    },
    es: {
      host: 'localhost:9200',
      index: 'index_v1'
    }
  }
}