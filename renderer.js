// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
(function() {
  window.jQuery = window.$ = require('./node_modules/jquery/dist/jquery.min');

  // var mockTweets = require('./mock_tweets');

  const twitterClient = require('./twitter');
  var tweets = [];
  var $elements = [];
  function fetchTweets() {
    return new Promise(function(resolve, object) {
      twitterClient.get('statuses/home_timeline', {count: 200}, function(error, tweets, response) {
        if(error) reject();
        this.tweets = tweets;
        resolve();
      });
    });
  }

  function createDomElements() {
    return new Promise(function(resolve, reject) {
      var $elements = this.tweets.map(function(tweet) {
        var $tr = $('<tr></tr>');

        var $imageTd = $('<td class="padding-normal border-normal"></td>');

        var $iconImg = $('<img/>').attr('src', tweet.user.profile_image_url);
        $imageTd.append($iconImg);

        var $textTd = $('<td class="padding-normal border-normal"></td>').html(tweet.text);

        $tr.append($textTd);
        $tr.append($imageTd);

        return $tr;
      });
      this.$elements = $elements;
      resolve();
    });
  }

  function injectDomElements() {
    return new Promise(function(resolve, reject) {
      $('#timeline').append(this.$elements);
      resolve();
    });
  }

  fetchTweets()
  .then(createDomElements)
  .then(injectDomElements);

  // key
  document.onkeydown = checkKey;
  function checkKey(e) {
      e = e || window.event;
      var keyJ = 74;
      var keyK = 75;
      var keyL = 76;
      var keyPeriod = 190;

      switch (e.keyCode) {
        case keyJ:
          down();
          break;
        case keyK:
          up();
          break;
        case keyL:
          like();
          break;
        case keyPeriod:
          reload();
          break;
        default:
          break;
      }
  }

  // point
  var pointer = undefined;
  function down() {
    if (pointer === undefined) {
      pointer = 0;
      repaint();
    } else if (pointer >= this.$elements.length - 1) {
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

  function reload() {
    console.log('reload');
  }

  function repaint() {
    $('tr').removeClass('selected'); // 全部消えるかな？？？？？？？
    if (pointer === undefined) {
      return;
    }
    $($('tr')[pointer]).addClass('selected');
    var height = window.innerHeight / 3;
    $(window).scrollTop($($('tr')[pointer]).offset().top - height);
  }
})();
