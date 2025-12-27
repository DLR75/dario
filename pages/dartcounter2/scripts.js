//DOM / SELECTORS:
const gamemode_value = document.getElementById("gamemode_selector");
const firstto_prompt = document.getElementById("firstto_button");
const playernumber_value = document.getElementById("playernumber_selector");
const startgame_click = document.getElementById("startbutton");
const get_input_display = document.getElementById("inputdisplay");
const plate_1 = document.getElementById("plate_1");
const plate_2 = document.getElementById("plate_2");
const plate_3 = document.getElementById("plate_3");
const plate_4 = document.getElementById("plate_4");
const plate_5 = document.getElementById("plate_5");
const plate_6 = document.getElementById("plate_6");
const plate_7 = document.getElementById("plate_7");
const plate_8 = document.getElementById("plate_8");
const plate_9 = document.getElementById("plate_9");
const plate_plus = document.getElementById("plate_plus");
const plate_0 = document.getElementById("plate_0");
const plate_score = document.getElementById("plate_score");
const plate_delete = document.getElementById("plate_delete");

const player1_name_selector = document.querySelector("#player_1 .player_name");
const player2_name_selector = document.querySelector("#player_2 .player_name");
const player3_name_selector = document.querySelector("#player_3 .player_name");
const player4_name_selector = document.querySelector("#player_4 .player_name");

const player1_selector = document.querySelector("#player_1");
const player1_legs_selector = document.querySelector("#player_1 .player_legs");
const player1_average_selector = document.querySelector("#player_1 .player_average");
const player1_lastscore_selector = document.querySelector("#player_1 .player_lastscore");
const player2_selector = document.querySelector("#player_2");
const player2_legs_selector = document.querySelector("#player_2 .player_legs");
const player2_average_selector = document.querySelector("#player_2 .player_average");
const player2_lastscore_selector = document.querySelector("#player_2 .player_lastscore");
const player3_selector = document.querySelector("#player_3");
const player3_legs_selector = document.querySelector("#player_3 .player_legs");
const player3_average_selector = document.querySelector("#player_3 .player_average");
const player3_lastscore_selector = document.querySelector("#player_3 .player_lastscore");
const player4_selector = document.querySelector("#player_4");
const player4_legs_selector = document.querySelector("#player_4 .player_legs");
const player4_average_selector = document.querySelector("#player_4 .player_average");
const player4_lastscore_selector = document.querySelector("#player_4 .player_lastscore");

// VARIABLES:
let gamemode;               //1=501do 2=501so 3=301do 4=301so 
let firstto = 1;
let numberofplayers;

let player_1_name = "Player 1";
let player_2_name = "Player 2";
let player_3_name = "Player 3";
let player_4_name = "Player 4";
let player_1_legs = 0;
let player_2_legs = 0;
let player_3_legs = 0;
let player_4_legs = 0;
let player_1_remaining;
let player_2_remaining;
let player_3_remaining;
let player_4_remaining;
let player_1_average = 0;
let player_2_average = 0;
let player_3_average = 0;
let player_4_average = 0;
let player_1_lastscore = "/";
let player_2_lastscore = "/";
let player_3_lastscore = "/";
let player_4_lastscore = "/";
let player_1_thrown = 0;                //number of darts thrown
let player_2_thrown = 0;
let player_3_thrown = 0;
let player_4_thrown = 0;
let player_1_sum = 0;                   //for average calculation
let player_2_sum = 0; 
let player_3_sum = 0; 
let player_4_sum = 0; 

let target;                         //required to win

let input_display;      //inputline content for scoring
let input;              //button output
let score;
let scorestring;

let activeplayer = 0;
let startingplayer = 1;


//START-UP INSERT FIRST VARIABLES / RUNNING SCRIPTS
document.getElementById("firstto_current").innerText = `${firstto} legs`;

updateGamemode();
updateNumberOfPlayers();
updateNumberOfScoreboards();
updatePlayerNames();
updatePlayerLegs();
updatePlayerLastscore();

