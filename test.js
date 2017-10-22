var Promise = require('bluebird');

function delay5(){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      console.log('5s');
      resolve();
    }, 5000);
  });
}

function delay10(){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      console.log('10s');
      resolve();
    }, 10000);
  });
}

function middle(){
  return new Promise(function(resolve, reject){
    console.log('middle');
    resolve();
  });
}

function last(){
  return new Promise(function(resolve, reject){
    console.log('last');
    resolve();
  });
}

console.log('Start!');
first = new Promise(function(resolve, reject){
  console.log('First Promise');
  resolve();
});

first.delay(5000).then(function(){
  middle();
}).delay(10000).then(function(){
  last();
})
