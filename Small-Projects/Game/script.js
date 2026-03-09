var timer = 60;
var score = 0;
var hitrn = 0;

// jispe click kroge wo element par event raise hoga, or event listner na milne pr event element ke parents par listener dhundhega, waha bhi naa milne par event parent ke parent ke parent par listener dhundhega

function increaseScore(){
    score += 10;
    document.querySelector("#scoreval").textContent=score;
}
function getNewHit(){
     hitrn = Math.floor(Math.random()*10);
    document.querySelector("#hitval").textContent=hitrn;
}

function makeBubble(){
    var clutter= "";

for(var i=1; i<=174; i++){
    var rn = Math.floor(Math.random()*10)
    clutter += `<div class="bubble">
    ${rn}
    </div>`;
}
document.querySelector("#pbtm").innerHTML = clutter; //dom concept
}

function runTimer(){
   var timerint = setInterval(function(){ 
    if (timer>0) {
 timer--;
    
   document.querySelector("#timerval").textContent= timer;
}
else{
 clearInterval(timerint);
 document.querySelector("#pbtm").innerHTML= `<h1>GAME OVER</h1>`;
}

}, 1000);
}

document.querySelector("#pbtm")
.addEventListener("click", function(dets){
var clickednum = Number(dets.target.textContent);
    if(clickednum === hitrn){
        increaseScore();
        makeBubble();
        getNewHit();
    }
});

runTimer();
makeBubble();
getNewHit();
// increaseScore();