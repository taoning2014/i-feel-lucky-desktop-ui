$(function() {
  // === Begin state of the lucky button ===
  var isLuckySelected = false;

  $('#where-are-you-going-input').keyup(function() {
    if ($(this).val() !== '') {
      isLuckySelected = true;
      $('#hotel-search-form-lucky-submit-btn').text('I\'m Feeling Lucky');
    } else {
      isLuckySelected = false;
      $('#hotel-search-form-lucky-submit-btn').html('I\'m Feeling... <span class="glyphicon glyphicon-menu-down" style="float:right"></span>');
    }
  })

  $('#hotel-search-form-lucky-submit-btn').hover(function() {
    if (isLuckySelected) {
      $('div.dropdown').removeClass('open');
    } else {
      $('div.dropdown').addClass('open');
    }
  }, function() {
    // Do nothing in hover out.
  });

  $('#hotel-search-form-lucky-submit-btn').click(function() {
    if (isLuckySelected) {
      $('div.dropdown').removeClass('open');
      console.log('TODO Submit');
    }
  });

  $('.feeling-option').click(function() {
    isLuckySelected = true;
    var btnInfo = 'I\'m Feeling ' + $(this).text();
    $('#hotel-search-form-lucky-submit-btn').text(btnInfo);
  });

  // === End state of the lucky button ===

  // Hide the opening picker when user scroll
  $(window).scroll(function() {
    $('div.dropdown').removeClass('open');
    $('#ui-datepicker-div').hide();
  });

  $('#check-in-input').datepicker();
  $('#check-out-input').datepicker();


});

