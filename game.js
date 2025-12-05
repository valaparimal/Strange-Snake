let food=document.createElement("div");
let gameBox=document.querySelector(".game-box");
let temptime=0;
let row=1,doun=0;right=1,flag=0,speed=100,ismusic=1,f=0;
let snack=[{x:1,y:1,snackHead:document.createElement("div")}];
const totalColumn = 30;
const totalRow = 18;
let scoreDiv = document.querySelector("#score");
let isGameContinue = true;


let HiScore= localStorage.getItem("HiScore");
if(HiScore === null)
{  
    localStorage.setItem("HiScore","0");
    HiScore=0;
}
document.querySelector("#hiscore").innerText=`Hi Score :${HiScore}`;


//menu or more
let details = document.getElementById("more-details");
let overlay = document.querySelector(".overlay");
document.getElementById("more-symbole").addEventListener("click",()=>{
    details.classList.add("show");
    overlay.classList.add("show");
});

overlay.addEventListener("click",()=>{
    details.classList.remove("show");
    overlay.classList.remove("show");
})


// play game

document.querySelector("#playBtn").addEventListener("click",()=>{
    window.location="./play.html";
});




// help

document.querySelector("#help").addEventListener("click",()=>{
    alert(
        "🐍 Snake Game Controls:\n" +
        "⬆️ Move Up: Up Arrow (↑)\n" +
        "⬇️ Move Down: Down Arrow (↓)\n" +
        "⬅️ Move Left: Left Arrow (←)\n" +
        "➡️ Move Right: Right Arrow (→)\n" +
        "⏸️ Pause Game: Spacebar\n" +
        "🔇 Mute Background: M or m\n" +
        "🔇 Mute All Music: V or v"
      );
});

document.querySelector("#reset-hiscore").addEventListener("click",()=>{
    if(prompt("If you want to reset hi score then write something hear and click on OK   (*  else click on Cencel )"))
    {
        window.localStorage.setItem("HiScore","0");
        window.location.reload();
    }
});

