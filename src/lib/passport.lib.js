import {
  Strategy as LocalStrategy
} from 'passport-local'
import {
  Strategy as BearerStrategy
} from 'passport-http-bearer'
import passport from 'passport'
import {
  validatePassword
} from '../util/helper.util'
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
        return done(err, null)
      }

      if (!user) return done('账户不存在', false)

      if (user.status !== 'active') return done('账户异常', false)

      if (validatePassword(password, user.password)) {
        done(null, user)
      } else {
        done('密码错误', false)
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
        return done(err)
      }

      if (!user) return done('令牌已失效，请重新登录', false)

      const tokenExpireDay = req.settings.token_expire_day
      let tokenCreated = user.token_created
      let current = moment().unix()
      let loginDuration = (current - tokenCreated) / (24 * 60 * 60 * 1000)
      let expired = (loginDuration - tokenExpireDay) >= 0

      if (expired) {
        return done('令牌已过期，请重新登录', false);
      }

      return done(null, user, {
        scope: 'all'
      })
    })
  }))

  next()
}