function TickerService(){

}
  TickerService.prototype.companySearch = function(searchText){
    return Rx.Observable.create(function(obs){
      // creating a new websocket
      var socket = io.connect('http://localhost:8002');

      socket.on('notification', function (data) {
          obs.onNext( JSON.parse(data));
      });

      var payload = {
        data: searchText
      };

      socket.emit('companyRequest', JSON.stringify(payload));

    });
  }

  TickerService.prototype.createTickersubscription =function(company){
    return Rx.Observable.create(function(obs){
      var socket = io.connect('http://localhost:8001');

      socket.on('tick', function (data) {
          obs.onNext( JSON.parse(data));
      });

      var payload = {
        data: company
      };


      socket.emit('tickerRequest', JSON.stringify(payload));

      return function () {
        var disconnect =JSON.stringify(payload);
        console.log('about to dispose of ' + disconnect);
        socket.emit('tickerEnd', disconnect);
        console.log('disposed :' + disconnect) ;
      };
    });
  }

module.exports = TickerService;
