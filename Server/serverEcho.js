var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
 // parser = new require('xml2json'),
  fs = require('fs');

// creating the server ( localhost:8000 )
app.listen(8000);

// on server started we can load our client.html page
function handler(req, res) {
  res.writeHead(200);
    res.end(data);
}

// creating a new websocket to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {

  console.log(__dirname);
  // watching the xml file
  fs.watch(__dirname + '/example.xml', function(curr, prev) {

      var json = '{ "time" : "' + new Date() + '"}';
      socket.volatile.emit('notification', json);
    });
  });