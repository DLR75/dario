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

const gamemode_value = document.getElementById("gamemode_selector");
const startingplayermode = document.getElementById("startingplayer");

const addbot_selector = document.getElementById("addbot");
// Variables:
let firstto = 1;
let player_1_name = "Player 1";
let player_2_name = "Player 2";
let player_3_name = "Player 3";
let player_4_name = "Player 4";
let numberofplayers = numberofplayers_selector.value;
numberofplayers = Number(numberofplayers);
let bot = {
    present: false,
    average: 42,
    player: "p1",
};
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
function updateNumberOfScoreboards () {
    const scoreboards = document.querySelectorAll(".players_box");

    scoreboards.forEach((el, index) => {
    el.style.display = index < numberofplayers ? "flex" : "none";
    });
}
function startGame() {
    

    sessionStorage.setItem("gamemode", gamemode_value.value);
    sessionStorage.setItem("firstto", firstto);
    sessionStorage.setItem("numberofplayers", numberofplayers);
    sessionStorage.setItem("startingplayer", startingplayermode.value);
    sessionStorage.setItem("player_1_name", player_1_name);
    sessionStorage.setItem("player_2_name", player_2_name);
    sessionStorage.setItem("player_3_name", player_3_name);
    sessionStorage.setItem("player_4_name", player_4_name);
    sessionStorage.setItem("botpresent", bot.present);
    sessionStorage.setItem("botaverage", bot.average);
    sessionStorage.setItem("botplayer", bot.player);


    window.location.href = "pages/x01/x01.html";
}
// Event Listeners:
legs_minus_selector.addEventListener("click", () => {
    if (firstto > 1) {
        firstto = firstto - 1;
    } 
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
addbot_selector.addEventListener("click", () => {
    console.log("addbot");
    if (numberofplayers_selector.value < 4 && bot.present === false && gamemode_value.value == 1) {
        bot.average = prompt("Please enter the bots average");
        bot.present = true;
        numberofplayers = numberofplayers_selector.value;
        numberofplayers = Number(numberofplayers);
        numberofplayers = numberofplayers + 1;
        if (numberofplayers === 4) {
            player_4_name = `Bot ${bot.average}`;
            bot.player = "p4";
        } else if (numberofplayers === 3) {
            player_3_name = `Bot ${bot.average}`;
            bot.player = "p3";
        } else if (numberofplayers === 2) {
            player_2_name = `Bot ${bot.average}`;
            bot.player = "p2";
        }
        updatePlayerNames();
        updateNumberOfScoreboards();
    } else {
        alert("allready 4 players / bot present / not 501 do")
    }
})