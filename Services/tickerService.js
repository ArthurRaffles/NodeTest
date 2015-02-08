function TickerService(){


  TickerService.prototype.searchCompany = function(searchText){
    return "monkey";
  }

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

}
