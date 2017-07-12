var key = 'AIzaSyDUIhAs5jVGRlA8_CjSSTc6fH4FrkvryRs';
// var distance;

// var loc1 = 'newport beach, ca';
// var loc2 = 'los angeles, ca';

// var googlePromise = new Promise((resolve, reject) => {
//     var service = new google.maps.DistanceMatrixService;
//     service.getDistanceMatrix({
//         origins: [loc1],
//         destinations: [loc2],
//         travelMode: 'DRIVING'
//     }, function (res, status) {
//         if (status !== 'OK') {
//             alert('Error was: ' + status)
//             reject('Error was: ' + status)
//         } else {
//             distance = res.rows[0].elements[0].distance.text
//             resolve(distance);
//         }
//     })
// }).then(() => {console.log(distance);})

// https://maps.googleapis.com/maps/api/distancematrix/json?origins=Seattle&destinations=San+Francisco&key=AIzaSyDUIhAs5jVGRlA8_CjSSTc6fH4FrkvryRs

$.get("https://maps.googleapis.com/maps/api/distancematrix/json?origins=Seattle&destinations=San+Francisco&key=AIzaSyDUIhAs5jVGRlA8_CjSSTc6fH4FrkvryRs", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });