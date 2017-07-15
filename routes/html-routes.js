var path = require('path');

module.exports = function(app) {

  app.get('/', function(req,res) {
    res.render("index");
  });

   app.get('/addevent', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/addevent.html'))
   }); 

   app.get('/editevent', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/editevent.html'))
   }); 

   app.get('/event', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/event.html'))
   }); 

   app.get('/register', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/register.html'))
   }); 

   app.get('/newsfeed', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/newsfeed.html'))
   }); 

    app.get('/login', function(req, res) {
      res.sendFile(path.join(__dirname + '/../views/layouts/landing.handlebars'))
   }); 
}