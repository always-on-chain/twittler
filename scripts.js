  /* High level objectives
  1. Show the user new tweets somehow. (You can show them automatically as they're created, or create a 
  button that displays new tweets.)

  2. Display the timestamps of when the tweets were created. This timestamp should reflect the actual 
  time the tweets were created, and should not just be hardcoded.

  3. Design your interface so that you want to look at and use the product you're making.

  4. Allow the user to click on a username to see that user's timeline.

  5. Show when the tweets were created in a human-friendly way (eg "10 minutes ago"). You'll want to find 
  and use a library for this.
  
  6. Allow the user to tweet. (This is going to require you to understand a little more about 
  data_generator.js, but you shouldn't need to modify anything.)
 */

 $(document).ready(function(){
  var $body = $('body');
  var array = streams.home
  var index = streams.home.length;
  var oldIndex = 0;

  var createProfilePicTags = function($tweet, tweet) {
    var $profilePic = $('<img id="picture">');
    var path;
    $profilePic.prependTo($tweet);
    if (tweet.user === 'shawndrost') {
      path = 'images/HR-Shawn.jpg';
    } else if (tweet.user === 'sharksforcheap') {
      path = 'images/HR-Sharks.jpeg';
    } else if (tweet.user === 'mracus') {
      path = 'images/HR-Marcus.jpeg';
    } else if (tweet.user === 'douglascalhoun') {
      path = 'images/HR-Doug.JPG';
    } else {
      path = 'images/wayne.jpg'
    }
    $tweet.find('#picture').attr('src', path);
  }

  var createNameTags = function($tweet, tweet) {
    var name;
    if (tweet.user === 'shawndrost') {
      name = 'shawndrost';
    } else if (tweet.user === 'sharksforcheap') {
      name = 'Anthony Phillips';
    } else if (tweet.user === 'mracus') {
      name = 'Marcus Phillips';
    } else if (tweet.user === 'douglascalhoun'){
      name = 'Douglas Calhoun';
    } else if (tweet.user === 'waynewest') {
      name = 'Wayne West'
    }
    var $name = $('<a href="#" class="name">' + name + '</a></div>');
    $name.prependTo($tweet);
    $tweet.find('.name').attr('id', tweet.user);
  }

  var createUsernameTags = function($tweet, tweet) {
    var $username = $('<div id="username">' + '@' + tweet.user + ' &middot; ' + '</div>');
    $username.prependTo($tweet);
  }

  var createTimeTags = function($tweet, tweet) {
    var $time = $('<div id="time">' + dateFormat(tweet.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT") + '</div>');
    $time.prependTo($tweet);
  }

  var createMessageTags = function($tweet, tweet) {
    var $message = $('<div id="message">' + tweet.message + '</div>');
    $message.prependTo($tweet);
  }
   
  var showTweets = function(index, array) {
    var tweet = array[index];
    var $tweet = $('<div class="tweet"></div>');

    createMessageTags($tweet, tweet);
    createTimeTags($tweet, tweet);
    createUsernameTags($tweet, tweet);
    createNameTags($tweet, tweet);
    createProfilePicTags($tweet, tweet);
    
    $tweet.prependTo($('.tweet-section'));
  }

   var showUserTweets = function(array) {
    $('.tweet-section').html('');
    $('.new-tweets').remove();
    oldIndex = 0;
    index = array.length;
    generateTweets(oldIndex, index, array);
  }

  var generateTweets = function(oldIndex, index, array) {
    for (var i = oldIndex; i < index; i++) {
      showTweets(i, array);
    }
  }

  var home = function() {
    $('.tweet-section').html('');
    if ($('.new-tweets').length === 0) {
      $(this).closest('header').next().after($('<div class="new-tweets">See new Tweets</div>'));
    }
    oldIndex = 0;
    index = streams.home.length;
    array = streams.home;
    generateTweets(oldIndex, index, array);
  }

  var initializeTweets = function() {
    generateTweets(oldIndex, index, array);
    oldIndex = streams.home.length;
  }
  initializeTweets();

  var showNewTweets = function() {
    array = streams.home;
    index = streams.home.length;
    generateTweets(oldIndex, index, array);
    oldIndex = streams.home.length;
  }

  var addWayneToUsers = function() {
    streams.users.waynewest = [];
  }
  addWayneToUsers();

  var addWayneTweet = function (wayneTweet) {
    streams.users['waynewest'].push(wayneTweet);
    streams.home.push(wayneTweet);
    $('#status-text').val('');
    showNewTweets();
  }

  var generateWayneTweet = function() {
    tweet = {};
    tweet.user = 'waynewest';
    if ($('#status-text').val() !== '') {
      tweet.message = $('#status-text').val();
      tweet.created_at = new Date();
      addWayneTweet(tweet);
    } 
  }

  var submitUser = function() {
    var username = $('input:first').val();
    showUserTweets(streams.users[username]);
  }

  $body.on('click', '.new-tweets', showNewTweets);
  $('#tweet').on('click', generateWayneTweet);
  $('.tweet-section').on('click', '#shawndrost', function(array) {
    showUserTweets(streams.users.shawndrost);
  });
  $('.tweet-section').on('click', '#sharksforcheap', function(array) {
    showUserTweets(streams.users.sharksforcheap);
  });
  $('.tweet-section').on('click', '#mracus', function(array) {
    showUserTweets(streams.users.mracus);
  });
  $('.tweet-section').on('click', '#douglascalhoun', function(array) {
    showUserTweets(streams.users.douglascalhoun);
  });
  $('.tweet-section').on('click', '#waynewest', function(array) {
    showUserTweets(streams.users.waynewest);
  });
  $('#home').on('click', home);
  $('#search-form').submit(submitUser);

});
