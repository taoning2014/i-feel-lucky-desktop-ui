$(function() {
  // Helper function
  function buildDate(dataStr, moreDates) {
    if (!dataStr) {
      var date = new Date();
      var year = date.getFullYear().toString(10);
      var month = (parseInt(date.getMonth(), 10) + 1) % 12 + 1;
      month = month < 10 ? '0' + month : month;
      var day = (parseInt(date.getDate(), 10));
      if (moreDates) {
        // TODO: Not totally right
        day = (day + moreDates) % 30 + 1;
      }
      day = day < 10 ? '0' + day : day;
      return year + month + day;
    }

    return dataStr.split('/')[2] + dataStr.split('/')[0] + dataStr.split('/')[1];
  }

  function buildQueryParams(feeling) {
    var firstParam;
    if (feeling === 'Lucky') {
      firstParam = 'citysearchterm=' + $('#where-are-you-going-input').val();
    } else {

//      firstParam = 'citysearchterm=boston';
//      howareyoufeeling is not ready, so use to avoid server crash
      firstParam = 'howareyoufeeling=' + $('#hotel-search-form-lucky-submit-btn').val().toUpperCase();
    }
    var cguid = 'cguid=test1002';
    var checkIn = 'check-in=' + buildDate($('#check-in-input').val());
    var checkOut = 'check-out=' + buildDate($('#check-out-input').val(), 1);
    var currency = 'currency=USD';
    var responseOptions = 'response-options=TRIP_FILTER_SUMMARY,POP_COUNT,DETAILED_HOTEL,NEARBY_CITY,CLUSTER_INFO,SPONS';
    var roomsSelect = 'rooms=' + $('#rooms-select').val();
    var productTypes = 'product-types=RTL';
    var result = '?' + firstParam + '&' + cguid + '&' + checkIn + '&' + checkOut + '&' + currency +
      '&' + responseOptions + '&' + roomsSelect + '&' + productTypes;
    return encodeURI(result);
  }

  // Type ahead
  var usCities =
    [
      'New York, New York',
      'Los Angeles, California',
      'Chicago, Illinois',
      'Houston, Texas',
      'Philadelphia, Pennsylvania',
      'Phoenix, Arizona',
      'San Antonio, Texas',
      'San Diego, California',
      'Dallas, Texas',
      'San Jose, California',
      'Jacksonville, Florida',
      'Indianapolis, Indiana',
      'San Francisco, California',
      'Austin, Texas',
      'Columbus, Ohio',
      'Fort Worth, Texas',
      'Charlotte, North Carolina',
      'Detroit, Michigan',
      'El Paso, Texas',
      'Memphis, Tennessee',
      'Baltimore, Maryland',
      'Boston, Massachusetts',
      'Seattle, Washington',
      'Washington, District of Columbia',
      'Nashville, Tennessee',
      'Denver, Colorado',
      'Louisville, Kentucky',
      'Milwaukee, Wisconsin',
      'Portland, Oregon',
      'Las Vegas, Nevada',
      'Oklahoma City, Oklahoma',
      'Albuquerque, New Mexico',
      'Tucson, Arizona',
      'Fresno, California',
      'Sacramento, California',
      'Long Beach, California',
      'Kansas City, Missouri',
      'Mesa, Arizona',
      'Virginia Beach, Virginia',
      'Atlanta, Georgia',
      'Colorado Springs, Colorado',
      'Omaha, Nebraska',
      'Raleigh, North Carolina',
      'Miami, Florida',
      'Cleveland, Ohio',
      'Tulsa, Oklahoma',
      'Oakland, California',
      'Minneapolis, Minnesota',
      'Wichita, Kansas',
      'Arlington, Texas',
      'Bakersfield, California',
      'New Orleans, Louisiana',
      'Honolulu, Hawaii',
      'Anaheim, California',
      'Tampa, Florida',
      'Aurora, Colorado',
      'Santa Ana, California',
      'Saint Louis, Missouri',
      'Pittsburgh, Pennsylvania',
      'Corpus Christi, Texas',
      'Riverside, California',
      'Cincinnati, Ohio',
      'Lexington, Kentucky',
      'Anchorage, Alaska',
      'Stockton, California',
      'Toledo, Ohio',
      'Saint Paul, Minnesota',
      'Newark, New Jersey',
      'Greensboro, North Carolina',
      'Buffalo, New York',
      'Plano, Texas',
      'Lincoln, Nebraska',
      'Henderson, Nevada',
      'Fort Wayne, Indiana',
      'Jersey City, New Jersey',
      'Saint Petersburg, Florida',
      'Chula Vista, California',
      'Norfolk, Virginia',
      'Orlando, Florida',
      'Chandler, Arizona',
      'Laredo, Texas',
      'Madison, Wisconsin',
      'Winston-Salem, North Carolina',
      'Lubbock, Texas',
      'Baton Rouge, Louisiana',
      'Durham, North Carolina',
      'Garland, Texas',
      'Glendale, Arizona',
      'Reno, Nevada',
      'Hialeah, Florida',
      'Chesapeake, Virginia',
      'Scottsdale, Arizona',
      'North Las Vegas, Nevada',
      'Irving, Texas',
      'Fremont, California',
      'Irvine, California',
      'Birmingham, Alabama',
      'Rochester, New York',
      'San Bernardino, California',
      'Spokane, Washington',
      'Gilbert, Arizona',
      'Arlington, Virginia',
      'Montgomery, Alabama',
      'Boise, Idaho',
      'Richmond, Virginia',
      'Des Moines, Iowa',
      'Modesto, California',
      'Fayetteville, North Carolina',
      'Shreveport, Louisiana',
      'Akron, Ohio',
      'Tacoma, Washington',
      'Aurora, Illinois',
      'Oxnard, California',
      'Fontana, California',
      'Yonkers, New York',
      'Augusta, Georgia',
      'Mobile, Alabama',
      'Little Rock, Arkansas',
      'Moreno Valley, California',
      'Glendale, California',
      'Amarillo, Texas',
      'Huntington Beach, California',
      'Columbus, Georgia',
      'Grand Rapids, Michigan',
      'Salt Lake City, Utah',
      'Tallahassee, Florida',
      'Worcester, Massachusetts',
      'Newport News, Virginia',
      'Huntsville, Alabama',
      'Knoxville, Tennessee',
      'Providence, Rhode Island',
      'Santa Clarita, California',
      'Grand Prairie, Texas',
      'Brownsville, Texas',
      'Jackson, Mississippi',
      'Overland Park, Kansas',
      'Garden Grove, California',
      'Santa Rosa, California',
      'Chattanooga, Tennessee',
      'Oceanside, California',
      'Fort Lauderdale, Florida',
      'Rancho Cucamonga, California',
      'Port Saint Lucie, Florida',
      'Ontario, California',
      'Vancouver, Washington',
      'Tempe, Arizona',
      'Springfield, Missouri',
      'Lancaster, California',
      'Eugene, Oregon',
      'Pembroke Pines, Florida',
      'Salem, Oregon',
      'Cape Coral, Florida',
      'Peoria, Arizona',
      'Sioux Falls, South Dakota',
      'Springfield, Massachusetts',
      'Elk Grove, California',
      'Rockford, Illinois',
      'Palmdale, California',
      'Corona, California',
      'Salinas, California',
      'Pomona, California',
      'Pasadena, Texas',
      'Joliet, Illinois',
      'Paterson, New Jersey',
      'Kansas City, Kansas',
      'Torrance, California',
      'Syracuse, New York',
      'Bridgeport, Connecticut',
      'Hayward, California',
      'Fort Collins, Colorado',
      'Escondido, California',
      'Lakewood, Colorado',
      'Naperville, Illinois',
      'Dayton, Ohio',
      'Hollywood, Florida',
      'Sunnyvale, California',
      'Alexandria, Virginia',
      'Mesquite, Texas',
      'Hampton, Virginia',
      'Pasadena, California',
      'Orange, California',
      'Savannah, Georgia',
      'Cary, North Carolina',
      'Fullerton, California',
      'Warren, Michigan',
      'Clarksville, Tennessee',
      'McKinney, Texas',
      'McAllen, Texas',
      'New Haven, Connecticut',
      'Sterling Heights, Michigan',
      'West Valley City, Utah',
      'Columbia, South Carolina',
      'Killeen, Texas',
      'Topeka, Kansas',
      'Thousand Oaks, California',
      'Cedar Rapids, Iowa',
      'Olathe, Kansas',
      'Elizabeth, New Jersey',
      'Waco, Texas',
      'Hartford, Connecticut',
      'Visalia, California',
      'Gainesville, Florida',
      'Simi Valley, California',
      'Stamford, Connecticut',
      'Bellevue, Washington',
      'Concord, California',
      'Miramar, Florida',
      'Coral Springs, Florida',
      'Lafayette, Louisiana',
      'Charleston, South Carolina',
      'Carrollton, Texas',
      'Roseville, California',
      'Thornton, Colorado',
      'Beaumont, Texas',
      'Allentown, Pennsylvania',
      'Surprise, Arizona',
      'Evansville, Indiana',
      'Abilene, Texas',
      'Frisco, Texas',
      'Independence, Missouri',
      'Santa Clara, California',
      'Springfield, Illinois',
      'Vallejo, California',
      'Victorville, California',
      'Athens, Georgia',
      'Peoria, Illinois',
      'Lansing, Michigan',
      'Ann Arbor, Michigan',
      'El Monte, California',
      'Denton, Texas',
      'Berkeley, California',
      'Provo, Utah',
      'Downey, California',
      'Midland, Texas',
      'Norman, Oklahoma',
      'Waterbury, Connecticut',
      'Costa Mesa, California',
      'Inglewood, California',
      'Manchester, New Hampshire',
      'Murfreesboro, Tennessee',
      'Columbia, Missouri',
      'Elgin, Illinois',
      'Clearwater, Florida',
      'Miami Gardens, Florida',
      'Rochester, Minnesota',
      'Pueblo, Colorado',
      'Lowell, Massachusetts',
      'Wilmington, North Carolina',
      'San Buenaventura (Ventura), California',
      'Arvada, Colorado',
      'Westminster, Colorado',
      'West Covina, California',
      'Gresham, Oregon',
      'Norwalk, California',
      'Fargo, North Dakota',
      'Carlsbad, California',
      'Fairfield, California',
      'Cambridge, Massachusetts',
      'Wichita Falls, Texas',
      'High Point, North Carolina',
      'Billings, Montana',
      'Green Bay, Wisconsin',
      'West Jordan, Utah',
      'Richmond, California',
      'Murrieta, California',
      'Burbank, California',
      'Palm Bay, Florida',
      'Everett, Washington',
      'Flint, Michigan',
      'Antioch, California',
      'Erie, Pennsylvania',
      'South Bend, Indiana',
      'Daly City, California',
      'Centennial, Colorado',
      'Temecula, California'
    ];

  // Different state of lucky button
  var isLuckySelected = false;

  $('#where-are-you-going-input').keyup(function() {
    if ($(this).val() !== '') {
      isLuckySelected = true;
      $('#hotel-search-form-lucky-submit-btn').text('I\'m Feeling Lucky').val('Lucky');
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
      // Build url
      var EXPRESSAPI = '/lucky';
      var feeling = $('#hotel-search-form-lucky-submit-btn').val();
      var queryParams = buildQueryParams(feeling);
//      console.log('Debug: ' + EXPRESSAPI + queryParams);
      window.location = EXPRESSAPI + queryParams;
    }
  });

  $('.feeling-option').click(function() {
    isLuckySelected = true;
    var optionInfo = $(this).text();
    var btnInfo = 'I\'m Feeling ' + optionInfo;
    $('#hotel-search-form-lucky-submit-btn').text(btnInfo).val(optionInfo);
  });

  // Hide the opening pickers when user scroll
  $(window).scroll(function() {
    $('div.dropdown').removeClass('open');
    $('#ui-datepicker-div').hide();
  });

  $('#check-in-input').datepicker({ minDate: 0 });
  $('#check-out-input').datepicker({ minDate: 1 });

  // Init type ahead
  $('#where-are-you-going-input').autocomplete({
    source: usCities
  });


});

