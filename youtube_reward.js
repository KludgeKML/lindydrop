var YouTubeReward = function (selector_id) {
	this.selector = '#' + selector_id;
	this.selector_id = selector_id;
	this.done = false;

	this.player = new YT.Player(this.selector_id, {
    	height: '300',
    	width: '300',
/*    	videoId: 'M7lc1UVf-VE',*/
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
	getIt(event.target);
	// this.prepareNextVideo();
};

/* Called when the player changes state */
YouTubeReward.prototype.onPlayerStateChange = function(event) {
};

YouTubeReward.prototype.prepareNextVideo = function() {
	/* find videoId */
}

function getIt(player) {
	queryString = "https://www.googleapis.com/youtube/v3/search" +
				"?key=" + dataKey +
				"&part=snippet" +
				"&type=video" +
			  	"&videoEmbeddable=true" +
				"&q=Lindy+Hop"


	var jqxhr = $.ajax({
		type: 'GET',
		url: queryString,
        contentType: "application/json",
        dataType: 'json',
	}).done(function(json) {
		$('#next-title').text(json.items[0].snippet.title);
		player.cueVideoById(json.items[0].id.videoId);
  	})
  	.fail(function() {
    	alert( "error" );
  	})
  	.always(function() {
    	alert( "complete" );
  	});
}


