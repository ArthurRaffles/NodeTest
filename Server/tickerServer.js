var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
 // parser = new require('xml2json'),
  fs = require('fs');
  rx = require('rx');

app.listen(8001);

// on server started we can load our client.html page
function handler(req, res) {
  res.writeHead(200);
    res.end(data);
}


// creating a new websocket to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {

  console.log("connected: " + socket.id);
  this.compositeDisp = new rx.CompositeDisposable();
  this.disposables={};
  console.log(this.compositeDisp);
  var that = this;
    socket.on('tickerRequest', function(payload){

      var company = JSON.parse(payload).data.FIELD1;
      console.log("requesting for: " + company);


       var disp = rx.Observable
        .interval(1000 /* ms */)
        .timeInterval()
        .subscribe(function(x){
          var tick = {
            time: new Date(),
            symbol: company,
            price: Math.random()*100,

          };
          var tickJson = JSON.stringify(tick);
          console.log("emitting : " + tickJson);
          socket.volatile.emit('tick', tickJson);
        });
        that.compositeDisp.add(disp);
        that.disposables[company] = disp;
      });

      socket.on('tickerEnd', function(payload){
        var company = JSON.parse(payload).data.FIELD1;
        console.log("ending subscription for: " + company);

        that.disposables[company].dispose();
      });


    socket.on('disconnect', function(){
      console.log(   ' has disconnected from tickerServer.' + socket.id);
      that.compositeDisp.dispose();
      console.log("disconnected");
      });

  });
