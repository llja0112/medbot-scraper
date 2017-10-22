var Promise = require('bluebird');
var fs = require('fs');
var scrapePage  = require('./scrape.js');
var objects = []

configFile = process.argv[2]
objectType = process.argv[3]

fs.readFile(configFile, 'utf8', function(error, data){
  if(!error){
    config = JSON.parse(data);
    chain = new Promise(function(resolve, reject){
      console.log('Start');
      resolve();
    });

    config.urls.forEach(function(url){
      chain = chain.then(function(){
        return new Promise(function(resolve, reject){
          console.log(url);
          scrapePage(url, objectType).then(function(json){
            objects.push(json);
            resolve();
          })
        });
      }).delay(5000);
    });

    chain.then(function(){
      return new Promise( (resolve, reject) => {
        fs.writeFile(config.outputFileName, JSON.stringify(objects, null, 4), function(err){
          console.log('File successfully written to: ' + config.outputFileName);
        });
      });
    });
  } else {
    console.log('Error with reading file!');
  }
});
