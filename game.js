let food=document.createElement("div");
let gameBox=document.querySelector(".game-box");
let temptime=0;
let row=0,doun=0;right=1,flag=0,speed=100,ismusic=1,f=0;
let snack=[{x:1,y:1,snackHead:document.createElement("div")}];


let HiScore= localStorage.getItem("HiScore");
if(HiScore === null)
{  
    localStorage.setItem("HiScore","0");
    HiScore=0;
}
document.querySelector("#hiscore").innerText=`Hi Score :${HiScore}`;


function createHead(){
    snack[0].x=0;
    snack[0].y=0;
    snack[0].snackHead=document.createElement("div");
    snack[0].snackHead.setAttribute("class","snackHead");
    snack[0].snackHead.style.backgroundImage='linear-gradient(to right,blue,lightgreen,lightblue,pink,red)';
    snack[0].snackHead.style.boxShadow="0 0 10px green";
    snack[0].snackHead.style.borderRadius="30%";
    snack[0].snackHead.style.gridRowStart=snack[0].x;
    snack[0].snackHead.style.gridColumnStart=snack[0].y;
    gameBox.append(snack[0].snackHead);
}


function creatFood(){
    food.style.backgroundImage='linear-gradient(to top,white,red,blue,gold,green,white)';
    food.style.borderRadius="50%";
    food.style.boxShadow="0 0 10px black";
    food.style.gridRowStart=Math.floor(Math.random()*17)+1;
    food.style.gridColumnStart=Math.floor(Math.random()*17)+1;

    for(let i=0;i<snack.length-1;i++)
    {
        if(food.style.gridRowStart == snack[i].x && food.style.gridColumnStart == snack[i].y)
        {
            creatFood();
            break;
        }
    }
    gameBox.appendChild(food);
}



function headIncreamenter(){
    if(row)
    {
        if(doun)
        {
            snack[0].x++;
        }
        else
        {
            snack[0].x--;
        }
    }
    else
    {
        if(right)
        {
            snack[0].y++;
        }
        else
        {
            snack[0].y--;
        }
    }
    snack[0].snackHead.style.gridRowStart=snack[0].x;
    snack[0].snackHead.style.gridColumnStart=snack[0].y;
}




function gameOver(){

    if(snack[0].x>18)
    {
        snack[0].x=0;   
    }
    else if(snack[0].y>18)
    {
        snack[0].y=0;
    }
    else if(snack[0].x<0)
    {
        snack[0].x=18;
    }
    else if(snack[0].y<0)
    {
        snack[0].y=18;
    }
    let i=1;
    for(i=1;i<snack.length;i++)
    {
            //game over 

        if(snack[0].x===snack[i].x && snack[0].y===snack[i].y)
        {
            // game over symbol
            document.querySelector(".before-gameOver-container").setAttribute("class","after-gameOver-container");

            if(HiScore<snack.length-1)
            {
                HiScore=snack.length-1;
                localStorage.setItem("HiScore",`${HiScore}`)
            }

            document.querySelectorAll(".audio").forEach((e)=>{
                e.remove();
            });

            if(ismusic)
            {
                document.querySelector(".temp-audio").innerHTML="<audio class='audio' src='Spring.m4a' height=0px; autoplay ></audio>"
            }

            window.addEventListener("click",()=>{
                window.location.reload();
            });
            window.addEventListener("keydown",()=>{
                window.location.reload();
            });
        }
    }
    if(i===snack.length)
    {
        return true;
    }
}


// chack volume

function chackVolume(){
    if(flag)
    {
        // unmute allmusic
        document.querySelectorAll(".audio").forEach((e)=>{
            e.muted=false;
                document.querySelector(".allMusicBtn").innerHTML=`<i class="fa-solid fa-music"></i>`;
                document.querySelector(".musicBtn").innerHTML=`<i class="fa-solid fa-volume-high"></i>`;
                ismusic=1;
        });
        flag=0;
    }
    else
    {
        //mute allmusic
        document.querySelectorAll(".audio").forEach((e)=>{
            e.muted=true;
                document.querySelector(".allMusicBtn").innerHTML=`<i class="fa-solid fa-play"></i>`;
                document.querySelector(".musicBtn").innerHTML=`<i class="fa-solid fa-volume-xmark"></i>`;
                ismusic=0;
        });
        flag=1;
    }
}


// change only background music

function backMusic()
{
    if(f)
    {
        // unmute music
        document.querySelectorAll(".audio").forEach((e)=>{
            e.muted=false;
                document.querySelector(".musicBtn").innerHTML=`<i class="fa-solid fa-volume-high"></i>`;
        });
        f=0;
    }
    else
    {
        //mute music
        document.querySelectorAll(".audio").forEach((e)=>{
            e.muted=true;
                document.querySelector(".musicBtn").innerHTML=`<i class="fa-solid fa-volume-xmark"></i>`;
        });
        f=1;
    }
}

