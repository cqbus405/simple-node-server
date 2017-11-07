import passport from 'passport'
import * as jwt from 'jwt-simple'
import moment from 'moment'
import {
  validatePassword,
  generatePassword
} from '../util/helper.util'
import redis from 'redis'

export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.json({
        status: 500,
        msg: err
      })
    }

    if (!user) {
      return res.json({
        status: 500,
        msg: info
      })
    }

    const User = req.models.user
    const tokenSecret = req.settings.secret
    const esClient = req.esClient
    const esHelper = req.esHelper
    const index = 'user'

    let token = jwt.encode({
      id: user.id
    }, tokenSecret);
    let current = moment().unix()
    let updateData = {
      token: token,
      token_created: current,
      last_login: current,
      login_ip_address: req.clientIp
    }
    let param = {
      id: user.id,
      index,
      updateData,
      esClient,
      esHelper
    }

    User.loginHelper(param, (err, updatedUser) => {
      if (err) {
        return res.json({
          status: 500,
          msg: err
        })
      }

      updatedUser.id = user.id

      const redis = req.redisClient
      redis.set(updatedUser.id, JSON.stringify(updatedUser))

      return res.json({
        status: 200,
        msg: '成功',
        user: updatedUser
      })
    })
  })(req, res, next)
}

export const logout = (req, res, next) => {
  passport.authenticate('bearer', {
    session: false
  }, (err, user) => {
    if (err || !user) {
      return res.json({
        status: 500,
        msg: err
      })
    }

    const User = req.models.user
    let id = req.query.id
    let updateData = {
      token: null,
      token_created: null
    }
    User.logoutHelper({
      index: req.settings.es.index,
      id,
      updateData,
      esHelper: req.esHelper
    }, (err, response) => {
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

export const resetPassword = (req, res, next) => {
  passport.authenticate('bearer', {
    session: false
  }, (err, user) => {
    if (err || !user) {
      return res.json({
        status: 500,
        msg: err
      })
    }

    let oldPwd = req.body.old_pwd
    let newPwd = req.body.new_pwd
    let renewPwd = req.body.re_new_pwd

    // 验证旧密码是否正确
    let isOldPwdCorrect = validatePassword(oldPwd, user.password)
    if (isOldPwdCorrect) {
      if (newPwd === renewPwd) {
        let encryptPwd = generatePassword(newPwd)
        const User = req.models.user
        User.resetPasswordHelper({
          esHelper: req.esHelper,
          index: req.settings.es.index,
          id: user.id,
          updateData: {
            password: encryptPwd
          }
        }, (err, response) => {
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
      } else {
        return res.json({
          status: 500,
          msg: '两次输入的新密码不相同'
        })
      }
    } else {
      return res.json({
        status: 500,
        msg: '旧密码错误'
      })
    }
  })(req, res, next)
}