//////////////////////////////////////////////////////////////
//INITIAL PAGE LOAD
///////////////////////////////////////////////////////////////
var timer;
$(document).ready(function () {
    focusTimer(30);
});

function focusTimer(duration) {
    var display = $("#focus-time");

    var minutes = 0;
    var seconds = 0;
    // var displayTime = "52:00"; May use this for displaying timer
    console.log(localStorage.getItem("time"));
    console.log("Duration: " + duration);
    if(localStorage.getItem("time") !== null && localStorage.getItem("time") > 0){
        timer = localStorage.getItem("time");
        console.log("Time is not saved");
    } else{
        console.log("Time is saved");
        timer = duration;
    }
    console.log("Timer: " + timer);
    var count = setInterval(function () {
        console.log(timer);
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        // console.log("Minutes: " + minutes);
        // console.log("Seconds: " + seconds);
        // display.textContent = displayTime;
        // setTimeout(function () {
        display.text(minutes + ":" + seconds); //= minutes + ":" + seconds;
        // }, 1000);

        if (--timer < 0) {
            stop(count);
            $("#focus-timer").hide();
            localStorage.removeItem("time");
            window.location.replace("/break");
        }
    }, 1000);
}

///////////////////////////////////////////////////////////////
// SPOTIFY ADD SONG
///////////////////////////////////////////////////////////////
var spotifyForm = $("form.songSubmit");
spotifyForm.on("click", function(event){
    event.preventDefault();
    if($("#songName").val() !== ""){
        $.post("/api/spotify", {
            songName: $("#songName").val()
        }).then(function(data){
            // Store the time
            localStorage.setItem("time", timer);
            window.location.replace(data);
        }).catch(function(err){
            console.log(err);
        });
    }
});
