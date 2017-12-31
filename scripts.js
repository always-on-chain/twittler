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
  var visitor = 'waynewest';

   var createProfilePics = function(tweet) {
    if (tweet.user === 'shawndrost') {
      return 'images/HR-Shawn.jpg';
    } else if (tweet.user === 'sharksforcheap') {
      return 'images/HR-Sharks.jpeg';
    } else if (tweet.user === 'mracus') {
      return 'images/HR-Marcus.jpeg';
    } else if (tweet.user === 'douglascalhoun') {
      return 'images/HR-Doug.JPG';
    } else {
      return 'images/wayne.jpg'
    }
  }

  var createNames = function(tweet) {
     if (tweet.user === 'shawndrost') {
      return 'shawndrost';
    } else if (tweet.user === 'sharksforcheap') {
      return 'Anthony Phillips';
    } else if (tweet.user === 'mracus') {
      return 'Marcus Phillips';
    } else if (tweet.user === 'douglascalhoun'){
      return 'Douglas Calhoun';
    } else if (tweet.user === 'waynewest') {
      return 'Wayne West'
    }
  }

  var showTweets = function(index, array) {
    var tweet = array[index];
    var $tweet = $('<div class="tweet"></div>');
    var $name = $('<a href="#" class="name">' + createNames(tweet) + '</a></div>');
    var $username = $('<div class="username">' + '@' + tweet.user + ' &middot; ' + '</div>');
    var $time = $('<div class="time">' + dateFormat(tweet.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT") + '</div>');
    var $message = $('<div class="message">' + tweet.message + '</div>');
    var $profilePic = $('<img class="profile-picture">');

    $message.prependTo($tweet);
    $time.prependTo($tweet);
    $username.prependTo($tweet);
    $name.prependTo($tweet);
    $tweet.prependTo($('.tweet-section'));
    $profilePic.prependTo($tweet);

    $tweet.find('.profile-picture').attr('src', createProfilePics(tweet));
    $tweet.find('.name').attr('id', tweet.user);
  }

  var generateTweets = function(oldIndex, index, array) {
    for (var i = oldIndex; i < index; i++) {
      showTweets(i, array);
    }
  }

  var initializeTweets = function() {
    generateTweets(oldIndex, index, array);
    oldIndex = streams.home.length;
  }
  initializeTweets();

  var showTweetsAfterPageClears = function(array) {
    //After click on a user name or Home button
    if ($('.name').data('clicked')) {
      $('.new-tweets').hide();
    } else if ($('.home').data('clicked')) {
      $('.new-tweets').show();
    }
    $('.tweet-section').html('');
    oldIndex = 0;
    index = array.length;
    generateTweets(oldIndex, index, array);
  }

  var showNewTweets = function() {
    array = streams.home;
    index = streams.home.length;
    generateTweets(oldIndex, index, array);
    oldIndex = streams.home.length;
  }

  var addNewUser = function(username) {
    streams.users[username] = [];
  }
  addNewUser(visitor);

  var generateNewUserTweet = function(visitor) {
    if ($('.status-text').val() !== '') {
      writeTweet($('.status-text').val());
      $('.status-text').val('');
      $('.profile-tweets-stats').text(streams.users[visitor].length);
      showNewTweets();
    } 
  }

  var showSameHashtags = function(content) {
    $('.tweet-section').html('');
    $('.new-tweets').hide();
    streams.home.forEach(function(obj, index) {
      if (obj.message.includes(content)) {
        showTweets(index, streams.home);
      }
    })
  }

  var searchContent = function() {
    var content = $('input:first').val();
    if (content.slice(0, 1) === '#') {
      showSameHashtags(content);
    } else {
      showTweetsAfterPageClears(streams.users[content]);
    }
    $('.search-text').val('');
  }

  var clickOnName = function(location, array) {
    $('.tweet-section').on('click', location, function() {
      $('.name').data('clicked', true);
      showTweetsAfterPageClears(array);
    });
  }
  
  $body.on('click', '.new-tweets', showNewTweets);
  $('.tweet-button').on('click', function() {
    generateNewUserTweet(visitor);
  });
  $('.search-form').submit(searchContent);
  $('.home').on('click', function() {
    $(this).data('clicked', true);
    showTweetsAfterPageClears(streams.home)
  });
  clickOnName('#shawndrost', streams.users.shawndrost);
  clickOnName('#sharksforcheap', streams.users.sharksforcheap);
  clickOnName('#mracus', streams.users.mracus);
  clickOnName('#douglascalhoun', streams.users.douglascalhoun);
  clickOnName('#waynewest', streams.users.waynewest);

});
