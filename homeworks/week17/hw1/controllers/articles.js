const db = require('../models')

const { Article } = db

const articlesController = {
  admin: (req, res) => {
    const { username } = req.session
    if (username !== 'admin') {
      res.redirect('/blog')
    }

    Article
      .findAll({
        raw: true,
        order: [
          ['id', 'DESC']
        ]
      })
      .then((articles) => {
        res.render('admin', {
          articles
        })
      })
  },

  index: (req, res) => {
    Article
      .findAll({
        raw: true,
        order: [
          ['id', 'DESC']
        ]
      })
      .then((articles) => {
        res.render('index', {
          articles
        })
      })
  },

  create: (req, res, next) => {
    const { username } = req.session
    if (username !== 'admin') {
      res.redirect('/blog')
    }

    const { title, content } = req.body
    if (!title || !content) {
      req.flash('errorMessage', 'Please enter title or content.')
      return next()
    }

    Article
      .create({
        title,
        content
      })
      .then(() => {
        res.redirect('/blog')
      })
  },

  delete: (req, res, next) => {
    const { username } = req.session
    if (username !== 'admin') {
      res.redirect('/blog')
    }

    Article.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => next())
  },

  update: (req, res) => {
    const { username } = req.session
    if (username !== 'admin') {
      res.redirect('/blog')
    }

    Article
      .findOne(
        {
          where: {
            id: req.params.id
          }
        })
      .then((article) => {
        res.render('edit', {
          article
        })
      })
  },

  handelUpdate: (req, res, next) => {
    const { username } = req.session
    if (username !== 'admin') {
      res.redirect('/blog')
    }

    const { title, content, id } = req.body
    if (!title || !content) {
      req.flash('errorMessage', 'Please enter title or content.')
      return next()
    }

    Article
      .update(
        {
          title,
          content
        },
        {
          where: {
            id
          }
        })
      .then(() => {
        res.redirect('/blog')
      })
  },

  show: (req, res) => {
    Article
      .findOne(
        {
          where: {
            id: req.params.id
          }
        })
      .then((article) => {
        res.render('show', {
          article
        })
      })
  },

  list: (req, res) => {
    Article
      .findAll({
        raw: true,
        order: [
          ['id', 'DESC']
        ]
      })
      .then((articles) => {
        res.render('article_list', {
          articles
        })
      })
  }
}

module.exports = articlesController
