export default {
  development: {
    // ip: '66.1.33.112',
    ip: '127.0.0.1',
    port: 3001,
    mysql: 'mysql://root:cqgogogo@localhost/test',
    salt_round: 10,
    token_secret: '%lindsay27!',
    redis: {
      // host: '66.1.33.112',
      host: '127.0.0.1',
      port: 6379
    },
    formidable: {
      uploadDir: '../../upload',
      keepExtensions: true,
      maxFieldsSize: 50 * 1024 * 1024,
      maxFields: 9
    }
  },
  prod: {

  }
}