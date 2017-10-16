var rp      = require('request-promise');
var fs      = require('fs');
var cheerio = require('cheerio');

function scrapePage(url, objects, functionName) {
  var options = {
    uri: url,
    transform: function (body) {
      return ParseContent[ functionName ](body)
    }
  };

  return rp(options).then(function(json){
    console.log('requesting page from: '+ url);
    objects.push(json);
  })
}

var ParseContent = {
  movies: function(body){
    $ = cheerio.load(body);
    var title, release, rating;
    var json = { title : "", release : "", rating : ""};

    $('.title_wrapper').filter(function(){
      var data = $(this);
      title = data.children().first().text().trim();
      release = data.children().last().children().last().text().trim();

      json.title = title;
      json.release = release;
    })

    $('.ratingValue').filter(function(){
      var data = $(this);
      rating = data.text().trim();

      json.rating = rating;
    })

    return json;
  }
}

module.exports = scrapePage
