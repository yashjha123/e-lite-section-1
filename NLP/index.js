var natural = require('natural');
var app = require('express')();
var http = require('http').createServer(app);

app.get('/search',function(req,res) {
	x = req.query['text'];
	
	ret = classifier.classify(x)
	res.status(200).send(ret);
	return; 
});

app.get('*', function(req, res){
  res.sendFile(__dirname + req.url);
});


classifier = new natural.BayesClassifier();
classifier.addDocument('open garden', '3');
classifier.addDocument('black door', '2');
classifier.addDocument('balcony', '5');
classifier.addDocument('beutiful flowers', '6');
classifier.addDocument('cheap and large', '1');
classifier.addDocument('expensive and small', '5'); //LOL
classifier.addDocument('gold liquor', '7');
classifier.addDocument('open for golf', '8');
classifier.addDocument('baseball and cricket', '0');
classifier.addDocument('has tennis field', '1');
classifier.addDocument('affordable', '2');
classifier.addDocument('new', '3');
classifier.addDocument('refurbished', '4');
classifier.train();

http.listen(80,'0.0.0.0', function(){
  console.log('listening on *:80');
});