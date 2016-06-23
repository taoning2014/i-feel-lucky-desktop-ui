var express = require('express');
var landingHotelData = require('../data/landing-list-hotels.json');
var router = express.Router();

router.get(/^\/(index(.html)?)?$/, function(req, res) {
  res.render('pages/landing', { hotels: landingHotelData });
});

router.get('/detail.html', function(req, res) {
  res.send('At detail page, to be deliver.');
});

router.get('/checkout.html', function(req, res) {
  res.send('At checkout page, to be deliver.');
});

router.get('/404.html', function(req, res) {
  res.send('At 404 page, to be deliver.');
});

module.exports = router;
