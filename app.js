
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("cancel").addEventListener("click", cancelledButtonPressed);

var startTime;
var endTime;
var origTimePeriod;
var newTimePeriod;
var timer;
var cancelled = false;


function getEndTime() {
    var datetime = new Date();

    var hours = parseInt(document.getElementById("hours").value);
    var minutes = parseInt(document.getElementById("minutes").value);
    var seconds = parseInt(document.getElementById("seconds").value);

    datetime.setHours(datetime.getHours() + hours);
    datetime.setMinutes(datetime.getMinutes() + minutes);
    datetime.setSeconds(datetime.getSeconds() + seconds);
    
    return datetime;
}


function startTimer() {
    cancelled = false;
    startTime = new Date();
    endTime = getEndTime();

    origTimePeriod = endTime.getTime() - startTime.getTime();
    
    newTimePeriod = origTimePeriod;
    timer = setInterval(displayCountdown, 1000);

}

function displayCountdown() {

    var timeLeft = msToTime(newTimePeriod);



    document.getElementById("clock").innerHTML = `<p>${timeLeft["hours"]}h ${timeLeft["minutes"]}m ${timeLeft["seconds"]}s</p>`;

    var newHeight = Math.floor(newTimePeriod / origTimePeriod * 100) * 3;

    document.getElementById("progressBar").setAttribute("height", newHeight);
    newTimePeriod -= 1000;

    if(newTimePeriod < 0 || cancelled) {
        clearInterval(timer);
        document.getElementById("clock").innerHTML = "<p>Complete!</p>";
    }
}

function cancelledButtonPressed() {
    cancelled = true;
}

function msToTime(milliseconds) {
    var mHour = 1000 * 60 * 60;
    var mMinutes = 1000 * 60;
    var mSeconds = 1000;

    var hours = Math.floor(milliseconds / mHour);
    var minutes = Math.floor((milliseconds % mHour) / mMinutes);
    var seconds = Math.floor((milliseconds % mMinutes) / mSeconds);

    var time = [];
    time["hours"] = hours;
    time["minutes"] = minutes;
    time["seconds"] = seconds;

    return time;
}