// Search Bar - Dropdown// 
$(function(){    
    $(".input-group-btn .dropdown-menu li a").click(function(){
        var selText = $(this).html();
       $(this).parents('.input-group-btn').find('.btn-search').html(selText);

   });
});