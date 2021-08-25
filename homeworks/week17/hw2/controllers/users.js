const bcrypt = require('bcrypt')
const db = require('../models')

const { User } = db

const usersController = {
  login: (req, res) => {
    res.render('login')
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', 'Please enter a username and password.')
      return next()
    }
    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', 'User not found.')
        return next()
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          req.flash('errorMessage', 'An error occurred.')
          return next()
        }
        if (!result) {
          req.flash('errorMessage', 'Password incorrect.')
          return next()
        }
        req.session.username = user.username
        res.redirect('/prize')
      })
    }).catch((err) => {
      req.flash('errorMessage', 'An error occurred.')
      return next()
    })
  },

  logout: (req, res) => {
    req.session.destroy()
    res.redirect('/prize')
  }
}

module.exports = usersController
