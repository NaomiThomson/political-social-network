var path = require('path');

module.exports = function(app) {

   app.get('/addevent', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/addevent.html'))
   }); 

   app.get('/event', function(req, res) {
      res.sendFile(path.join(__dirname + '/../public/event.html'))
   }); 
}