let entry1 = document.querySelector("#entry1");
let entry2 = document.querySelector("#entry2");

let inp_x = document.querySelector("#inp_x");
let inp_o = document.querySelector("#inp_o");
let msgcontainer = document.querySelector(".msg");
let btns = document.querySelectorAll(".btn");
let writer = true;

// Disable game buttons initially
btns.forEach((btn) => (btn.disabled = true));

// Handle "Enter" buttons for players
entry1.addEventListener("click", () => {
    if (inp_x.value.trim() !== "") {
        inp_x.disabled = true;
        checkIfReady();
    }
});

entry2.addEventListener("click", () => {
    if (inp_o.value.trim() !== "") {
        inp_o.disabled = true;
        checkIfReady();
    }
});

// Check if both players have entered their names
function checkIfReady() {
    if (inp_x.value.trim() !== "" && inp_o.value.trim() !== "") {
        btns.forEach((btn) => (btn.disabled = false)); // Enable game buttons
        msgcontainer.innerText = `Next ${inp_x.value}'s Turn`; // Set initial message
    }
}

// Winner determination logic
function Winner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            btns[a].innerText !== "" &&
            btns[a].innerText === btns[b].innerText &&
            btns[a].innerText === btns[c].innerText
        ) {
            btns[a].style.backgroundColor = "lightgreen";
            btns[b].style.backgroundColor = "lightgreen";
            btns[c].style.backgroundColor = "lightgreen";

            msgcontainer.innerText = `${btns[a].innerText} Wins!`;
            btns.forEach((btn) => (btn.disabled = true)); // Disable all buttons
            return true;
        }
    }
    return false;
}

// Game button click logic
btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (writer) {
            msgcontainer.innerText = `Next ${inp_o.value}'s Turn`;
            btn.innerText = "X";
            writer = false;
        } else {
            msgcontainer.innerText = `Next ${inp_x.value}'s Turn`;
            btn.innerText = "O";
            writer = true;
        }
        btn.disabled = true;

        if (!Winner()) {
            if ([...btns].every((b) => b.innerText !== "")) {
                msgcontainer.innerText = "It's a Draw!";
            }
        }
    });
});

// Restart button logic
document.querySelector("#resetbtn").addEventListener("click", () => {
    btns.forEach((btn) => {
        btn.innerText = "";
        btn.disabled = false;
        btn.style.backgroundColor = "";
    });
    msgcontainer.innerText = "";
    writer = true;
});

// New Game button logic
document.querySelector("#newGamebtn").addEventListener("click", () => {
    document.querySelector("#resetbtn").click();
    inp_x.value = "";
    inp_o.value = "";
    inp_x.disabled = false;
    inp_o.disabled = false;
    btns.forEach((btn) => (btn.disabled = true)); // Disable game buttons
    msgcontainer.innerText = "New Game Started! Enter player names.";
});
