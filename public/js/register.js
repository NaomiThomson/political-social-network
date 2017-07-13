$(document).ready(function () {

  // Getting jQuery references to the post body, title, form, and category select
  var emailInput = $("#email");
  var passwordInput = $("#password");
  var usernameInput = $("#username");

  // Adding an event listener for when the form is submitted
  $("#add-btn").on("click", function handleFormSubmit(event) {

    event.preventDefault();

    // Wont submit the post if we are missing a body or a title
    if (!emailInput.val().trim() || !passwordInput.val().trim()) {
      return;
    }
    // Constructing a newEvent object to hand to the database
    var newUser = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    // // Submits a new post and brings user to newsfeed upon completion
    $.post("/api/users", newUser, function() {
      window.location.href = "/newsfeed"
    })
  });

});