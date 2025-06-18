const gameOver=new Audio("gameover.mp3");
const music=new Audio("music.mp3");
const press=new Audio("ting.mp3");
press.preload = "auto";
press.load();

let isGameOver=false;

let turn="X";
let boxes=document.querySelectorAll(".box");
let turnInfo=document.querySelector("#turn");
let boxtexts=document.querySelectorAll(".boxtext");
let image=document.querySelector("img");

//turn change function
function turnChange(){
    if(turn=="X"){
        return "O";
    }
        return "X";
}

//Game win function
music.play();
function checkWin(){
    let wins=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    wins.forEach((w)=>{     
        if((boxtexts[w[0]].innerText==boxtexts[w[1]].innerText) && (boxtexts[w[1]].innerText==boxtexts[w[2]].innerText) && boxtexts[w[0]].innerText!=""){
            isGameOver=true;
            turnInfo.innerText=boxtexts[w[0]].innerText+" Won!";
            image.style.width="50%";
            gameOver.play();
            showLine(w[0],w[1],w[2]);
        }
        
    })
}

//Game draw function
function checkDraw(){
    let empty=0;
    let boxetexts=document.querySelectorAll(".boxtext");
    if(!isGameOver){
      Array.from(boxetexts).forEach((boxtext)=>{
        if(boxtext.innerText==""){
            empty++;
        }
    })
    if(empty==0){
    turnInfo.innerText="Game is Draw!";
    isGameOver=true;
    gameOver.play();
    }
    }
    

}

// music.play();
//Game logic function
Array.from(boxes).forEach((box)=>{  
    let boxtext=box.querySelector("span");
    box.addEventListener("click",()=>{ 
    //if boxtext is empty
    if(boxtext.innerText==""){
    boxtext.innerText=turn;
    turn=turnChange(); 
    press.play();
    checkWin();
    checkDraw();
    if(!isGameOver){
     turnInfo.innerText="Turn for "+turn;
    }
}   
})
})


//reset click event handle
let reset=document.querySelector("#reset");
reset.addEventListener("click",()=>{
    Array.from(boxtexts).forEach((boxtext)=>{
        boxtext.innerText="";
    })
    turn="X";
    isGameOver=false;
    image.style.width="0";
    turnInfo.innerText="Turn for X";
    hideLine();
})

//Hide line function
function hideLine(){
    let line=document.querySelector(".line");
    line.style.width="0";
}

//Show line function
const winMap = {
    "0-1-2": { top: 16.66, left: 16.66, rotate: 0,width:66.66 },     // Top row
    "3-4-5": { top: 50, left: 16.66, rotate: 0,width:66.66 },    // Middle row
    "6-7-8": { top: 83.33, left: 16.66, rotate: 0,width:66.66 },    // Bottom row
    
    "0-3-6": { top: 16.66, left: 16.66, rotate: 90,width:66.66 }, // Left column
    "1-4-7": { top: 16.66, left: 50, rotate: 90 ,width:66.66},   // Middle column
    "2-5-8": { top: 16.66, left: 83.33, rotate: 90,width:66.66 },  // Right column

    "0-4-8": { top: 16.66, left: 16.66, rotate: 45,width:94.24 },   // Diagonal \
    "2-4-6": { top: 83.33, left: 16.66, rotate: -45,width:94.24 }   // Diagonal /
};


function showLine(i1, i2, i3) {
    const key = `${i1}-${i2}-${i3}`;
    const config = winMap[key];
    if (!config) return;

    const line = document.querySelector(".line");
    line.style.top = `${config.top}%`;
    line.style.left = `${config.left}%`;
    line.style.transform=`rotate(${config.rotate}deg)`;
    line.style.width=`${config.width}%`;
    line.style.display="block";
}
