/* Handle the writer area - save to local data, count words, and trigger
   rewards */
var TriggerWriteArea = function (selector) {
  this.selector = selector;
  this.reward_listener = null;
  this.warning_shown = false;
  this.word_count = 0;
  this.words_for_reward = 5;
  this.next_reward = 0;

  this.reward_selector = "#editor #how-many";
  this.word_count_display_selector = "#editor #display-words";

  if (typeof localStorage != "undefined") {
    text = localStorage.text;
    if (text == undefined) text = '';
    $(this.selector).attr("value", text);
    this.wordCount(text);
  }

  this.findNextReward();
  this.updateCountDisplay();

  twa = this;

  $(this.selector).keydown(function(event) {
    twa.handleTabs(event);
  });

  $(this.selector).keyup(function(event) {
    twa.wordCount(this.value);
    twa.updateCountDisplay();
    if (twa.word_count >= twa.next_reward) {
      twa.next_reward = twa.next_reward + twa.words_for_reward;
      twa.updateCountDisplay();
      if (twa.reward_listener != null) twa.reward_listener();
    }
  });

  $('.rewarder-choose-another').click(function() {
    twa.next_reward += parseInt($(this).data('increment'));
    twa.updateCountDisplay();
    twa.findNextReward();
  });

  $(this.reward_selector).change(function() {
    twa.next_reward -= twa.words_for_reward;
    twa.words_for_reward = parseInt(this.value);
    twa.findNextReward();
    twa.updateCountDisplay();
  });
}

/* Set a function to be called when a reward is triggered */
TriggerWriteArea.prototype.onReward = function(reward_listener) {
  this.reward_listener = reward_listener;
};

/* Save the buffer contents to local storage */
TriggerWriteArea.prototype.saveContents = function() {
  if (typeof localStorage != "undefined") localStorage.text = text;
  if (this.word_count >= 10 && this .warning_shown == false) {
    show_warning();
  }
};

/* Count the words in the buffer */
TriggerWriteArea.prototype.wordCount = function(text) {
  text = text.replace(/^\s*|\s*$/g,''); //removes whitespace from front and end
  text = text.replace(/\s+/g,' '); // collapse multiple consecutive spaces
  var words = text.split(" ");
  this.word_count = words.length;
};

/* Update the display showing words and next reward */
TriggerWriteArea.prototype.updateCountDisplay = function() {
  $(this.word_count_display_selector).html(this.word_count + " (next clip at " + this.next_reward + ")");
}

/* Work out the next trigger point */
TriggerWriteArea.prototype.findNextReward = function() {
  while (this.next_reward < this.word_count) {
    this.next_reward += this.words_for_reward;
  }
}


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
