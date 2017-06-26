import passport from 'passport'
import * as jwt from 'jwt-simple'
import moment from 'moment'

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
    const index = req.settings.es.index

    let token = jwt.encode({
      id: user.id
    }, tokenSecret);
    let current = moment().unix()
    let updateData = {
      token: token,
      token_created: current,
      last_login: current,
      login_ip_address: req.connection.remoteAddress
    }
    let param = {
      id: user.id,
      index,
      updateData,
      esClient,
      esHelper
    }

    User.loginHelper(param, (err, user) => {
      if (err) {
        return res.json({
          status: 500,
          msg: err
        })
      }

      return res.json({
        status: 200,
        msg: '成功',
        user
      })
    })
  })(req, res, next)
}

export const logout = (req, res, next) => {
  passport.authenticate('bearer', {
    session: false
  }, (err, user, info) => {
    if (err || !user) {
      return res.json({
        status: 500,
        message: err
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
  })(req, res, next);
}