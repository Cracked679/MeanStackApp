var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var app = express();
var port = process.env.PORT || 3000;
var User = require("./app/models/user");
var router = express.Router();
var apiRoutes = require("./app/routes/api")(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use('/api',apiRoutes);

mongoose.connect('mongodb://localhost:27017/test',function(err){
    if(err){
        console.log("Not connected\n"+err);
    }
    else{
        console.log("\nConnected to Database.")
    }
});

app.get('*',function(req, res){
    res.sendFile(path.join(__dirname,'/public/app/views/index.html'))
});

app.listen(port ,function(){
    console.log("Running The Server......."+port);
});