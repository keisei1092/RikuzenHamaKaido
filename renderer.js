// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
(function() {
  window.jQuery = window.$ = require('./node_modules/jquery/dist/jquery.min');

  // const twitterClient = require('./twitter');

  var mockTweets = require('./mock_tweets').map(function(mockTweet) {
    return mockTweet.text;
  });

  /*
  var element = [];
  twitterClient.get('statuses/home_timeline', function(error, tweets, response) {
    if(error) throw error;
    element = tweets.map(function(tweet) { return tweet.text });
    debugger;
  });
  */

  var $element = mockTweets.map(function(number) {
    var $tr = $('<tr></tr>');
    var $td = $('<td></td>');
    $td.html(number);
    $tr.append($td);
    return $tr;
  });

  $('#timeline').append($element);
})();
