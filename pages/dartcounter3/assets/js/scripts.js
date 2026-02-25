// DOM / Selectors
const legs_minus_selector = document.querySelector("#legs_minus");
const legs_plus_selector = document.querySelector("#legs_plus");

const player1_name_selector = document.querySelector("#player_1");
const player2_name_selector = document.querySelector("#player_2");
const player3_name_selector = document.querySelector("#player_3");
const player4_name_selector = document.querySelector("#player_4");

const numberofplayers_selector = document.getElementById("schieber");
const startgame_selector = document.querySelector("#startgame_button");
const legs_display = document.getElementById("legs_display");

// Variables:
let firstto = 1;
let player_1_name = "Player 1";
let player_2_name = "Player 2";
let player_3_name = "Player 3";
let player_4_name = "Player 4";
let numberofplayers = numberofplayers_selector.value;
numberofplayers = Number(numberofplayers);

// Startup:
updatePlayerNames();
updateNumberOfScoreboards();
updateFirstTo();

// Functions:
function updateFirstTo() {
    const legs_display = document.getElementById("legs_display");
    legs_display.innerText = firstto;
}
function updatePlayerNames () {
    const select_player_1_name = document.querySelector("#player_1");
    select_player_1_name.innerText = player_1_name;
    const select_player_2_name = document.querySelector("#player_2");
    select_player_2_name.innerText = player_2_name;
    const select_player_3_name = document.querySelector("#player_3");
    select_player_3_name.innerText = player_3_name;
    const select_player_4_name = document.querySelector("#player_4");
    select_player_4_name.innerText = player_4_name;
}
function startGame() {
    const gamemode_value = document.getElementById("gamemode_selector");
    const startingplayer = document.getElementById("startingplayer");
    // const numberofplayers = 4;

    // gamemode
    sessionStorage.setItem("gamemode", gamemode_value.value);
    // legs
    sessionStorage.setItem("firstto", firstto);
    // numberofplayers
    sessionStorage.setItem("numberofplayers", numberofplayers);
    // startingplayer
    sessionStorage.setItem("startingplayer", startingplayer.value);

    window.location.href = "pages/x01/x01.html";
}
function updateNumberOfScoreboards () {
    const scoreboards = document.querySelectorAll(".players_box");

    scoreboards.forEach((el, index) => {
    el.style.display = index < numberofplayers ? "flex" : "none";
    });
}
// Event Listeners:
legs_minus_selector.addEventListener("click", () => {
    firstto = firstto - 1;
    updateFirstTo();
})
legs_plus_selector.addEventListener("click", () => {
    firstto = firstto + 1;
    updateFirstTo();
})
numberofplayers_selector.addEventListener("change", () => {
    numberofplayers = numberofplayers_selector.value;
    numberofplayers = Number(numberofplayers);
    updateNumberOfScoreboards();
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
startgame_selector.addEventListener("click", () => {
    startGame();
})