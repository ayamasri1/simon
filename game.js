var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userClickedPattern = [];
var started=false;
var level=0;

$(document).keydown(function(){
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
})

$("h1").keydown(function(){
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
})

$(".btn").on("click" , function (){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var index=userClickedPattern.length -1;
    checkAnswer(index);
})

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){nextSequence()} , 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over! Tap here to restart");
        setTimeout(function(){
            $(".game-over").removeClass("game-over")
        } , 200);
        
        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber= Math.random();
    randomNumber = Math.random()*3;
    randomNumber = Math.round(randomNumber);

    var randomChosenColor=buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
        setTimeout(function(){
            $("#" + currentColor).removeClass("pressed")
        } , 100);
}

function playSound(name){
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}
