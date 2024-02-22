let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");
let turnO = true; //playerX, playerO


const resetGame = ()=>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turnO){
            box.innerHTML = "<span class='o'>O</span>";
            turnO = false;
        }
        else{
            box.innerText="X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    })
})

const disableBoxes = ()=>{
    for(box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = ()=>{
    for(box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}

const showWinner = (winner, isWinner) => {
    msg.innerText = isWinner ? `Congratulations, Winner is ${winner} 🍾` : "It's a draw!";
    if (isWinner) {
        startCelebration();
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
}

 const checkWinner = () => {
    let draw = true;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, true);
                return; 
            }
        }
    }

    // Check for draw
    for (let box of boxes) {
        if (box.innerText === "") {
            draw = false;
            break;
        }
    }

    // If all boxes are filled and there's no winner, it's a draw
    if (draw) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        showWinner(null, false);
        disableBoxes();
        return; // Exit function
    }
}
 newGameBtn.addEventListener("click", resetGame);
 resetBtn.addEventListener("click", resetGame);


 // Function to start celebration animation
function startCelebration() {
    const celebrationContainer = document.getElementById('celebration-container');
    celebrationContainer.style.display = 'block';
  
    // Create confetti elements
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
      celebrationContainer.appendChild(confetti);
    }
  }
  
  // Function to get a random color for confetti
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }