var db = require('../models');

module.exports = function (app) {

   // GET , route for getting all events
   app.get('/api/events', function (req, res) {
      db.Event.findAll({})
         .then(function (dbEvent) {
            res.json(dbEvent);
         })
   });

   // GET route for returning events in a specific location
   app.get('/api/events/location/:location', function (req, res) {
      db.Event.findAll({
            where: {
               location: req.params.location
            }
         })
         .then(function (dbEvent) {
            res.json(dbEvent)
         })
   });

   // GET route for returning events created by a specific user
   app.get('/api/events/creator/:creator', function (req, res) {
      db.Event.findAll({
            where: {
               creator: req.params.creator
            }
         })
         .then(function (dbEvent) {
            res.json(dbEvent)
         })
   });

   // GET route for retrieving a single event
   app.get('/api/events/:id', function (req, res) {
      db.Event.findOne({
            where: {
               id: req.params.id
            }
         })
         .then(function (dbEvent) {
            res.json(dbEvent)
         })
   });

   // GET route for retrieving upcoming events
   app.get('/api/events/date/:date', function (req, res) {
      db.Event.findAll({
            where: {
               date: {
                  gte: NOW()
               }
            }
      })
      .then(function (dbEvent) {
         res.json(dbEvent)
      })
   });

   // POST route for saving a new event
   app.post('/api/events', function (req, res) {
      db.Event.create({
            creator: req.body.creator,
            location: req.body.location,
            date: req.body.date,
            title: req.body.title,
            description: req.body.description
         })
         .then(function (dbEvent) {
            res.json(dbEvent)
         })
   });

   // DELETE route for deleting events
   app.delete('/api/events/:id', function (req, res) {
      db.Event.destroy({
            where: {
               id: req.params.id
            }
         })
         .then(function (dbEvent) {
            res.json(dbEvent)
         })
   });

   // PUT route for updating events 
   app.put('/api/events', function (req, res) {
         db.Event.update(req.body, {
            where: {
               id: req.body.id
            }
         })
      })
      .then(function (dbEvent) {
         res.json(dbEvent)
      });
};