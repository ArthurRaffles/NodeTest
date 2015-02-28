require('angular');
var tickerService =require('./services/tickerService');

var tickerController =require('./tickers/tickerController');
  var app = angular.module("myapp", [])
      .service("tickerService", tickerService)
      .controller("TickerController", tickerController);
