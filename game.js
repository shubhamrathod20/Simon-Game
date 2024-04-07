buttonColors = ["red", "blue", "green", "yellow"]

gamePattern = []
userClickedPattern = []

var gameStarted = false;
var level = 0;



$('.btn').click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress", function () {
    if (!gameStarted) {
        $('h1').text("level " + level);
        nextSequence();
        gameStarted = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;

    $("h1").text("level " + level);

    var randomNumber = Math.floor(4*Math.random());
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
    
    playSound(randomChosenColor);
}

function playSound(name) {
    var audioString = "./sounds/" + name + ".mp3";
    var audio = new Audio(audioString);
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).attr("class", "btn " + currentColor + " pressed");
    setTimeout(function() {
        $("#" + currentColor).attr("class", "btn " + currentColor);
    }, 50);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else {
        console.log("Failiure")
        playSound("wrong");
        $('body').attr("class", "game-over");
        setTimeout(function () {
            $('body').attr("class", "");
        },200);
        $('h1').text("Game Over, Press any key to restart.");
        startOver();
    }
}

function startOver() {
    level = 0;
    gameStarted = false;
    gamePattern = [];
}