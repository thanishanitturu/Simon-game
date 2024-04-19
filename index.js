var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
let levelCount=0
var started=false;
function nextSequence()
{
    userClickedPattern=[]
    levelCount++
    $("#level-title").text("Level " + levelCount);
    let num=Math.random()*4;
    let num1=Math.floor(num);
    let randomChosenColor=buttonColors[num1];
    gamePattern.push(randomChosenColor);
    var cl="#"+randomChosenColor;
    $(cl).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    
}

function playSound(name)
{
var audio = new Audio("sounds/" + name + ".mp3");
audio.play();
}
$(".btn").click(function()
{
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
        nextSequence();
        }, 1000);

    }

    } else {

        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(()=>
        {
        $("body").removeClass("game-over")},1000
        );
        $("h1").text("Game over , press any key to start again")
        
        startOver()
    }

}
function startOver()
{
    started=false
    gamePattern=[]
    levelCount=0
    
}
function animatePress(currentPress)
{
$("#"+currentPress).addClass("pressed")
setTimeout(() => {
    $("#"+currentPress).removeClass("pressed")
}, 100);
}
$("body").keypress(function()
{
    if(!started)
    {
        $("#level-title").text("level "+levelCount)
        nextSequence()
        started=true
    }
})

