import redis from 'redis'
import settings from '../config/appConfig'

const redisConfig = settings.dev.redis

export const redisClient = redis.createClient(redisConfig)

redisClient.on('error', err => {
  console.log('Redis error: ' + err)
})