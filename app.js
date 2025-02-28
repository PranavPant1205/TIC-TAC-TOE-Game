let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let newGamebtn = document.querySelector("#newbtn");
let winContainer = document.querySelector(".win-container");
let result = document.querySelector("#result");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetgame = () => {
    turnO = true;
    enableBoxes();
    winContainer.classList.add("hide");
    newGamebtn.classList.remove("show"); 
    count = 0; 
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    });
});

const disbaleBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (Winner) => {
    if (Winner) {
        result.innerText = `Congratulations, ${Winner} is the winner`;
    } else {
        result.innerText = `It's a draw!`;
    }
    winContainer.classList.remove("hide");
    disbaleBoxes();
    newGamebtn.classList.add("show"); 
};

const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("Winner", pos1);
                showWinner(pos1);
                winnerFound = true;
                break;
            }
        }
    }
    if (!winnerFound && count === 9) {
        showWinner(null); 
    }
};

newGamebtn.addEventListener("click", resetgame);
resetBtn.addEventListener("click", resetgame);