player1_selector.classList.add(`passive`);
player1_legs_selector.classList.add(`passive`);
player1_average_selector.classList.add(`passive`);
player1_lastscore_selector.classList.add(`passive`);
player2_selector.classList.add(`passive`);
player2_legs_selector.classList.add(`passive`);
player2_average_selector.classList.add(`passive`);
player2_lastscore_selector.classList.add(`passive`);
player3_selector.classList.add(`passive`);
player3_legs_selector.classList.add(`passive`);
player3_average_selector.classList.add(`passive`);
player3_lastscore_selector.classList.add(`passive`);
player4_selector.classList.add(`passive`);
player4_legs_selector.classList.add(`passive`);
player4_average_selector.classList.add(`passive`);
player4_lastscore_selector.classList.add(`passive`);

//FUNCTIONS:
function updateGamemode () {
    gamemode = gamemode_value.value;
    gamemode = Number(gamemode);
    if (gamemode === 1 || gamemode === 2) {
        target = 501;
    } else {
        target = 301;
    }
    player_1_remaining = target;
    player_2_remaining = target;
    player_3_remaining = target;
    player_4_remaining = target;
    updatePlayerRemainingScore();
} function updateNumberOfPlayers () {
    numberofplayers = playernumber_value.value;
    numberofplayers = Number(numberofplayers);
} function updateNumberOfScoreboards () {
    const scoreboards = document.querySelectorAll(".playerbox");

    scoreboards.forEach((el, index) => {
    el.style.display = index < numberofplayers ? "flex" : "none";
    });
} function updatePlayerNames () {
    const select_player_1_name = document.querySelector("#player_1 .player_name");
    select_player_1_name.innerText = player_1_name;
    const select_player_2_name = document.querySelector("#player_2 .player_name");
    select_player_2_name.innerText = player_2_name;
    const select_player_3_name = document.querySelector("#player_3 .player_name");
    select_player_3_name.innerText = player_3_name;
    const select_player_4_name = document.querySelector("#player_4 .player_name");
    select_player_4_name.innerText = player_4_name;
} function updatePlayerLegs () {
    console.log("running updatePlayerLegs");
    const select_player_1_legs = document.querySelector("#player_1 .player_legs");
    select_player_1_legs.innerText = player_1_legs;
    const select_player_2_legs = document.querySelector("#player_2 .player_legs");
    select_player_2_legs.innerText = player_2_legs;
    const select_player_3_legs = document.querySelector("#player_3 .player_legs");
    select_player_3_legs.innerText = player_3_legs;
    const select_player_4_legs = document.querySelector("#player_4 .player_legs");
    select_player_4_legs.innerText = player_4_legs;
    
} function updatePlayerRemainingScore () {
    const player_1_remaining_score = document.querySelector("#player_1 .player_score")
    player_1_remaining_score.innerText = player_1_remaining;
    const player_2_remaining_score = document.querySelector("#player_2 .player_score")
    player_2_remaining_score.innerText = player_2_remaining;
    const player_3_remaining_score = document.querySelector("#player_3 .player_score")
    player_3_remaining_score.innerText = player_3_remaining;
    const player_4_remaining_score = document.querySelector("#player_4 .player_score")
    player_4_remaining_score.innerText = player_4_remaining;
    
} function updatePlayerAverage () {
    if (numberofplayers >= 3) {
        const select_player_1_average = document.querySelector("#player_1 .player_average");
        select_player_1_average.innerText = `Avg: ${player_1_average.toFixed(2)}`;
        const select_player_2_average = document.querySelector("#player_2 .player_average");
        select_player_2_average.innerText = `Avg: ${player_2_average.toFixed(2)}`;
        const select_player_3_average = document.querySelector("#player_3 .player_average");
        select_player_3_average.innerText = `Avg: ${player_3_average.toFixed(2)}`;
        const select_player_4_average = document.querySelector("#player_4 .player_average");
        select_player_4_average.innerText = `Avg: ${player_4_average.toFixed(2)}`;
    } else {
        const select_player_1_average = document.querySelector("#player_1 .player_average");
        select_player_1_average.innerText = `Average: ${player_1_average.toFixed(2)}`;
        const select_player_2_average = document.querySelector("#player_2 .player_average");
        select_player_2_average.innerText = `Average: ${player_2_average.toFixed(2)}`;
        const select_player_3_average = document.querySelector("#player_3 .player_average");
        select_player_3_average.innerText = `Average: ${player_3_average.toFixed(2)}`;
        const select_player_4_average = document.querySelector("#player_4 .player_average");
        select_player_4_average.innerText = `Average: ${player_4_average.toFixed(2)}`;
    }
} function updatePlayerLastscore () {
    if (numberofplayers >= 3) {
        const select_player_1_lastscore = document.querySelector("#player_1 .player_lastscore");
        select_player_1_lastscore.innerText = `Ls: ${player_1_lastscore}`;
        const select_player_2_lastscore = document.querySelector("#player_2 .player_lastscore");
        select_player_2_lastscore.innerText = `Ls: ${player_2_lastscore}`;
        const select_player_3_lastscore = document.querySelector("#player_3 .player_lastscore");
        select_player_3_lastscore.innerText = `Ls: ${player_3_lastscore}`;
        const select_player_4_lastscore = document.querySelector("#player_4 .player_lastscore");
        select_player_4_lastscore.innerText = `Ls: ${player_4_lastscore}`;
    } else {
        const select_player_1_lastscore = document.querySelector("#player_1 .player_lastscore");
        select_player_1_lastscore.innerText = `Last score: ${player_1_lastscore}`;
        const select_player_2_lastscore = document.querySelector("#player_2 .player_lastscore");
        select_player_2_lastscore.innerText = `Last score: ${player_2_lastscore}`;
        const select_player_3_lastscore = document.querySelector("#player_3 .player_lastscore");
        select_player_3_lastscore.innerText = `Last score: ${player_3_lastscore}`;
        const select_player_4_lastscore = document.querySelector("#player_4 .player_lastscore");
        select_player_4_lastscore.innerText = `Last score: ${player_4_lastscore}`;
    }
    
}
function startGame () {
    console.log("running startGame");
    player_1_legs = 0;
    player_2_legs = 0;
    player_3_legs = 0;
    player_4_legs = 0;
    player_1_average = 0;
    player_2_average = 0;
    player_3_average = 0;
    player_4_average = 0;
    player_1_lastscore = "/";
    player_2_lastscore = "/";
    player_3_lastscore = "/";
    player_4_lastscore = "/";
    player_1_thrown = 0;
    player_2_thrown = 0;
    player_3_thrown = 0;
    player_4_thrown = 0;
    player_1_remaining = target;
    player_2_remaining = target;
    player_3_remaining = target;
    player_4_remaining = target;
    updatePlayerLegs();
    updatePlayerAverage();
    updatePlayerLastscore();
    updatePlayerRemainingScore();
    input = undefined;
    activeplayer = 1;
    switchActivityPlayer1();
}
function combineInputs (input) {
    input = String(input);
    if (scorestring === undefined) {
        scorestring = input;
    } else {
        scorestring = scorestring + input;
    }
    get_input_display.innerText = scorestring;
}
function calculateScore () {
    score = scorestring;
    score = score.split("+");
    score = score.map(Number);
    score = score.reduce((a,b) => a + b, 0);

    
    input = undefined;
    input_display = undefined;
    get_input_display.innerText = "";
    scorestring = undefined;

    checkScore();
}
function checkScore () {
    if (score > 180) {
        alert("impossible");
    } else if (score === 42) {
        alert("the answer");
        applyScore();
    } else if ( score === 69) {
        alert("nice");
        applyScore();
    } else {
        applyScore();
    }
}
function applyScore () {
    if (activeplayer === 1) {
        player_1_remaining = player_1_remaining-score;
        if (player_1_remaining > 0) {
            updatePlayerRemainingScore();
            changeAverage();
            changeLastscore();
            nextPlayer();
        } else if (player_1_remaining === 0) {
            updatePlayerRemainingScore();
            console.log("leg won");
            changeAverage();
            changeLastscore();
            addLeg();
        } else {
            player_1_remaining = player_1_remaining+score;
            alert("to much");
            console.log("tomuch");
            score = 0;
            changeAverage();
            changeLastscore();
            nextPlayer();
        }
    } else if (activeplayer === 2) {
        player_2_remaining = player_2_remaining-score;
        if (player_2_remaining > 0) {
            updatePlayerRemainingScore();
            changeAverage();
            changeLastscore();
            nextPlayer();
        } else if (player_2_remaining === 0) {
            updatePlayerRemainingScore();
            console.log("leg won");
            changeAverage();
            changeLastscore();
            addLeg();
        } else {
            player_2_remaining = player_2_remaining+score;
            alert("to much");
            console.log("tomuch");
            score = 0;
            changeAverage();
            changeLastscore();
            nextPlayer();
        }
    } else if (activeplayer === 3) {
        player_3_remaining = player_3_remaining-score;
        if (player_3_remaining > 0) {
            updatePlayerRemainingScore();
            changeAverage();
            changeLastscore();
            nextPlayer();
        } else if (player_3_remaining === 0) {
            updatePlayerRemainingScore();
            console.log("leg won");
            changeAverage();
            changeLastscore();
            addLeg();
        } else {
            player_3_remaining = player_3_remaining+score;
            alert("to much");
            console.log("tomuch");
            score = 0;
            changeAverage();
            changeLastscore();
            nextPlayer();
        }    
    } else if (activeplayer === 4) {
        player_4_remaining = player_4_remaining-score;
        if (player_4_remaining > 0) {
            updatePlayerRemainingScore();
            changeAverage();
            changeLastscore();
            nextPlayer();
        } else if (player_4_remaining === 0) {
            updatePlayerRemainingScore();
            console.log("leg won");
            changeAverage();
            changeLastscore();
            addLeg();
        } else {
            player_4_remaining = player_4_remaining+score;
            alert("to much");
            console.log("tomuch");
            score = 0;
            changeAverage();
            changeLastscore();
            nextPlayer();
        }
    }
    displayScore();
    score = undefined;
}
function deleteInputs () {
    scorestring = scorestring.slice(0, -1);
    get_input_display.innerText = scorestring;
}
function nextPlayer () {
    if (numberofplayers === 1) {
        activeplayer = 1;
    } else if (numberofplayers === 2) {
        if (activeplayer === 1) {
            switchActivityPlayer1();
            activeplayer = 2;
            switchActivityPlayer2();
        } else if (activeplayer === 2) {
            switchActivityPlayer2();
            activeplayer = 1;
            switchActivityPlayer1();
        }
    } else if (numberofplayers === 3) {
        if (activeplayer === 1) {
            switchActivityPlayer1();
            activeplayer = 2;
            switchActivityPlayer2();
        } else if (activeplayer === 2) {
            switchActivityPlayer2();
            activeplayer = 3;
            switchActivityPlayer3();
        } else if (activeplayer === 3) {
            switchActivityPlayer3();
            activeplayer = 1;
            switchActivityPlayer1();
        }
    } else if (numberofplayers === 4) {
        if (activeplayer === 1) {
            switchActivityPlayer1();
            activeplayer = 2;
            switchActivityPlayer2();
        } else if (activeplayer === 2) {
            switchActivityPlayer2();
            activeplayer = 3;
            switchActivityPlayer3();
        } else if (activeplayer === 3) {
            switchActivityPlayer3();
            activeplayer = 4;
            switchActivityPlayer4();
        } else if (activeplayer === 4) {
            switchActivityPlayer4();
            activeplayer = 1;
            switchActivityPlayer1();
        }
    }
}
function addLeg () {
    console.log("running addLeg");
    if (activeplayer === 1) {
        ++player_1_legs;
        console.log("player 1 now has",player_1_legs,"legs")
    } else if (activeplayer === 2) {
        ++player_2_legs;
        console.log("player 2 now has",player_2_legs,"legs")
    } else if (activeplayer === 3) {
        ++player_3_legs;
        console.log("player 3 now has",player_3_legs,"legs")
    } else if (activeplayer === 4) {
        ++player_4_legs;
        console.log("player 4 now has",player_4_legs,"legs")
    }
    updatePlayerLegs();
    checkLegWin();
}
function checkLegWin () {
    console.log("running checkLegWin");
    console.log("firstto:",firstto, typeof firstto);
    console.log("player1legs:", player_1_legs, typeof player_1_legs);
    if (firstto === player_1_legs) {
        console.log("Player 1 wins the game with", player_1_legs," legs");
    } else if (firstto === player_2_legs) {
        console.log("Player 2 wins the game with", player_2_legs," legs");
    } else if (firstto === player_3_legs) {
        console.log("Player 3 wins the game with", player_3_legs," legs");
    } else if (firstto === player_4_legs) {
        console.log("Player 4 wins the game with", player_4_legs," legs");
    } else {
        nextPlayer();
        startNextLeg();
    }
}
function startNextLeg() {
    console.log("running StartNextLeg");
    player_1_lastscore = "/";
    player_2_lastscore = "/";
    player_3_lastscore = "/";
    player_4_lastscore = "/";
    player_1_remaining = target;
    player_2_remaining = target;
    player_3_remaining = target;
    player_4_remaining = target;
    updatePlayerRemainingScore();
    updatePlayerLastscore();
    input = undefined;
    determinStartingplayer();
}
function determinStartingplayer () {
    console.log("running determineStartingplayer");
    if (numberofplayers === 1) {
        startingplayer = 1;
    } else if (numberofplayers === 2) {
        if (startingplayer === 1) {
            startingplayer = 2;
        } else if (startingplayer === 2) {
            startingplayer = 1;
        }
    } else if (numberofplayers === 3) {
        if (startingplayer === 1) {
            startingplayer = 2;
        } else if (startingplayer === 2) {
            startingplayer = 3;
        } else if (startingplayer === 3) {
            startingplayer = 1;
        }
    } else if (numberofplayers === 4) {
        if (startingplayer === 1) {
            startingplayer = 2;
        } else if (startingplayer === 2) {
            startingplayer = 3;
        } else if (startingplayer === 3) {
            startingplayer = 4;
        } else if (startingplayer === 4) {
            startingplayer = 1;
        }
    }
    activeplayer = startingplayer;
    console.log("startingplayer:", activeplayer);
}
function changeAverage () {
    if (activeplayer === 1) {
        ++player_1_thrown;
        player_1_sum = player_1_sum + score;
        player_1_average = player_1_sum / player_1_thrown;
    } else if (activeplayer === 2) {
        ++player_2_thrown;
        player_2_sum = player_2_sum + score;
        player_2_average = player_2_sum / player_2_thrown;
    } else if (activeplayer === 3) {
        ++player_3_thrown;
        player_3_sum = player_3_sum + score;
        player_3_average = player_3_sum / player_3_thrown;   
    } else if (activeplayer === 4) {
        ++player_1_thrown;
        player_4_sum = player_1_sum + score;
        player_4_average = player_4_sum / player_4_thrown;
    }
    updatePlayerAverage();
}
function changeLastscore () {
    if (activeplayer === 1) {
        player_1_lastscore = score;
    } else if (activeplayer === 2) {
        player_2_lastscore = score;
    } else if (activeplayer === 3) {
        player_3_lastscore = score;   
    } else if (activeplayer === 4) {
        player_4_lastscore = score;
    }
    updatePlayerLastscore();
}
function switchActivityPlayer1 () {
    if (player1_selector.classList.contains("active")) {
        player1_selector.classList.remove(`active`);
        player1_legs_selector.classList.remove(`active`);
        player1_average_selector.classList.remove(`active`);
        player1_lastscore_selector.classList.remove(`active`);

        player1_selector.classList.add(`passive`);
        player1_legs_selector.classList.add(`passive`);
        player1_average_selector.classList.add(`passive`);
        player1_lastscore_selector.classList.add(`passive`);
    } else {
        player1_selector.classList.remove(`passive`);
        player1_legs_selector.classList.remove(`passive`);
        player1_average_selector.classList.remove(`passive`);
        player1_lastscore_selector.classList.remove(`passive`);

        player1_selector.classList.add(`active`);
        player1_legs_selector.classList.add(`active`);
        player1_average_selector.classList.add(`active`);
        player1_lastscore_selector.classList.add(`active`);
    }
} function switchActivityPlayer2 () {
    if (player2_selector.classList.contains("active")) {
        player2_selector.classList.remove(`active`);
        player2_legs_selector.classList.remove(`active`);
        player2_average_selector.classList.remove(`active`);
        player2_lastscore_selector.classList.remove(`active`);

        player2_selector.classList.add(`passive`);
        player2_legs_selector.classList.add(`passive`);
        player2_average_selector.classList.add(`passive`);
        player2_lastscore_selector.classList.add(`passive`);
    } else {
        player2_selector.classList.remove(`passive`);
        player2_legs_selector.classList.remove(`passive`);
        player2_average_selector.classList.remove(`passive`);
        player2_lastscore_selector.classList.remove(`passive`);

        player2_selector.classList.add(`active`);
        player2_legs_selector.classList.add(`active`);
        player2_average_selector.classList.add(`active`);
        player2_lastscore_selector.classList.add(`active`);
    }
} function switchActivityPlayer3 () {
    if (player3_selector.classList.contains("active")) {
        player3_selector.classList.remove(`active`);
        player3_legs_selector.classList.remove(`active`);
        player3_average_selector.classList.remove(`active`);
        player3_lastscore_selector.classList.remove(`active`);

        player3_selector.classList.add(`passive`);
        player3_legs_selector.classList.add(`passive`);
        player3_average_selector.classList.add(`passive`);
        player3_lastscore_selector.classList.add(`passive`);
    } else {
        player3_selector.classList.remove(`passive`);
        player3_legs_selector.classList.remove(`passive`);
        player3_average_selector.classList.remove(`passive`);
        player3_lastscore_selector.classList.remove(`passive`);

        player3_selector.classList.add(`active`);
        player3_legs_selector.classList.add(`active`);
        player3_average_selector.classList.add(`active`);
        player3_lastscore_selector.classList.add(`active`);
    }
} function switchActivityPlayer4 () {
    if (player4_selector.classList.contains("active")) {
        player4_selector.classList.remove(`active`);
        player4_legs_selector.classList.remove(`active`);
        player4_average_selector.classList.remove(`active`);
        player4_lastscore_selector.classList.remove(`active`);

        player4_selector.classList.add(`passive`);
        player4_legs_selector.classList.add(`passive`);
        player4_average_selector.classList.add(`passive`);
        player4_lastscore_selector.classList.add(`passive`);
    } else {
        player4_selector.classList.remove(`passive`);
        player4_legs_selector.classList.remove(`passive`);
        player4_average_selector.classList.remove(`passive`);
        player4_lastscore_selector.classList.remove(`passive`);

        player4_selector.classList.add(`active`);
        player4_legs_selector.classList.add(`active`);
        player4_average_selector.classList.add(`active`);
        player4_lastscore_selector.classList.add(`active`);
    }
}
function displayScore () {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    async function showMessage() {
        const overlay_message = document.getElementById("overlay_message");

        overlay_message.textContent = score;
        document.getElementById("overlay_message").classList.add("grow");
        await sleep(2000);
        overlay_message.textContent = "";
    }

    showMessage();
}

