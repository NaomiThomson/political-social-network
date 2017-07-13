$(document).ready(function () {

  // Getting jQuery references to the post body, title, form, and category select
  var emailInput = $("#email");
  var passwordInput = $("#password");

  // Adding an event listener for when the form is submitted
  $("#add-btn").on("click", function handleFormSubmit(event) {

    event.preventDefault();

    // Wont submit the post if we are missing a body or a title
    if (!emailInput.val().trim() || !passwordInput.val().trim()) {
      return;
    }
    // Constructing a newEvent object to hand to the database
    var userLogin = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    
    // // Submits a new post and brings user to newsfeed upon completion
    // $.post("/api/login", userLogin, function(resp) {
    //   console.log('hello? am i here')
    //   if (resp.msg = true) {
    //     console.log('success');
    //     // window.location.href = "/newsfeed";
    //   } 

    //   if (resp.msg = false) {
    //     // window.location.href = "/login"
    //     console.log('FAIL');
    //     console.log(resp.msg)
    //   }
      
    // })

    axios.post('/api/login', userLogin)
    .then(function (resp) {
      console.log(resp)
      if (resp.data == true) {
        window.location.href = '/newsfeed'
      } else {
        window.location.href = 'login'
      }
    })
    .catch(function (err) {
      console.log(err)
    })

  });

});