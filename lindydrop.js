var writearea;
var reward_frame;

$( document ).ready(function() {
  writearea = new TriggerWriteArea("#editable");
  writearea.onReward(function() {
    reward_frame.triggerReward();
  });

  aloha(document.querySelector('#editable'));

  var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

function onYouTubeIframeAPIReady() {
  reward_frame = new YouTubeReward('player');
}





var warning;
if (typeof localStorage == "undefined") warning = "#warning-no-ls"
else warning = "#warning-ls";


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



