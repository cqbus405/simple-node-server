import {
  Strategy as LocalStrategy
} from 'passport-local'
import {
  Strategy as BearerStrategy
} from 'passport-http-bearer'
import passport from 'passport'
import * as util from '../util/helper.util'
import * as User from '../models/user'
import moment from 'moment'

export default (req, res, next) => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.get(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use(new LocalStrategy({
    usernameField: 'account',
    passwordField: 'password'
  }, (account, password, done) => {
    User.one({
      index: req.settings.es.index,
      esClient: req.esClient,
      esHelper: req.esHelper,
      param: {
        account
      }
    }, (err, user) => {
      if (err) {
        console.log(err)
        return done(err)
      }

      if (!user) return done(null, false, '用户名不存在')

      if (user.status !== 'active') return done(null, false, '账户异常')

      // 判断是否为超级管理员
      if (user.account === 'admin' && user.password === password) return done(null, user)

      if (util.validatePassword(password, user.password)) {
        done(null, user)
      } else {
        done(null, false, '密码错误')
      }
    })
  }))

  passport.use(new BearerStrategy((token, done) => {
    User.one({
      index: req.settings.es.index,
      esClient: req.esClient,
      esHelper: req.esHelper,
      param: {
        token
      }
    }, (err, user) => {
      if (err) {
        console.log(err)
        return done(err)
      }

      if (!user) return done(null, false, '令牌已失效，请重新登录')

      const tokenExpireDay = req.settings.token_expire_day
      let tokenCreated = user.token_created
      let current = moment().unix()
      let loginDuration = (current - tokenCreated) / (24 * 60 * 60 * 1000)
      let expired = (loginDuration - tokenExpireDay) >= 0

      if (expired) {
        return done(null, false, '令牌已过期，请重新登录');
      }

      return done(null, user, {
        scope: 'all'
      })
    })
  }))

  next()
}