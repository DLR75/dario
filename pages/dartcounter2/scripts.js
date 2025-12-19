// VARIABLES:
let gamemode;               //1=501do 2=501so 3=301do 4=301so 
let firstto = 1;
let numberofplayers;
let gamestate = "idle";

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
let player_1_average = "/";
let player_2_average = "/";
let player_3_average = "/";
let player_4_average = "/";
let player_1_lastscore;
let player_2_lastscore;
let player_3_lastscore;
let player_4_lastscore;
let player_1_thrown;                //number of darts thrown
let player_2_thrown;
let player_3_thrown;
let player_4_thrown;

let target;                         //required to win

//START-UP INSERT STARTING VARIABLES/RUNNING SCRIPTS
document.getElementById("firstto_current").innerText = `${firstto} legs`;

const gamemode_value = document.getElementById("gamemode_selector");

const firstto_prompt = document.getElementById("firstto_button");

const playernumber_value = document.getElementById("playernumber_selector");

updateGamemode();
updateNumberOfPlayers();
updateNumberOfScoreboards();
updatePlayerNames();
updatePlayerLegs();
updatePlayerAverage();


//EVENTLISTENERS:
gamemode_value.addEventListener("change", () => {
    updateGamemode();
});

firstto_prompt.addEventListener("click", () => {
    const firstto_value = prompt("Legs required to win:");

    firstto = firstto_value;
    document.getElementById("firstto_current").innerText = `${firstto} legs`;
});

playernumber_value.addEventListener("change", () => {
    numberofplayers = playernumber_value.value;
    numberofplayers = Number(numberofplayers);
    updateNumberOfScoreboards();
});



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
    console.log("target:", target);
}
function updateNumberOfPlayers () {
    numberofplayers = playernumber_value.value;
    numberofplayers = Number(numberofplayers);
}
function updateNumberOfScoreboards () {
    const scoreboards = document.querySelectorAll(".playerbox");

    scoreboards.forEach((el, index) => {
    el.style.display = index < numberofplayers ? "flex" : "none";
    });
}
function updatePlayerNames () {
    const select_player_1_name = document.querySelector("#player_1 .player_name");
    select_player_1_name.innerText = player_1_name;
    const select_player_2_name = document.querySelector("#player_2 .player_name");
    select_player_2_name.innerText = player_2_name;
    const select_player_3_name = document.querySelector("#player_3 .player_name");
    select_player_3_name.innerText = player_3_name;
    const select_player_4_name = document.querySelector("#player_4 .player_name");
    select_player_4_name.innerText = player_4_name;
}
function updatePlayerLegs () {
    const select_player_1_legs = document.querySelector("#player_1 .player_legs");
    select_player_1_legs.innerText = player_1_legs;
    const select_player_2_legs = document.querySelector("#player_2 .player_legs");
    select_player_2_legs.innerText = player_2_legs;
    const select_player_3_legs = document.querySelector("#player_3 .player_legs");
    select_player_3_legs.innerText = player_3_legs;
    const select_player_4_legs = document.querySelector("#player_4 .player_legs");
    select_player_4_legs.innerText = player_4_legs;
}
function updatePlayerRemainingScore () {
    const player_1_remaining_score = document.querySelector("#player_1 .player_score")
    player_1_remaining_score.innerText = player_1_remaining;
    const player_2_remaining_score = document.querySelector("#player_2 .player_score")
    player_2_remaining_score.innerText = player_2_remaining;
    const player_3_remaining_score = document.querySelector("#player_3 .player_score")
    player_3_remaining_score.innerText = player_3_remaining;
    const player_4_remaining_score = document.querySelector("#player_4 .player_score")
    player_4_remaining_score.innerText = player_4_remaining;
}
function updatePlayerAverage () {
    const select_player_1_average = document.querySelector("#player_1 .player_average");
    select_player_1_average.innerText = `Average: ${player_1_average}`;
    const select_player_2_average = document.querySelector("#player_2 .player_average");
    select_player_2_average.innerText = `Average: ${player_2_average}`;
    const select_player_3_average = document.querySelector("#player_3 .player_average");
    select_player_3_average.innerText = `Average: ${player_3_average}`;
    const select_player_4_average = document.querySelector("#player_4 .player_average");
    select_player_4_average.innerText = `Average: ${player_4_average}`;
}