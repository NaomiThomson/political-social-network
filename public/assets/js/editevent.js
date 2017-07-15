$(document).ready(function () {
  console.log('ready');
  // Gets an optional query string from our url 
  var url = window.location.search;
  var postId;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var hostInput = $("#host");
  var titleInput = $("#title");
  var locationInput = $("#location");
  var dateInput = $("#date");
  var descriptionInput = $("#description");

  // Adding an event listener for when the form is submitted
  $("#add-btn").on("click", function handleFormSubmit(event) {

    event.preventDefault();

    // Wont submit the post if we are missing a body or a title
    if (!titleInput.val().trim() || !locationInput.val().trim() || !dateInput.val().trim()) {
      return;
    }

       // Constructing a newPost object to hand to the database
    var newPost = {
      host: hostInput.val().trim(),
      title: titleInput.val().trim(),
      location: locationInput.val().trim(),
      date: dateInput.val().trim(),
      description: descriptionInput.val().trim()
    };

    newPost.id = postId;
    updatePost(newPost);
  });

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get(`/api/events/${id}`, function (data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        hostInput.val(data.host);
        titleInput.val(data.title);
        locationInput.val(data.location);
        dateInput.val(data.date);
        descriptionInput.val(data.description);
      }
    });
  }
  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
        method: "PUT",
        url: "/api/events",
        data: post
      })
      .done(function () {
        window.location.href = "/home";
      });
  }
});