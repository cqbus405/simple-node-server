import {
  create
} from 'svg-captcha'

export function generateCaptcha(req, res) {
  const captcha = create()
  req.session.captcha = captcha.text
  return res.json({
    status: 200,
    msg: 'Generate captcha success',
    data: captcha.data
  })
}