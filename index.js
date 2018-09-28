var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//app.use(express.static('public'));
var base64ToImage = require('base64-to-image');

//Serves all the request which includes /images in the url from Images folder
app.use('/Images', express.static(__dirname + '/Images'));

app.get('/', function(req, res) {
   res.sendfile('index.html');
});
var count=0;
io.on('connection', function(socket) {
   count++; 	
   console.log(count+'user connected');
   socket.on('image',(data)=>{
   	var base64Str = data.imageData;
    //console.log(data);
    var path ='Images/imgset/'; 
    var optionalObj = {'fileName': data.imageName, 'type':'jpg'};
    base64ToImage(base64Str,path,optionalObj);
	//socket.emit('throughIMG',{path:'Images/ssss.jpg'});
	io.sockets.emit('broadcast',{path:'Images/imgset/'+data.imageName+'.jpg'});
	 });
  }); 

//var server = app.listen(5000);

http.listen(3000, function() {
   console.log('listening on localhost:3000');
})
