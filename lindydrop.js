var writearea;
var reward_frame;

$( document ).ready(function() {
  writearea = new TriggerWriteArea("#write-area");
  writearea.onReward(function() {
    reward_frame.triggerReward();
  })
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



