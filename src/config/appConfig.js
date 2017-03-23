export default {
  dev: {
    ip: '66.1.33.112',
    port: 3001,
    mysql: 'mysql://root:gogogo@localhost/test',
    salt_round: 10,
    token_secret: '%lindsay27!',
    redis: {
      host: '66.1.33.112',
      port: 6379
    },
    formidable: {
      uploadDir: 'D:/upload',
      keepExtensions: true,
      maxFieldsSize: 50 * 1024 * 1024,
      maxFields: 9
    },
    es: {
      host: 'http://66.1.33.112:9200',
      index: 'index_v1'
    }
  },
  prod: {
    ip: '66.1.33.112',
    port: 3001,
    mysql: 'mysql://root:gogogo@localhost/test',
    salt_round: 10,
    token_secret: '%lindsay27!',
    redis: {
      host: '66.1.33.112',
      port: 6379
    },
    formidable: {
      uploadDir: 'D:/upload',
      keepExtensions: true,
      maxFieldsSize: 50 * 1024 * 1024,
      maxFields: 9
    },
    es: {
      host: 'http://66.1.33.112:9200',
      index: 'index_v1'
    }
  }
}