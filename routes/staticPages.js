var express = require('express');
var request = require('superagent');
var landingHotelData = require('../data/landing-list-hotels.json');
var hotelDetailData = require('../data/hotel-detail.json');
var hotelSearchDAO = require('../db/hotelSearchDAO');
var router = express.Router();

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
  var city = decodeURI(req.params.city).split(',')[0];
  hotelSearchDAO.searchByCity(city).then(function(hotel) {
    res.render('pages/detail', hotel);
  }, function() {
    res.render('pages/notFind');
  }).done();
});

router.get('/mockup/searchFeeling/:feeling', function(req, res) {
  var feeling = decodeURI(req.params.feeling);
  hotelSearchDAO.searchByFeeling(feeling).then(function(hotel) {
    res.render('pages/detail', hotel);
  }, function() {
    res.render('pages/notFind');
  }).done();
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
