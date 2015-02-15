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

    socket.on('tickerRequest', function(payload){

      var company = JSON.parse(payload).data;
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
      });

    socket.on('disconnect', function(){
      console.log(   ' has disconnected from tickerServer.' + socket.id);
      //disp.dispose();
      console.log("disconnected");
      });

  });
