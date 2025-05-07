const color = ["red","green","blue","yellow"];
var level = 0;
var gamepattern = [];
var userClickedPattern = [];
var start = false;

$(document).ready(function(){
    $(document).keypress(function() {
            if(!start){
                $("#level-title").text("Level " + level);
                gamestart();
                start = true;
            }
    })
    $(".btn").click(function(){
        var userclick = $(this).attr("id");
        userClickedPattern.push(userclick);
        playSound(userclick);
        CheckAns(userClickedPattern.length-1);
        animate(userclick);
    })


    function gamestart(){

        $("#level-title").text("Level "+level);
       level++;
       userClickedPattern = [];
       const rand = Math.floor(Math.random() * 4);
        var randcolor = color[rand];
        gamepattern.push(randcolor);
        
        $("#" + randcolor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randcolor);

    }

    function playSound(sound){
        const audio = new Audio("./sounds/"+sound+".mp3");
        audio.play();
    }


    function animate(id){
        $("#"+id).addClass("pressed");
        setTimeout(function () {
            $("#" + id).removeClass("pressed");
          }, 100);
    }

    function CheckAns(id){
        if(userClickedPattern[id] === gamepattern[id]){

                if(gamepattern.length === userClickedPattern.length){
                    setTimeout(function(){
                        gamestart();
                    },1000);
                }
        }
        else{
            playSound("wrong")
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
              }, 200);
              $("#level-title").text("Game Over, Press Any Key to Restart");
              gameOver()
        }
    }

    function gameOver(){
        level = 0;
        gamepattern = [];
        start = false;
    }
})