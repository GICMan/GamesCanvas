const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.sendFile(__dirname + "/" + "spear.html");
});

app.use(express.static('static'));

app.listen(process.env.PORT || 8080, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Listening on port 8080");
    }
});
