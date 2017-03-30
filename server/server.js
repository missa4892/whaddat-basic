const express = require('express');
var http = require('http');
var path = require('path');
var io = require('socket.io');
var fs = require('fs');

const helper = require('../helperAPI.js');


var app = express();

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.sendFile(path.resolve('views/main.html'));
});

app.get('/catHtml', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.sendFile(path.resolve('catHtml.html'));
});

app.get('/moderator', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.sendFile(path.resolve('HypeModerator.html'));
});

app.get('/myProfile', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.sendFile(path.resolve('Profile.html'));
});

// app.get('/catHtml2', (req, res) => {
//   //res.send('<h1>Hello Express!</h1>');
//   res.sendFile(path.resolve('views/sample.html'));
// });

app.use(express.static('vendor'));
app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.static('js'));
app.use(express.static('CatFurResources'));
app.use(express.static('ModeratorResources'));
app.use(express.static('ProfileResources'));

//app.listen(3000);

var server =http.createServer(app).listen(3000, function(){
  console.log("Server up");
});
//Server listens on the port 3000
io = io.listen(server);
/*initializing the websockets communication , server instance has to be sent as the argument */

io.sockets.on("connection",function(socket){
    /*Associating the callback function to be executed when client visits the page and
      websocket connection is made */
    console.log('Socket.io Connection with the client established');

    socket.on("imgToDetect", function(data){
        /*This event is triggered at the server side when client sends the data using socket.send() method */
        data = JSON.parse(data);
        //debugger;
        fs.writeFile(`./images/${data.imageName}`, decodeBase64Image(data.imageData).data,function (err) {
          if (err){
            console.log('It\'s not saved!'+err);
          } else {
              console.log('It\'s saved!');
              helper.getImageData(data.imageName, (err, res) => {
                debugger;
                socket.emit("label", res);
              });
          }
        });

        var ack_to_client = {
          data:"Server Received the message"
        }
        socket.send("label", JSON.stringify(ack_to_client));
      //   /*Sending the Acknowledgement back to the client , this will trigger "label" event on the clients side*/
    });

});

// Decoding base-64 image
// Source: http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
function decodeBase64Image(dataString)
{
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var response = {};

  if (matches.length !== 3)
  {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}
