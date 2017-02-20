// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
(function() {
  window.jQuery = window.$ = require('./node_modules/jquery/dist/jquery.min');

  // const twitterClient = require('./twitter');

  var mockTweets = require('./mock_tweets');

  /*
  var element = [];
  twitterClient.get('statuses/home_timeline', function(error, tweets, response) {
    if(error) throw error;
    element = tweets.map(function(tweet) { return tweet.text });
    debugger;
  });
  */

  var $element = mockTweets.map(function(tweet) {
    var $tr = $('<tr></tr>');

    var $imageTd = $('<td class="border-normal"></td>');

    var $iconImg = $('<img/>').attr('src', tweet.user.profile_image_url);
    $imageTd.append($iconImg);

    var $textTd = $('<td class="border-normal"></td>').html(tweet.text);

    $tr.append($textTd);
    $tr.append($imageTd);

    return $tr;
  });

  $('#timeline').append($element);

  // key
  document.onkeydown = checkKey;
  function checkKey(e) {
      e = e || window.event;
      var keyJ = '74';
      var keyK = '75';
      var keyL = '76';

      if (e.keyCode == keyJ) {
          down();
      }
      else if (e.keyCode == keyK) {
          up();
      }
      else if (e.keyCode == keyL) {
         like();
      }
  }

  // point
  var pointer = undefined;
  function down() {
    if (pointer === undefined) {
      pointer = 0;
      repaint();
    } else if (pointer >= mockTweets.length - 1) {
      return;
    } else {
      pointer++;
      repaint();
    }
  }

  function up() {
    if (pointer === undefined) {
      pointer = 0;
      repaint();
    } else if (pointer <= 0) {
      return;
    } else {
      pointer--;
      repaint();
    }
  }

  function like() {
    console.log('like');
  }

  function repaint() {
    $('tr').removeClass('selected'); // 全部消えるかな？？？？？？？
    if (pointer === undefined) {
      return;
    }
    $($('tr')[pointer]).addClass('selected');
    console.log($($('tr')[pointer]).scrollTop());
    var height = window.innerHeight / 3;
    $(window).scrollTop($($('tr')[pointer]).offset().top - height);
  }
})();
