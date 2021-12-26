let player = "X";
let score={x:0,o:0}
const wincom = [
    [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
  ];

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});
startgame();
function handleClick(e) {
  if (e.target.innerHTML === "") {
    e.target.innerHTML = player;
    checkwin();
    checkdraw();
    switchPlayer();
    
  }
}

function checkdraw(){
   
    const cellArray=Array.from(cells);
    if(cellArray.every(cell=>cell.innerText!="")){
        alert("Match Draw!!!")
        startgame();
    }
}
function startgame(){
    const marksA=document.getElementById('scoreX');
    const marksB=document.getElementById("scoreO");
    marksA.innerText=`Scores of player X is ${score.x}`
    marksB.innerText=`Scores of player O is ${score.o}`
    cells.forEach(cell=>cell.innerText="");
}
function checkwin() {


  const matched = wincom.some((comb) =>
    comb.every((ci) => cells[ci].innerText === player)
  );
  
  if (matched) {
    alert(`player ${player} won the game`);
    if(player==='X'){
        score.x+=1;
    }
    if(player==='O'){
        score.o+=1;
    }
    startgame()
  }
}
function switchPlayer() {
  player = player === "X" ? "O" : "X";
}
