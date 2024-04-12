var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "yellow", "green"];

var level = 0;

var gameStart = false;


$(document).on("keydown", function starter() {
    if (gameStart === false) {
        
        $("#level-title").text("Level " + level); 
        nextSequence();
        gameStart = true;
        
    }
    
    
});

$(".btn").on("click", function handler(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $('#'+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {

    switch (name) {
        case "red":
            var audio = new Audio("red.mp3");
            audio.play();
            break;
        
        case "blue":
            var audio = new Audio("blue.mp3");
            audio.play();
            break;
            
        case "green":
            var audio = new Audio("green.mp3");
            audio.play();
            break;
            
        case "yellow":
            var audio = new Audio("yellow.mp3");
            audio.play();
            break;
    
        default:
            break;
    }

}

function animatePress(currentColour) {

    var activeButton = $("."+currentColour);
    
    activeButton.addClass("pressed");

    setTimeout(function() {
        activeButton.removeClass("pressed")
    }, 100);

}
 function startOver(){
    level = 0
    gamePattern = []
    gameStart = false
 }

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }else {
        var audio = new Audio("./sounds/wrong.mp3");
            audio.play();
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
