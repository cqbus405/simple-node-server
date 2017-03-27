import {
  create
} from 'svg-captcha'
import {
  redisClient
} from '../util/_redis'

export function generateCaptcha(req, res) {
  const captcha = create({
    width: 80,
    height: 39,
    size: 4, // size of random string
    ignoreChars: '0o1i', // filter out some characters like 0o1i
    noise: 2, // number of noise lines
    color: false, // characters will have distinct colors instead of grey, true if background option is set
    // background: 'rgba(255, 255, 255, 0.87)' // background color of the svg image
  })

  const newCaptcha = captcha.data.replace(/ <path/g, '<path')
  const text = captcha.text

  redisClient.set('captchaText', text)

  return res.json({
    status: 200,
    msg: 'Generate captcha success',
    data: newCaptcha
  })
}