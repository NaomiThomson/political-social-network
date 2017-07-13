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
      app.get('events/location/:location', function (req, res) {
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
      app.get('events/host/:host', function (req, res) {
            db.Event.findAll({
                        where: {
                              host: req.params.host
                        }
                  })
                  .then(function (dbEvent) {
                        res.json(dbEvent)
                  })
      });

      // GET route for retrieving a single event
      app.get('events/:id', function (req, res) {
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
      app.get('events/date/:date', function (req, res) {
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
            //validation
            var date = new Date(req.body.date);
            console.log(date);
            if (date.getTime() <= Date.now()) {
                  throw new Error("Date has already passed!");
            }
            db.Event.create({
                        host: req.body.host,
                        title: req.body.title,
                        location: req.body.location,
                        date: date,
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
                  .then(function (dbEvent) {
                        res.json(dbEvent)
                  });
      });




      // POST route for saving a new user
      app.post('/api/register', function (req, res) {
            db.User.generateHash(req.body.password)
                  .then(function (resp) {
                        console.log(resp)
                        db.User.create({
                                    username: req.body.username,
                                    email: req.body.email,
                                    hash: resp
                              })
                              .then(function (resp) {
                                    res.json({"msg": "Registration sucess"});
                              }).catch (function (err) {
                                    res.json({"msg": "Registration fail"});
                              })
                  })

      });


      // GET route for getting all users
      app.get('/api/users', function (req, res) {
            db.User.findAll({})
                  .then(function (dbUser) {
                        res.json(dbUser);
                  })
      });

      // POST route for comparing password entered to the one in db
      app.post('/api/login', function (req, res) {
            db.User.findOne({
                  where: {
                        email: req.body.email
                  }
            }).then(function (dbUser) {
                  console.log(dbUser.dataValues.hash);
                  console.log(req.body.password);
                  db.User.validPassword(req.body.password, dbUser.dataValues.hash)
                        .then(function (resp) {
                              if (resp == true) {
                                    res.json(resp);
                              } 
                              
                              if (resp == false) {
                                    res.json(resp);
                              }
                        }).catch(function (err) {
                              res.json(err)
                        })
            })

      })

};