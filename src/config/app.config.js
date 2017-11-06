export default {
  development: {
    port: 3001,
    redis: {
      host: 'localhost',
      port: 6379
    },
    es: {
      host: 'http://localhost:9200',
      index: [
        'user',
        'article'
      ],
      properties: {
        'article': {
          id: {
            type: 'integer'
          },
          title: {
            type: 'text',
            fielddata: true
          },
          content: {
            type: 'text'
          },
          status: {
            type: 'keyword'
          },
          category: {
            type: 'keyword'
          },
          tag: {
            type: 'keyword'
          },
          viewed: {
            type: 'integer'
          },
          favorited: {
            type: 'integer'
          },
          shared: {
            type: 'integer'
          },
          created: {
            type: 'date'
          },
          modified: {
            type: 'date'
          },
          author: {
            type: 'text'
          },
          images: {
            type: 'text'
          }
        },
        'user': {
          name: {
            type: 'text',
            analyzer: 'keyword'
          },
          avatar: {
            type: 'text'
          },
          role: {
            type: 'keyword'
          },
          account: {
            type: 'text'
          },
          password: {
            type: 'text'
          },
          token: {
            type: 'text',
            analyzer: 'keyword'
          },
          token_created: {
            type: 'date'
          },
          group: {
            type: 'keyword'
          },
          status: {
            type: 'keyword'
          },
          login_ip_address: {
            type: 'ip'
          },
          created: {
            type: 'date'
          },
          modified: {
            type: 'date'
          },
          last_login: {
            type: 'date'
          }
        }
      }
    },
    secret: 'zoe&q',
    token_expire_day: 1
  },
  production: {
    port: 3001,
    redis: {
      host: 'localhost',
      port: 6379
    },
    es: {
      host: 'http://localhost:9200',
      index: [
        'user',
        'article'
      ],
      properties: {
        'article': {
          id: {
            type: 'integer'
          },
          title: {
            type: 'text',
            fielddata: true
          },
          content: {
            type: 'text'
          },
          status: {
            type: 'keyword'
          },
          category: {
            type: 'keyword'
          },
          tag: {
            type: 'keyword'
          },
          viewed: {
            type: 'integer'
          },
          favorited: {
            type: 'integer'
          },
          shared: {
            type: 'integer'
          },
          created: {
            type: 'date'
          },
          modified: {
            type: 'date'
          },
          author: {
            type: 'text'
          },
          images: {
            type: 'text'
          }
        },
        'user': {
          name: {
            type: 'text',
            analyzer: 'keyword'
          },
          avatar: {
            type: 'text'
          },
          role: {
            type: 'keyword'
          },
          account: {
            type: 'text'
          },
          password: {
            type: 'text'
          },
          token: {
            type: 'text',
            analyzer: 'keyword'
          },
          token_created: {
            type: 'date'
          },
          group: {
            type: 'keyword'
          },
          status: {
            type: 'keyword'
          },
          login_ip_address: {
            type: 'ip'
          },
          created: {
            type: 'date'
          },
          modified: {
            type: 'date'
          },
          last_login: {
            type: 'date'
          }
        }
      }
    },
    secret: 'zoe&q',
    token_expire_day: 1
  }
}