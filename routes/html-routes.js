var path = require('path');

module.exports = function(app) {

   app.get('/newevent', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/newevent.html'))
   }); 

   app.get('/event', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/event.html'))
   }); 
}