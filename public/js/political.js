$(document).ready(function(){

	$.ajax({
      url: "/political",
      method: "GET",
    })
    .done(function(response) {
      console.log(response);
      //console.log(req);
      //console.log(JSON.stringify(JSON.parse(response),null,2));
      //$("#event").empty();
       
       $("#event").append(response[0].City);
  });
  // axios.get('/political')
  // .then(function(resp){
  //   console.log(resp);
  // }).catch(function(err){
  //   console.log(err);
  // });
});

   