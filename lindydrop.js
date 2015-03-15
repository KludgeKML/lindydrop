$( document ).ready(function() {
  var writearea = new TriggerWriteArea("#write-area");
  writearea.onReward(function() {
    alert("reward triggered!");
  })
});

/* Handle the writer area - save to local data, count words, and trigger
   rewards */
var TriggerWriteArea = function (selector) {
  this.selector = selector;
  this.reward_listener = null;
  this.warning_shown = false;
  this.word_count = 0;
  this.words_for_reward = 100;
  this.next_reward = 0;

  this.reward_selector = "#how-may";
  this.word_count_display_selector = "#display-words";

  if (typeof localStorage != "undefined") {
    $(this.selector).attr("value", localStorage.text);
    this.wordCount(localStorage.text);
  }

  while (this.next_reward < this.word_count) {
    this.next_reward += this.words_for_reward;
  }

  $(this.selector).keydown(function(event) {
    this.handleTabs(event);
  });

  $(this.selector).keyup(function(event) {
    this.wordCount(this.value);
    if (this.word_count > this.next_reward) {
      this.next_reward = this.next_reward
      if (this.reward_listener != null) this.reward_listener();
    }
  });

  $(this.selector + " " + this.reward_selector).change(function() {
    words_for_reward = this.value();
  });
}

/* Set a function to be called when a reward is triggered */
TriggerWriteArea.prototype.onReward = function(reward_listener) {
  this.reward_listener = reward_listener;
};

/* Save the buffer contents to local storage */
TriggerWriteArea.prototype.saveContents = function() {
  if (typeof localStorage != "undefined") localStorage.text = text;
  if (this.word_count >= 10 && this.warning_shown == false) {
    show_warning();
  }
};

/* Count the words in the buffer */
TriggerWriteArea.prototype.wordCount = function(text) {
  text = text.replace(/^\s*|\s*$/g,''); //removes whitespace from front and end
  text = text.replace(/\s+/g,' '); // collapse multiple consecutive spaces
  var words = text.split(" ");
  this.word_count = words.length;
  $(this.word_count_display_selector).html(this.word_count + " of " + this.next_reward);
};

/* Deal with tab problems */
TriggerWriteArea.prototype.handleTabs = function(event) {
  if (event.keyCode === 9) {
    var el = event.target;

    // get caret position or selection
    var start = el.selectionStart;
    var end = el.selectionEnd;

    var value = el.value;

    // set text to: text before caret + tab + text after caret
    el.valuse = value.substring(0, start
                + "\t"
                + value.substring(end));

    // reset caret position
    el.selectionStart = el.selectionEnd = start + 1;

    // keep focus
    e.preventDefault();
  }
};




var warning;
if (typeof localStorage == "undefined") warning = "#warning-no-ls"
else warning = "#warning-ls";

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '300',
    width: '300',
    videoId: 'M7lc1UVf-VE',
    playerVars: {'controls': 0},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}


function show_warning() {
  $(warning).fadeIn("slow");
}

function hide_warning(immediate) {
  if (immediate == true) {
    $(warning).hide();
  } else {
    $(warning).fadeOut("slow");
  }
  warning_shown = true;
}

function show_lindy_clip() {
  hide_warning(true);
  lindy_clips_shown++;
  $("lindy-frame").html("<div id=\"player\"></div>");
}



