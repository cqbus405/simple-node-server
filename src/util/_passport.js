import {
  Strategy as LocalStrategy
} from 'passport-local'
import {
  Strategy as BearerStrategy
} from 'passport-http-bearer'
import passport from 'passport'

import getLogger from './_log4js'
import * as util from './helper'

const logger = getLogger('passport')

export default User => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.get(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    User.one({
      email: email
    }, (err, user) => {
      if (err) {
        logger.error(err)
        return done(err)
      }

      if (!user) {
        return done(null, false, {
          msg: 'Incorrect username.'
        })
      }

      util.compare(password, user.password, (err, res) => {
        if (err) {
          logger.error(err)
          return done(err)
        }

        if (!res) {
          return done(null, false, {
            msg: 'Incorrect password.'
          })
        }

        return done(null, user)
      })
    })
  }))

  passport.use(new BearerStrategy((token, done) => {
    User.one({
      token: token
    }, (err, user) => {
      if (err) {
        logger.error(err)
        return done(err)
      }

      if (!user) {
        return done(null, false)
      }

      return done(null, user, {
        scope: 'all'
      })
    })
  }))
}