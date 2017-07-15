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
       
       $("#name").append(response[0].Name);
  });
  // axios.get('/political')
  // .then(function(resp){
  //   console.log(resp);
  // }).catch(function(err){
  //   console.log(err);
  // });
});