// loop

 function main(ctime){

    if(gameOver())
    {
        window.requestAnimationFrame(main);
    }

    // speed control
    if(snack.length-1 == 20)
    {
        speed=50;
    }
    else if(snack.length-1 == 50)
    {
        speed=200;
    }        
    // snake speed manage
    if(ctime-temptime>speed)
    {

        // move the snake
            for(let i=snack.length-1;i>=1;i--)
            {
                snack[i].snackHead.style.backgroundImage="unset";
                snack[i].snackHead.style.backgroundColor="blue";
                snack[i].snackHead.style.boxShadow="0 0 10px black";
                snack[i].snackHead.style.borderRadius="40%";
                snack[i].x=snack[i-1].x;
                snack[i].y=snack[i-1].y;
                snack[i].snackHead.style.gridRowStart=snack[i].x;
                snack[i].snackHead.style.gridColumnStart=snack[i].y;
            }

            headIncreamenter();

            //create new part of snake

        if(snack[0].snackHead.style.gridColumnStart==food.style.gridColumnStart && snack[0].snackHead.style.gridRowStart==food.style.gridRowStart)
        {

           if(ismusic)
           {
            document.querySelector(".temp-audio").innerHTML="<audio class='audio' src='Crystal_Piano.m4a' height=0px; autoplay ></audio>"
           }

            snack.unshift({x:1,y:1,snackHead:document.createElement("div")});
            snack[0].snackHead.style.gridRowStart=snack[0].x=food.style.gridRowStart;
            snack[0].snackHead.style.gridColumnStart=snack[0].y=food.style.gridColumnStart;
            snack[0].snackHead.setAttribute("class","snackHead");
            snack[0].snackHead.style.backgroundColor="white";
            snack[0].snackHead.style.backgroundImage='linear-gradient(to left,blue,lightgreen,lightblue,red)';
            snack[0].snackHead.style.boxShadow="0 0 10px green";
            snack[0].snackHead.style.borderRadius="30%";
            snack[0].snackHead.style.border="1px solid black";
            gameBox.appendChild(snack[0].snackHead);

            console.log(HiScore);
            console.log(snack.length-1);
            if(snack.length-2 == HiScore)
            {
                console.log("hi");
                    chackVolume();
                    setTimeout(()=>{
                        chackVolume();
                    },2000);
            }

            document.querySelector("#score").innerText=`Score : ${snack.length-1}`;

            creatFood();
        }
        temptime=ctime;
    }
}




// start game

document.querySelector("#playBtn").addEventListener("click",()=>{
    
    document.querySelector("#playBtn").remove();
    document.querySelector("#before-backImage").setAttribute("id","after-backImage");
    document.querySelector(".before-game-container").setAttribute("class","after-game-container");
    document.querySelector(".runnig-audio").innerHTML="<audio  class='audio' src='Happy_Kids_Cartoon_Music_Background_Y2bs.Com.m4a' height=0px; autoplay loop></audio>";
    
    
    
    createHead();
    creatFood();

    document.querySelector("#help").remove();
    document.querySelector("#reset-hiscore").style.display="none";
    document.querySelector(".musicBtn").innerHTML=`<i class="fa-solid fa-volume-high"></i>`;
    document.querySelector(".allMusicBtn").innerHTML=`<i class="fa-solid fa-music"></i>`;


        // snake : move input
window.addEventListener("keydown",(e)=>{
    if(snack[0].x<=18 && snack[0].x>=0 && snack[0].y<=18 && snack[0].y>=0)
    {
        if(ismusic)
        {
            document.querySelector(".temp-audio").innerHTML="<audio class='audio' src='Fade_In.m4a' height=0px; autoplay ></audio>"
        }
        
        if(e.key=="ArrowUp")
        {
         row=1;
         doun=0;
         snack[0].snackHead.style.backgroundImage='linear-gradient(to top,blue,lightgreen,lightblue,red)';
        }
        else if(e.key=="ArrowDown")
        {
         row=1;
         doun=1;
         snack[0].snackHead.style.backgroundImage='linear-gradient(to bottom,blue,lightgreen,lightblue,red)';
        }
        else if(e.key=="ArrowLeft")
        {
         row=0;
         right=0;
         snack[0].snackHead.style.backgroundImage='linear-gradient(to left,blue,lightgreen,lightblue,red)';
        }
        else if(e.key=="ArrowRight")
        {
         row=0;
         right=1;
         snack[0].snackHead.style.backgroundImage='linear-gradient(to right,blue,lightgreen,lightblue,red)';
        }
        else if(e.key==" "){
            alert("game paused.....       Enter to paly");
        }
        else if (e.key=="m" || e.key=="M")
        {
            // mute unmute music
            backMusic();
        }
        else if (e.key=="v" || e.key=="V")
        {
            // mute unmute allmusic
            chackVolume();
        }

    }
});




    window.requestAnimationFrame(main);
});




// help

document.querySelector("#help").addEventListener("click",()=>{
    alert("            press keybord key to:    { [ snake up : up arrow ]   [ snake down : down arrow ]  [ snake left : left arrow ]   [ snake right : right arrow ]  [ game pause : space ]   [ mute background: m or M ]    [ mute all music : v or V ]   }")
});

document.querySelector("#reset-hiscore").addEventListener("click",()=>{
    if(prompt("If you want to reset hi score then write something hear and click on OK   (*  else click on Cencel )"))
    {
        window.localStorage.setItem("HiScore","0");
        window.location.reload();
    }
});

