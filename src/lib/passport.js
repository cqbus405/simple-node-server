import {
  Strategy as LocalStrategy
} from 'passport-local'
import {
  Strategy as BearerStrategy
} from 'passport-http-bearer'
import getLogger from './log4js'
import * as util from '../util/_helper'
import passport from 'passport'

const logger = getLogger('passport')

export default function(User) {
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
  }, (username, password, done) => {
    User.one({
      email: username
    }, (err, user) => {
      if (err) {
        logger.error(err)
        return done(err)
      }

      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        })
      }

      if (!user.password) {
        return done(null, false, {
          message: 'Invalid password.'
        })
      }

      util.compare(password, user.password, (err, res) => {
        if (err) {
          logger.error(err)
          return done(err)
        }

        if (!res) {
          return done(null, false, {
            message: 'Incorrect password.'
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