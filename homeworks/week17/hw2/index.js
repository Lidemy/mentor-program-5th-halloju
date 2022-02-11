const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const usersController = require('./controllers/users')
const prizesController = require('./controllers/prizes')

const app = express()
const port = 5002

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

app.get('/prize', prizesController.index)
app.get('/prize/login', usersController.login)
app.post('/prize/login', usersController.handleLogin, directBack)
app.get('/prize/logout', usersController.logout)
app.post('/prize/create', prizesController.create, directBack)
app.get('/prize/delete/:id', prizesController.delete, directBack)
app.get('/prize/admin', prizesController.admin)
app.get('/prize/edit', (req, res) => {
  res.render('edit')
})
app.get('/prize/edit/:id', prizesController.update)
app.get('/prize/jackpot', prizesController.jackpot)
app.post('/prize/handelUpdate/:id', prizesController.handelUpdate, directBack)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function directBack(req, res) {
  res.redirect('back')
}
