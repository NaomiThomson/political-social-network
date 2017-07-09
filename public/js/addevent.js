$("#add-btn").on("click", function (event) {
  event.preventDefault();
  var newEvent = {
    host: $("#host").val().trim(),
    title: $("#title").val().trim(),
    location: $("#location").val().trim(),
    date: $("#date").val().trim(),
    description: $('#description').val().trim()
  };

  // Question: What does this code do??
  $.post("/api/new", newEvent)
    .done(function (data) {
      console.log(data);
    });
});