const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const usersController = require('./controllers/users')
const articlesController = require('./controllers/articles')

const app = express()
const port = 5001

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extend: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use(express.static('public'))
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

app.get('/blog', articlesController.index)
app.get('/blog/login', usersController.login)
app.post('/blog/login', usersController.handleLogin, directBack)
app.get('/blog/logout', usersController.logout)
app.post('/blog/create', articlesController.create, directBack)
app.get('/blog/delete/:id', articlesController.delete, directBack)
app.get('/blog/show/:id', articlesController.show)
app.get('/blog/edit/:id', articlesController.update)
app.get('/blog/edit', (req, res) => {
  res.render('edit')
})
app.post('/blog/update', articlesController.handelUpdate, directBack)
app.get('/blog/article_list', articlesController.list)
app.get('/blog/admin', articlesController.admin)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function directBack(req, res) {
  res.redirect('back')
}
