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

  console.log(__dirname);
  // watching the xml file

   //rx.Observable.just1("test");
   rx.Observable
    .interval(1000 /* ms */)
    .timeInterval()
    .subscribe(function(x){
      var tick = {
        time: new Date(),
        symbol: "BARC.L",
        price: Math.random()*100,

      };
      var tickJson = JSON.stringify(tick);
      var json = '{ "time" : "' + new Date() + '"}';
      socket.volatile.emit('notification', tickJson);
    });

  });
