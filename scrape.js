var Promise = require('bluebird');
var rp      = require('request-promise');
var fs      = require('fs');
var cheerio = require('cheerio');

function scrapePage(url, functionName) {
  var delay = Math.random()*10000 + 10000;
  var options = {
    uri: url,
    transform: function (body) {
      return ParseContent[ functionName ](body)
    }
  };

  return rp(options).then(function(json){
    console.log('requesting page from: '+ url);
    return json;
  });
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
  },

  patientsweb : function (body){
    $ = cheerio.load(body);
    var title, description, threads;
    var json = { title: "", description: "", threads: [] }

    title = $('.listContent h1').text();
    description = $('.listContent .postContent p').text();
    threads = []

    $('.replyWrap').each(function(){
      threads.push($(this).children('.listContent').children('p').text());
    });

    json.title = title;
    json.description = description;
    json.threads = threads;

    return json;
  }
}

module.exports = scrapePage
