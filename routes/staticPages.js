var express = require('express');
var request = require('superagent');
var landingHotelData = require('../data/landing-list-hotels.json');
var hotelDetailData = require('../data/hotel-detail.json');
var router = express.Router();
//var SERVERURL = 'http://nw-hrapi-q04:8080/htlrapi/hotels/v0';
var SERVERURL = 'http://nw-hrapi-q03:8080/htlrapi/hotels/v0';
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

router.get(/^\/(index(.html)?)?$/, function(req, res) {
  res.render('pages/landing', { hotels: landingHotelData });
});

router.get('/detail.html', function(req, res) {
  var hotelImages = hotelDetailData.hotel.images && hotelDetailData.hotel.images.slice(10, 15);
  res.render('pages/detail', {
    hotel: hotelDetailData.hotel,
    hotelImages: hotelImages
  });
});

router.get('/checkout.html', function(req, res) {
  res.send('At checkout page, to be deliver.');
});

router.get('/404.html', function(req, res) {
  res.send('At 404 page, to be deliver.');
});

router.get('/mockup/searchCity/:city', function(req, res) {
  var city = decodeURI(req.params.city);
  var hotel;
  connection.query('SELECT * FROM I_FEEL_LUCKY.MOCKUP_HOTEL_DETAIL WHERE searchCity like "%' + city.split(',')[0] + '%";', function(error, result, field) {
    hotel = JSON.parse(JSON.stringify(result))[0];
    if (hotel === undefined) {
      res.render('pages/notFind');
      // BUG: need to return, otherwise code will continue run to end of this function
      return;
    }
    hotel.hotelImgs = JSON.parse(hotel.hotelImgs);
    hotel.additionalInformation = JSON.parse(hotel.additionalInformation);
    hotel.shortDescription = hotel.description.substr(0, 200) + ' [see more in description below]';
    console.log(hotel);
    res.render('pages/detail', hotel);
  });
});

router.get('/mockup/searchFeeling/:feeling', function(req, res) {
  var feeling = decodeURI(req.params.feeling);
  var hotel;
  connection.query('SELECT * FROM I_FEEL_LUCKY.MOCKUP_HOTEL_DETAIL WHERE searchFeeling="' + feeling + '";', function(error, result, field) {
    hotel = JSON.parse(JSON.stringify(result))[0];
    if (hotel === undefined) {
      res.render('pages/notFind');
      // BUG: need to return, otherwise code will continue run to end of this function
      return;
    }
    hotel.hotelImgs = JSON.parse(hotel.hotelImgs);
    hotel.additionalInformation = JSON.parse(hotel.additionalInformation);
    hotel.shortDescription = hotel.description.substr(0, 200) + ' [see more in description below]';
    console.log(hotel);
    res.render('pages/detail', hotel);
  });
});

router.get('/lucky', function(req, res) {
  var buildBackendURL = SERVERURL + req.originalUrl;
  var hotelImages;

  console.log('Debug get URL: ' + req.originalUrl);
  console.log('Debug buildBackendURL: ' + buildBackendURL);
  request
    .get(buildBackendURL)
    .end(function(err, respond) {
      if (err) {
        throw new Error('Didn\'t got backend data');
      }
      console.log('Success hit backend, got respond.');
      console.log(respond.text);
      hotelImages = JSON.parse(respond.text).hotel.images && JSON.parse(respond.text).hotel.images.slice(10, 15);
      res.render('pages/detail', {
        hotel: JSON.parse(respond.text).hotel,
        hotelImages: hotelImages
      });
    });
});

module.exports = router;
