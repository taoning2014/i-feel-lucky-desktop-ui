var Q = require('q');
var mysql = require('mysql');
var connection;
var connectionObj;

if (process.env.I_FEEL_LUCKY_RUNNINGENV === 'heroku') {
  connectionObj = {
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b4487238237fa8',
    password: '16b082aa',
    database: 'heroku_002d906b49808a1'
  };
} else if (process.env.I_FEEL_LUCKY_RUNNINGENV === 'local') {
  connectionObj = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Criptj86',
    database: 'I_FEEL_LUCKY'
  };
}

pool = mysql.createPool(connectionObj);

function parseInnerJSON(hotel) {
  // JSON.parse() can't do recursive parse, there pass need property from string to obj
  hotel.hotelImgs = JSON.parse(hotel.hotelImgs);
  hotel.additionalInformation = JSON.parse(hotel.additionalInformation);
  hotel.shortDescription = hotel.description.substr(0, 200) + ' [see more in description below]';
  return hotel;
}

function searchByCity(city) {
  var deferred = Q.defer();
  pool.getConnection(function(err, connection) {
    console.log('get connection');
    connection.query('SELECT * FROM MOCKUP_HOTEL_DETAIL WHERE searchCity like "%' + city + '%";',
      function(error, result, field) {
        console.log('release connection');
        connection.release(); // always put connection back in pool after last query
        var hotel = JSON.parse(JSON.stringify(result))[0];
        if (!hotel) {
          // BUG: need to return, even have 'res.render('pages/notFind');' before the next statement
          return deferred.reject('No hotel information found.');
        }
        return deferred.resolve(parseInnerJSON(hotel));
      });
  });
  return deferred.promise;
}

function searchByFeeling(feeling) {
  var deferred = Q.defer();
  pool.getConnection(function(err, connection) {
    console.log('get connection');
    connection.query('SELECT * FROM MOCKUP_HOTEL_DETAIL WHERE searchFeeling="' + feeling + '";',
      function(error, result, field) {
        console.log('release connection');
        connection.release(); // always put connection back in pool after last query
        var hotel = JSON.parse(JSON.stringify(result))[0];
        if (!hotel) {
          // BUG: need to return, even have 'res.render('pages/notFind');' before the next statement
          return deferred.reject('No hotel information found.');
        }
        return deferred.resolve(parseInnerJSON(hotel));
      });
  });
  return deferred.promise;
}

exports.searchByCity = searchByCity;
exports.searchByFeeling = searchByFeeling;
