var express = require('express');
var path = require("path");
var request = require("request");
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;
var app = express();

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/*+json" }));

// Static directory
app.use(express.static("./public"));

// Routes =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

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
// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});