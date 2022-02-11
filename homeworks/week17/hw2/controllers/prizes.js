const { Op } = require('sequelize')
const db = require('../models')

const Prize = db.Jackpot

const prizesController = {
  index: (req, res) => {
    Prize
      .findAll({
        where: {
          prize: {
            [Op.gt]: 0
          }
        }
      })
      .then((prizes) => {
        res.render('index', {
          prizes
        })
      })
  },

  admin: (req, res) => {
    const { username } = req.session
    if (username !== 'admin') {
      res.redirect('/prize')
    }

    Prize
      .findAll({
        raw: true
      }).then((prizes) => {
        res.render('admin', {
          prizes
        })
      })
  },

  create: (req, res, next) => {
    const { username } = req.session
    if (username !== 'admin') {
      res.redirect('/prize')
    }

    const { name, prize, num, descriptions, price, headline, imgUrl, prob } = req.body
    if (!name || !prize || !num || !descriptions || !price || !headline || !imgUrl || !prob) {
      req.flash('errorMessage', 'Please enter empty field.')
      return next()
    }

    Prize
      .create({
        name,
        prize,
        num,
        descriptions,
        price,
        headline,
        imgUrl,
        prob
      })
      .then(() => {
        res.redirect('/prize/admin')
      })
  },

  update: (req, res) => {
    const { username } = req.session
    if (username !== 'admin') {
      res.redirect('/prize')
    }

    Prize.findAll({
      raw: true,
      where: {
        id: req.params.id
      }
    }).then((prize) => {
      res.render('edit', {
        prize: prize[0]
      })
    })
  },

  handelUpdate: (req, res, next) => {
    const { username } = req.session
    if (username !== 'admin') {
      res.redirect('/prize')
    }

    const { name, prize, num, descriptions, price, headline, imgUrl, prob } = req.body
    if (!name || !prize || !num || !descriptions || !price || !headline || !imgUrl || !prob) {
      req.flash('errorMessage', 'Please enter empty field.')
      return next()
    }

    Prize
      .update({
        name,
        prize,
        num,
        descriptions,
        price,
        headline,
        imgUrl,
        prob
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(() => {
        res.redirect('/prize/admin')
      })
  },

  jackpot: (req, res) => {
    Prize
      .findAll({
        raw: true
      })
      .then((prizes) => {
        const prob = []
        for (let i = 0; i < prizes.length; i++) {
          prob.push(...Array(prizes[i].prob * 10).fill(i))
        }
        const jackpot = prizes[Number(prob[Math.floor(Math.random() * prob.length)])]
        res.render('prize', {
          jackpot
        })
      })
  },

  delete: (req, res, next) => {
    const { username } = req.session
    if (username !== 'admin') {
      res.redirect('/prize')
    }

    Prize.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => next())
  }

}

module.exports = prizesController
