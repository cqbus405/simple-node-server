import passport from 'passport'
import moment from 'moment'

export const addArticle = (req, res, next) => {
  passport.authenticate('bearer', {
    session: false
  }, (err, user) => {
    if (err || !user) {
      let msg = !err ? '未获取用户数据，请重新登录' : err
      return res.json({
        status: 500,
        msg: err
      })
    }

    let title = req.body.title
    let content = req.body.content
    let category = req.body.category
    let tag = req.body.tag
    let status = req.body.status
    let author = user.name
    let current = moment().unix()
    let body = {
      title,
      content,
      category,
      tag,
      author,
      status,
      created: current
    }

    const index = req.settings.es.index
    const esHelper = req.esHelper
    const Article = req.models.article

    let param = {
      index,
      esHelper,
      body
    }

    Article.createArticleHelper(param, (err, response) => {
      if (err) {
        return res.json({
          status: 500,
          msg: err
        })
      }

      return res.json({
        status: 200,
        msg: response
      })
    })
  })(req, res, next)
}