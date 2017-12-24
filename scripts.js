 
 $(document).ready(function(){
        var $body = $('body');
        var index = streams.home.length - 1;
        var oldIndex = 0;
        // $body.html('');

        var reformatTime = function() {
          return moment().format('lll');
        }

        var prependContent = function(content, destination) {
          return content.prependTo(destination);
        }

        var createProfilePicTags = function($tweet, tweet) {
          var $profilePic = $('<img id="picture">');
          var path;
          prependContent($profilePic, $tweet);
          if (tweet.user === 'shawndrost') {
            path = 'images/HR-Shawn.jpg';
          } else if (tweet.user === 'sharksforcheap') {
            path = 'images/HR-Sharks.jpeg';
          } else if (tweet.user === 'mracus') {
            path = 'images/HR-Marcus.jpeg';
          } else {
            path = 'images/HR-Doug.JPG';
          }
          $tweet.find('#picture').attr('src', path);
        }

        var createMessageTags = function($tweet, tweet) {
          var $message = $('<p id="message">' + tweet.message + '</p>');
          prependContent($message, $tweet);
        }

        var createUsernameTags = function($tweet, tweet) {
          var $username = $('<p id="username">' + '@' + tweet.user + '</p>');
          prependContent($username, $tweet);
        }

        var createTimeTags = function($tweet, tweet) {
          var $time = $('<p id="time">' + reformatTime() + '</p>');
          prependContent($time, $tweet);
        }
         
        var showTweets = function(index, tweet) {
          var tweet = streams.home[index];
          var $tweet = $('<div class="tweet"></div>');

          createMessageTags($tweet, tweet);
          createTimeTags($tweet, tweet);
          createUsernameTags($tweet, tweet);
          createProfilePicTags($tweet, tweet);
          
          prependContent($tweet, $('.tweet-section'));
        }

        var generateTweets = function() {
          while(index >= oldIndex){
            showTweets(index);
            index -= 1;
          }
        }

        var initializeTweets = function() {
          generateTweets();
          oldIndex = streams.home.length - 1;
        }
        initializeTweets();

        var showNewTweets = function() {
          index = streams.home.length - 1;
          generateTweets(index, oldIndex);
          oldIndex = streams.home.length - 1;
        }

        $('.new-tweets').on('click', showNewTweets)
      });
