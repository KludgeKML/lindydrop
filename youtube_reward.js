var YouTubeReward = function (selector_id) {
	this.selector = '#' + selector_id;
	this.selector_id = selector_id;
	this.done = false;

	this.player = new YT.Player(this.selector_id, {
    	height: '300',
    	width: '300',
    	videoId: 'M7lc1UVf-VE',
    	playerVars: {'controls': 0},
    	events: {
      	'onReady': this.onPlayerReady,
      	'onStateChange': this.onPlayerStateChange
    	}
  	});
}

/* Run the player with the current reward */
YouTubeReward.prototype.triggerReward = function() {
  this.player.playVideo();
};

/* Called when the player is up */
YouTubeReward.prototype.onPlayerReady = function(event) {
};

/* Called when the player changes state */
YouTubeReward.prototype.onPlayerStateChange = function(event) {
};