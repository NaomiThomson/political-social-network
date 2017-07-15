
// $.get("http://www.mapquestapi.com/directions/v2/route?key=KEY&from=Clarendon Blvd,Arlington,VA&to=2400+S+Glebe+Rd,+Arlington,+VA", function(data, status){
//         alert("Data: " + data + "\nStatus: " + status);
//     });

function initMap() {
  var bounds = new google.maps.LatLngBounds;
  var markersArray = [];
  var num;
  var dist = [];
  var distArray;
  //calling political api
  // $.ajax({
  //   url: "/political",
  //   method: "GET",
  // })
  //   .done(function (response) {
  //     console.log(response);
  //     for(var i = 0; i< response.length;i++){
  //       dist.push([response[i].VenueAddress, response[i].City, response[i].State]);
  //       //  var strDist =  dist.join(" ");
  //       // console.log(strDist+"\n");
  //       // distArray.push(strDist.split(','));
  //       // console.log(distArray);
  //     }
  //    console.log("distenation" + dist);
  //    var array = Array(dist);
  //     // for(var b = 0; b<=dist.length; b+=4){
  //     //   var strDist =  dist.join(" ");
  //     // console.log(strDist+"\n");
  //     //    distArray = strDist.split(',');
  //     //    console.log(distArray);
  //     // }
     
  //   });
      //console.log(req);
      //console.log(JSON.stringify(JSON.parse(response),null,2));
      //$("#event").empty();

  //     $("#event").append(response[0].City);
  //   });
  // var value = $("#search").val();
  // if (value === "all") {
  //   for (var i = 0; i <= obj.length; i++) {

  //   }
  // }
  // switch (value) {
  //   case 16.0934:
  //     num = 16.0934;
  // }
  //var origin1 = {lat: 33.644, lng: -117.838};
  
  var origin2 = '15234 Brookhurst St. Westminster CA';
  var origin1 = '510 E Peltason Dr. Irvine CA';
  //var destinationB = {lat: 34.048, lng:  -118.262};

  var destinationIcon = 'https://chart.googleapis.com/chart?' +
    'chst=d_map_pin_letter&chld=D|FF0000|000000';
  var originIcon = 'https://chart.googleapis.com/chart?' +
    'chst=d_map_pin_letter&chld=O|FFFF00|000000';
  var map = new google.maps.Map(document.getElementById('map'), {
    // center: { lat: 33.644 },
    zoom: 10
  });
  var geocoder = new google.maps.Geocoder;
  //var dist = ['312 Pennsylvania Ave SE', '300 First Street SE, Washington DC', origin2];

  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [origin1],
    destinations: [origin2],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, function (response, status) {
    if (status !== 'OK') {
      alert('Error was: ' + status);
    } else {
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      var outputDiv = document.getElementById('output');
      outputDiv.innerHTML = '';
      deleteMarkers(markersArray);

      var showGeocodedAddressOnMap = function (asDestination) {
        var icon = asDestination ? destinationIcon : originIcon;
        return function (results, status) {
          if (status === 'OK') {
            map.fitBounds(bounds.extend(results[0].geometry.location));
            markersArray.push(new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              icon: icon
            }));
          } else {
            alert('Geocode was not successful due to: ' + status);
          }
        };
      };

      for (var i = 0; i < originList.length; i++) {
        var results = response.rows[i].elements;
        console.log(results);
        geocoder.geocode({ 'address': originList[i] },
          showGeocodedAddressOnMap(false));
        for (var j = 0; j < results.length; j++) {
          var disArray = results[j].distance.text.split('km');
          var distanceNumber = disArray[0].trim();
          console.log(distanceNumber);
          console.log(results[j].distance.text.split('km'))
          if (distanceNumber <= 100.0) {
            geocoder.geocode({ 'address': destinationList[j] },
              showGeocodedAddressOnMap(true));
            outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
              ': ' + results[j].distance.text + ' in ' +
              results[j].duration.text + '<br>';
          }

        }
      }
    }
  });
}

function deleteMarkers(markersArray) {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}