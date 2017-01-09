import {
  create
} from 'svg-captcha'

export function generateCaptcha(req, res) {
  const captcha = create({
    width: 80,
    height: 36,
    size: 4, // size of random string
    ignoreChars: '0o1i', // filter out some characters like 0o1i
    noise: 2, // number of noise lines
    color: true, // characters will have distinct colors instead of grey, true if background option is set
    background: null // background color of the svg image
  })

  const newCaptcha = captcha.data.replace(/ <path/g, '<path')

  return res.json({
    status: 200,
    msg: 'Generate captcha success',
    data: newCaptcha
  })
}