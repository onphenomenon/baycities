//jquery listeners,
//make ajax calls
$(function(){
  $.get('/cities', appendToList);

  function appendToList(cities){
    var list = [];
    var content, city;
    for(var i in cities){
      city = cities[i][0];
      content = '<a href="/cities/'+city+'">'+city+"</a>"+
      '<a href="#" data-city="'+city+'"><img src="delete.jpeg"></a>';
      list.push($('<li>', {html: content }));
    }

    $('.city-list').append(list);
  }

  //add a listener to the submit event on the form
  $('form').on('submit', function(event){
    event.preventDefault();
    var form = $(this);
    var cityData = form.serialize();
    //transforms form data to URL-encoded notaion

    $.ajax({
      type: 'POST', url:'/cities', data: cityData
    }).done(function(cityName){
      appendToList([cityName]);
      form.trigger('reset');
    })
  })
  //event handler
  $('.city-list').on('click', 'a[data-city]', function(event){
    if(!confirm('Are you sure ?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE', url: '/cities/'+ target.data('city')
    }).done(function(){
      target.parents('li').remove();
    });




  });




});



