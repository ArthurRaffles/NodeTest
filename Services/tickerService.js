function TickerService(){

  TickerService.prototype.companySearch = function(searchText){
    return Rx.Observable.create(function(obs){
      // creating a new websocket
      var socket = io.connect('http://localhost:8002');
      // on every message recived we print the new datas inside the #container div
      socket.on('notification', function (data) {
        //  console.log(data);
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
      // on every message recived we print the new datas inside the #container div
      socket.on('tick', function (data) {
        //  console.log(data);
          obs.onNext( JSON.parse(data));
      });

      var payload = {
        data: company
      };


      socket.emit('tickerRequest', JSON.stringify(payload));

      return function () {
        console.log('about to dispose of ' + payload);
        //socket.disconnect();
        socket.emit('tickerEnd', JSON.stringify(payload));
        console.log('disposed');
      };
    });
  }

}
