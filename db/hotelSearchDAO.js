var Q = require('q');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Criptj86',
  database: 'I_FEEL_LUCKY'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

function parseInnerJSON(hotel) {
  // JSON.parse() can't do recursive parse, there pass need property from string to obj
  hotel.hotelImgs = JSON.parse(hotel.hotelImgs);
  hotel.additionalInformation = JSON.parse(hotel.additionalInformation);
  hotel.shortDescription = hotel.description.substr(0, 200) + ' [see more in description below]';
  return hotel;
}

function searchByCity(city) {
  var deferred = Q.defer();
  connection.query('SELECT * FROM I_FEEL_LUCKY.MOCKUP_HOTEL_DETAIL WHERE searchCity like "%' + city + '%";',
    function(error, result, field) {
      var hotel = JSON.parse(JSON.stringify(result))[0];
      if (!hotel) {
        // BUG: need to return, even have 'res.render('pages/notFind');' before the next statement
        return deferred.reject('No hotel information found.');
      }
      return deferred.resolve(parseInnerJSON(hotel));
    });
  return deferred.promise;
}

function searchByFeeling(feeling) {
  var deferred = Q.defer();
  connection.query('SELECT * FROM I_FEEL_LUCKY.MOCKUP_HOTEL_DETAIL WHERE searchFeeling="' + feeling + '";',
    function(error, result, field) {
      var hotel = JSON.parse(JSON.stringify(result))[0];
      if (!hotel) {
        // BUG: need to return, even have 'res.render('pages/notFind');' before the next statement
        return deferred.reject('No hotel information found.');
      }
      return deferred.resolve(parseInnerJSON(hotel));
    });
  return deferred.promise;
}

exports.searchByCity = searchByCity;
exports.searchByFeeling = searchByFeeling;

