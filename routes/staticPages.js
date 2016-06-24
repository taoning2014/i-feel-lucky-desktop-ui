var express = require('express');
var request = require('superagent');
var landingHotelData = require('../data/landing-list-hotels.json');
var hotelDetailData = require('../data/hotel-detail.json');
var router = express.Router();
var SERVERURL = 'http://nw-hrapi-d02:8080/htlrapi/hotels/v0';

router.get(/^\/(index(.html)?)?$/, function(req, res) {
  res.render('pages/landing', { hotels: landingHotelData });
});

router.get('/detail.html', function(req, res) {
  var hotelImages = hotelDetailData.hotel.images.slice(10, 15);
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

router.get('/lucky', function(req, res) {
  var buildBackendURL = SERVERURL + req.originalUrl;
  console.log('Debug get URL: ' + req.originalUrl);
  console.log('Debug buildBackendURL: ' + buildBackendURL);
  request
    .get(buildBackendURL)
    .end(function(err, respond) {
      if (err) {
        throw new Error('Didn\'t got backend data');
      }
      console.log('Success hit backend, got respond.');
      res.send(respond);
    });
});

module.exports = router;
