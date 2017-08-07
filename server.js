var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var admin = require('firebase-admin')

var serviceAccount = require('./info-wise-firebase-adminsdk-896te-016e391f87.json')

var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://info-wise.firebaseio.com'
})

// Create instance of express app
var app = express()

// We want to serve js and html in ejs
// ejs stands for embedded javascript
app.set('view engine', 'ejs')

// We also want to send css, images, and other static files
app.use(express.static('views'))
app.set('views', __dirname + '/views')

// Give the server access to the user input
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(logger('dev'))
app.get('/', function(request, response){
    // response.send("<h1>Prep for Prep</h1>")
    response.render('login.ejs')
})
app.get('/home', function(request, response){
    // response.send("<h1>Prep for Prep</h1>")
    response.render('home.ejs')
})
app.get('/academic', function(request, response){
   
        response.render('academic.ejs')
   
})
app.get('/arts', function(request, response){
    response.render('arts.ejs')
  
})
app.get('/stem', function(request, response){
      response.render('stem.ejs')
   
})
app.get('/database', function(request, response){
      response.render('database.ejs')
   
})
app.get('/example-page', function(request, response){
      response.render('example-page.ejs')
   
})
app.get('/bronx', function(request, response){
      response.render('bronx.ejs')
   
})
app.get('/brooklyn', function(request, response){
      response.render('brooklyn.ejs')
   
})
app.get('/queens', function(request, response){
      response.render('queens.ejs')
   
})
app.get('/manhattan', function(request, response){
      response.render('manhattan.ejs')
   
})
app.get('/staten-island', function(request, response){
      response.render('staten-island.ejs')
   
})
app.get('/profile', function(request, response){
      response.render('profile.ejs')
   
})
app.get('/about', function(request, response){
      response.render('about.ejs')
   
})
app.get('/blog', function(request, response){
      response.render('blog.ejs')
   
})
app.get('/favorite', function(request, response){
    var database = firebaseAdmin.database()
    var favoritesRef = database.ref('/favorites')
      response.render('favorite.ejs')
   
})
var port = process.env.PORT || 8080

app.listen(port, function(){
    console.log('App running on port ' + port)
})