import redis from 'redis'

export default function(req, res, next) {
  const config = req.settings.redis
  const redisClient = redis.createClient(config)
  req.redisClient = redisClient
  next()
}