var playing = false;
var score, lives;
var action = Array.from({length: 3});
// created an array with three undefined
var pos = [0, 217, 434];
//window.console.log(action);
$(function(){

$("#start").click(function(){
    if(playing){
        location.reload();
    }
    else{
        playing = true;
        lives = 3;
        score = 0;
        
        introanimation();
        // to give the intro animation effect
        
        // to start the game action
        setTimeout(function(){
            startaction(1);
            setTimeout(function(){
                startaction(2)
            }, 500);
            setTimeout(function(){
                startaction(3)
            }, 1000);
        }, 1750);
    }
    
    
});

function loselife(){
    $("#i"+lives).fadeOut("slow");
    lives--;
}

function introanimation(){
    $("#start").text("Reset Game");
    $("#intro").text("Slice Fruits");

    $("#intro").animate({
        width: "-=200px",
        borderRadius: "2px"
    }, 500);

    $("#gamescreen").fadeIn(0);
    $("#gamescreen").animate({
        height: "375px",
        width: "650px"
    }, 500);

    setTimeout(function(){
        $("#score").fadeIn(500);
        $("#lives").fadeIn(500);
    }, 500);

    setTimeout(function(){
            $("#i1").fadeIn("slow");
        setTimeout(function(){
            $("#i2").fadeIn("slow")
        }, 250);
        setTimeout(function(){
            $("#i3").fadeIn("slow")
        }, 500);
    }, 1000);
}

function startaction(id){
    var n = Math.round(8*Math.random() + 1);
    $("#fruit"+id).attr("src", "images/fruit"+n+".png");
//    window.console.log(n);
    $("#fruit"+id).show();
    $("#fruit"+id).css({"left" : Math.round(Math.random()*120 + pos[id-1]), "top" : -100});
    
    action[id-1] = setInterval(function(){
        var step = 1 + Math.round(Math.random()*5);
        var newpos = $("#fruit"+id).position().top + step;
        $("#fruit"+id).css("top", newpos);
        if(newpos > $("#gamescreen").height()){
            loselife();
            if(lives == 0){
                clearInterval(action[0]);
                clearInterval(action[1]);
                clearInterval(action[2]);
                $("#end").html("Game Over!<br>Your Score is " + score + "!");
                $("#end").show();
                $("#lives").hide();
                $("#score").hide();
            }
            else{
                clearInterval(action[id-1]);
                startaction(id);
            }
            
        }
    }, 10);
}

$(".fruit").mouseover(function(){
    updateScore();
    var item = $(this).attr("id");
    var id = item.charAt(5);
//    window.console.log(id);
    $("#fruit"+id).hide("explode", 150);
//    $("#fruit"+id).css({"left" : Math.round(Math.random()*120 + p[id-1]), "top" : -75});
    clearInterval(action[id-1]);
    setTimeout(function(){
        startaction(id);
    }, 200);
    
    //playing slice sound
    document.getElementById("knife"+(1+2*Math.round(Math.random()))).play();
});

function updateScore(){
    score++;
    $("#scoreline").text(score);
}

});


//0 - 116
//217 - 333
//434 - 550