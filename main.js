var fs = require('fs');
var scrapePage  = require('./scrape.js');
var objects = []

configFile = process.argv[2]
objectType = process.argv[3]

fs.readFile(configFile, 'utf8', function(error, data){
  if(!error){
    config = JSON.parse(data);
    // chain = Promise.resolve();
    chain = [];
    for (i = 0; i < config.urls.length; i++) {
      chain.push(scrapePage(config.urls[i], objects, objectType));
    }
    Promise.all(chain).then(function(){
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