//EVENTLISTENERS:
gamemode_value.addEventListener("change", () => {
    updateGamemode();
});
firstto_prompt.addEventListener("click", () => {
    const firstto_value = prompt("Legs required to win:");

    firstto = firstto_value;
    firstto = Number(firstto)
    document.getElementById("firstto_current").innerText = `${firstto} legs`;
});
playernumber_value.addEventListener("change", () => {
    numberofplayers = playernumber_value.value;
    numberofplayers = Number(numberofplayers);
    updateNumberOfScoreboards();
    updatePlayerAverage();
    updatePlayerLastscore();
});
startgame_click.addEventListener("click", () => {
    startGame();
});

plate_1.addEventListener("click", () => {
    input = "1";
    combineInputs (input);
});
plate_2.addEventListener("click", () => {
    input = "2";
    combineInputs (input);
});
plate_3.addEventListener("click", () => {
    input = "3";
    combineInputs (input);
});
plate_4.addEventListener("click", () => {
    input = "4";
    combineInputs (input);
});
plate_5.addEventListener("click", () => {
    input = "5";
    combineInputs (input);
});
plate_6.addEventListener("click", () => {
    input = "6";
    combineInputs (input);
});
plate_7.addEventListener("click", () => {
    input = "7";
    combineInputs (input);
});
plate_8.addEventListener("click", () => {
    input = "8";
    combineInputs (input);
});
plate_9.addEventListener("click", () => {
    input = "9";
    combineInputs (input);
});
plate_plus.addEventListener("click", () => {
    input = "+";
    combineInputs (input);
});
plate_0.addEventListener("click", () => {
    input = "0";
    combineInputs (input);
});
plate_score.addEventListener("click", () => {
    calculateScore();
});
plate_delete.addEventListener("click", () => {
    deleteInputs();
});

player1_name_selector.addEventListener("click", () => {
    player_1_name = prompt("What´s your name?");
    updatePlayerNames();
})
player2_name_selector.addEventListener("click", () => {
    player_2_name = prompt("What´s your name?");
    updatePlayerNames();
})
player3_name_selector.addEventListener("click", () => {
    player_3_name = prompt("What´s your name?");
    updatePlayerNames();
})
player4_name_selector.addEventListener("click", () => {
    player_4_name = prompt("What´s your name?");
    updatePlayerNames();
})

