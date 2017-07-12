var path = require('path');

module.exports = function(app) {

   app.get('/addevent', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/addevent.html'))
   }); 

   app.get('/editevent', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/editevent.html'))
   }); 

   app.get('/event', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/event.html'))
   }); 

   app.get('/adduser', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/adduser.html'))
   }); 

   app.get('/newsfeed', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/newsfeed.html'))
   }); 

   app.get('/findevent', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/findevent.html'))
   }); 
}