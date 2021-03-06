var express = require('express');
var router = express.Router();
var landingHotelData = require('../db/data-hotel-list.json');
var hotelSearchDAO = require('../db/hotelSearchDAO');

router.get(/^\/(index(.html)?)?$/, function(req, res) {
  res.render('pages/landing', { hotels: landingHotelData });
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

router.get('/404.html', function(req, res) {
  res.send('At 404 page, to be deliver.');
});

module.exports = router;
