var express = require('express');
var app = express();
var fs = require('fs');
const downloads = "./Download/";
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const cdns = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"><link rel="stylesheet" href="./style.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script><script src="./modal.js"></script><link rel="stylesheet" href="./ekko-lightbox.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.min.js"></script>'

var html = '<html><head><title>Scrappy</title>'+cdns+'</head><body><div class="imageBox" style="display:flex; justify-content: flex-start; width:100%;">';
var endHtml = '</div></body></html>';

app.listen(3000, ()=>{
  console.log("Server Listening on Port 3000");
  console.log("Got you honey");
  fs.readdir(downloads, (err, files)=>{
    console.log("Files in Downloads are...");
    files.forEach(file=>{
      console.log(file);
      var fullPath ='/Download/'+file;
      html+='<div><a href="'+downloads+''+file+'" data-toggle="lightbox"><img src="'+downloads+''+file+'" style="width: 100%; height: auto; display: block;"></a></div>';
    });
    html+=endHtml;
    console.log(html);
    fs.writeFile('./index.html', html, function(err){
      if(err){
        console.log(err);
      }
      console.log("Wrote Everything!!");
    });
  });
});
