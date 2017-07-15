$(document).ready(function () {

  // Adding an event listener for when the form is submitted
  $("#logout-btn").on("click", function handleFormSubmit(event) {

   localStorage.removeItem('userId');
   localStorage.removeItem('eventId');

  })

})