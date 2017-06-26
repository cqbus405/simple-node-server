import {
  Strategy as LocalStrategy
} from 'passport-local'
import {
  Strategy as BearerStrategy
} from 'passport-http-bearer'
import passport from 'passport'
import * as util from '../util/helper.util'
import * as User from '../models/user'

export default () => {
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
      account: account
    }, (err, user) => {
      if (err) {
        console.log(err)
        return done(err)
      }

      if (!user) return done(null, false, {
        msg: '用户名不存在'
      })

      if (user.status !== 'active') return done(null, {
        msg: '账户异常'
      })

      // 判断是否为超级管理员
      if (user.account === 'admin' && user.password === password) return done(null, user)

      if (util.validatePassword(password, user.password)) {
        done(null, user)
      } else {
        done(null, false, {
          msg: '密码错误'
        })
      }
    })
  }))

  passport.use(new BearerStrategy((token, done) => {
    User.one({
      token: token
    }, (err, user) => {
      if (err) {
        console.log(err)
        return done(err)
      }

      if (!user) return done(null, false)

      return done(null, user, {
        scope: 'all'
      })
    })
  }))
}