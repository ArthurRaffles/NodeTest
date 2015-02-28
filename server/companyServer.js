var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
 // parser = new require('xml2json'),
  fs = require('fs');
  rx = require('rx');
  under = require('underscore');

app.listen(8002);

// on server started we can load our client.html page
function handler(req, res) {
  res.writeHead(200);
    res.end(data);
}


  var companies;
  fs.readFile('companies.json', 'utf8', function (err, data) {
    if (err) throw err;
    companies = JSON.parse(data);
    console.log (companies[0].FIELD1);
  });
// creating a new websocket to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {

  console.log(__dirname);
  socket.on('companyRequest', function(data){

    console.log(data);
    var txt = JSON.parse(data);
    var responses = under.filter(companies, function(val){
        return val.FIELD1.indexOf(txt.data) > -1;
    });
    console.log('len' + responses.length);

      var tickJson = JSON.stringify(responses);

      socket.volatile.emit('notification', tickJson);

  });
});
