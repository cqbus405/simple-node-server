import redis from 'redis'

export default (req, res, next) => {
  const config = req.settings.redis
  const client = redis.createClient(config)
  req.redisClient = client
  next()
}