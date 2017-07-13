var db = require('../models');
var path = require("path");
var request = require("request");
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
      app.get('/api/events/host/:host', function (req, res) {
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
            console.log(req.body)
            db.Event.create({
                  host: req.body.host,
                  title: req.body.title,
                  location: req.body.location,
                  date: req.body.date,
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
            db.Event.update(req.body,
                  {
                        where: {
                              id: req.body.id
                        }
                  })
                  .then(function (dbEvent) {
                        res.json(dbEvent)
                  });
      });
      //political api request 
app.get("/political", function (req, res) {

    var queryURL = "http://politicalpartytime.org/api/v1/event/?format=json";
    var options = {
        method: "GET",
        url: queryURL
    }
    request(options, function (error, response, body) {
        if (error) throw error;
        var jbod = JSON.parse(response.body);
        var arrName = [];
        var arrEnt = [];

        var objPolitic = [];
        for (var i = 0; i < 50; i++) {
            var obj = {
                "Name": jbod.objects[i].beneficiaries[0].name, 
                "Entertainment": jbod.objects[i].entertainment,
                "Title": jbod.objects[i].beneficiaries[0].title,
                "Start-Date": jbod.objects[i].start_date,
                "Start-Time": jbod.objects[i].start_time,
                "AddressPayable": jbod.objects[i].checks_payable_to_address,
            };
            if (jbod.objects[i].venue != null) {
                obj.VenueAddress =  jbod.objects[i].venue.address1;
                obj.City =  jbod.objects[i].venue.city;
                obj.State =  jbod.objects[i].venue.state;
                obj.VenueName =  jbod.objects[i].venue.venue_name;
            }
            if(jbod.objects[i].hosts[0] != null){
                obj.Host = jbod.objects[i].hosts[0].name;
            }
            objPolitic.push(obj);
        }
        res.send(objPolitic);
    });

});

//political api end 
}; 