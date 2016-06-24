$(function(){
  // Hide the opening picker when user scroll
  $(window).scroll(function(){
    $('div.dropdown').removeClass('open');
    $('#ui-datepicker-div').hide();
  });

  $('#hotel-search-form-lucky-submit-btn').hover(function(){
    $('div.dropdown').addClass('open');
  }, function(){
    // Do nothing in hover out.
  });

  $( '#check-in-input' ).datepicker();
  $( '#check-out-input' ).datepicker();
});

