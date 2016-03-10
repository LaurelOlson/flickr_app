/* globals $:false */

"use strict";

$(function() {

  var apiKey = '8db7267f9ccd8c57604d2890ee434649';
  var method = 'flickr.photos.search';
  var tag = 'lighthouse';
  var url = 'https://api.flickr.com/services/rest/?method=' + method + '&api_key=' + apiKey + '&tags=' + tag + '&per_page=50&sort=relevance&format=json&nojsoncallback=1';
  var images = []

  $.getJSON(url, function(data) {
    $.each(data.photos.photo, function(i, photo) {
      var img_url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
      images.push(img_url)
    });
  })
    .then(function() {
      function displayImg(img_url, i) {
        var img = $('<img>').attr({'src': img_url});

        $('#img-div').children().fadeOut(1000);

        window.setTimeout(function() {
          $(img).hide().appendTo('#img-div').fadeIn(1200);
        }, 1200);

        if ( i + 1 < images.length ) {
          var img_url = images[i+1];
          i++
        }
        else {
          var img_url = images[0];
          i = 0
        }
        console.log(img_url);
        console.log(i);
        debugger
        window.setTimeout(function() {
          displayImg(img_url, i)
        }, 5000);
      };
      displayImg(images[0], 0);
    });

});