$(document).ready(function () {
  // Gets an optional query string from our url 
  var url = window.location.search;
  var eventId = localStorage.getItem('eventId');

  // Getting jQuery references to the event info
  var titleInput = $("#title");
  var locationInput = $("#location");
  var dateInput = $("#date");
  var descriptionInput = $("#description");

getEventData(eventId);

  // Gets event data for an event if we're editing
  function getEventData(id) {

    axios.get(`/api/events/${id}`)
      .then(function (res) {
        
        // If this event exists, prefill our form with its data
        titleInput.val(res.data.title);
        locationInput.val(res.data.location);
        dateInput.val(res.data.date);
        descriptionInput.val(res.data.description);
      })
      .catch(function (err) {
        console.log(err)
      })
  }

});