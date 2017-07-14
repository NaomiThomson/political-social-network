$(document).ready(function () {
  console.log('ready');
  // Gets an optional query string from our url 
  var url = window.location.search;
  var eventId;

  // If we have this section in our url, we pull out the post id from the url
  if (url.indexOf("?event_id=") !== -1) {
    eventId = url.split("=")[1];
    getEventData(eventId);
  }

  // Getting jQuery references to the event info
  var titleInput = $("#title");
  var locationInput = $("#location");
  var dateInput = $("#date");
  var descriptionInput = $("#description");

  // Adding an event listener for when the form is submitted
  $("#add-btn").on("click", function handleFormSubmit(event) {

    event.preventDefault();

    // Wont submit the event if we are missing required inputs
    if (!titleInput.val().trim() || !locationInput.val().trim() || !dateInput.val().trim()) {
      return;
    }

       // Constructing a newPost object to hand to the database
    var newEvent = {
      host: hostInput.val().trim(),
      title: titleInput.val().trim(),
      location: locationInput.val().trim(),
      date: dateInput.val().trim(),
      description: descriptionInput.val().trim()
    };

    newEvent.id = eventId;
    updateEvent(newEvent);
  });

  // Gets event data for an event if we're editing
  function getEventData(id) {

    axios.get(`/api/events/${id}`)
    .then(function (data) {
      // If this event exists, prefill our form with its data
        titleInput.val(data.title);
        locationInput.val(data.location);
        dateInput.val(data.date);
        descriptionInput.val(data.description);
    })
  }
  // Update a given an event, bring user to the blog page when done
  function updateEvent(eventData) {

    axios.put('/api/events', eventData)
    .then(function (res) {
      window.location.href = '/event'
    })
    
  }
});