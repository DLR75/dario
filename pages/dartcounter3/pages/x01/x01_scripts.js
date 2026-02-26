//DOM / Selectors
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

// Variables:
let gamemode;
let firstto;
let numberofplayers;
let startingplayermode;

let startingplayer;

let p1 = {
    name: "",
    remaining: 999,
    average: 0,
    lastscore: 0,
    legs: 0,
    active: false,
}
let p2 = {
    name: "",
    remaining: 999,
    average: 0,
    lastscore: 0,
    legs: 0,
    active: false,
}
let p3 = {
    name: "",
    remaining: 999,
    average: 0,
    lastscore: 0,
    legs: 0,
    active: false,
}
let p4 = {
    name: "",
    remaining: 999,
    average: 0,
    lastscore: 0,
    legs: 0,
    active: false,
}

// Startup:
function domStart () {
    if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", importSessionStorage());
    } else {
    // `DOMContentLoaded` has already fired
    importSessionStorage();
    }
}
function importSessionStorage () {
    gamemode = sessionStorage.getItem("gamemode");
    firstto = sessionStorage.getItem("firstto");
    numberofplayers = sessionStorage.getItem("numberofplayers");
    startingplayermode = sessionStorage.getItem("startingplayer");
    p1.name = sessionStorage.getItem("player_1_name");
    p2.name = sessionStorage.getItem("player_2_name");
    p3.name = sessionStorage.getItem("player_3_name");
    p4.name = sessionStorage.getItem("player_4_name");
    gamemode = Number(gamemode);
    firstto = Number(firstto);
    numberofplayers = Number(numberofplayers);

    // logSessionStorage();
    figureOut();
}   function logSessionStorage () {
    console.log("gamemode:", gamemode);
    console.log("first to:", firstto, "legs");
    console.log("numberofplayers:", numberofplayers);
    console.log("startingplayer:", startingplayermode);
    console.log("Player 1:", p1.name);
    console.log("Player 2:", p2.name);
    console.log("Player 3:", p3.name);
    console.log("Player 4:", p4.name);
}
function figureOut () {
    figureOutNumberofPlayers();
    figureOutGamemode();
    figureOutStartPlayer();

    update();
}
function update () {
    updatePlayerNames();
    updatePlayerLegs();
    updatePlayerRemainingScore();
    updatePlayerAverage();
    updatePlayerLastscore();
}

domStart();

// Functions:
function figureOutNumberofPlayers () {
    const scoreboards = document.querySelectorAll(".playerbox");

    scoreboards.forEach((el, index) => {
    el.style.display = index < numberofplayers ? "flex" : "none";
    });
}
function figureOutGamemode () {
    if (gamemode === 1 || gamemode === 2) {
        target = 501;
    } else {
        target = 301;
    }
    p1.remaining = target;
    p2.remaining = target;
    p3.remaining = target;
    p4.remaining = target;
}
function figureOutStartPlayer () {
    if (startingplayermode === "Random") {
        pickRandomPlayer();
    } else if (startingplayermode === "Bull") {
        openBullPopup();
    } else if (startingplayermode === "P1") {
        selectStartingPlayer(1);
    } else if (startingplayermode === "P2") {
        selectStartingPlayer(2);
    } else if (startingplayermode === "P3") {
        selectStartingPlayer(3);
    } else if (startingplayermode === "P4") {
        selectStartingPlayer(4);
    }
}
function pickRandomPlayer () {
    let pick = Math.floor(Math.random() * numberofplayers) +1;
    selectStartingPlayer(pick);
}
function openBullPopup () {
    document.getElementById("popup").style.display="flex";
}   function closeBullPopup () {
    document.getElementById("popup").style.display="none";
}   function bullPopupWinner (winner) {
    console.log("Winner", winner);
    closeBullPopup ();
    selectStartingPlayer (winner);
}
function selectStartingPlayer (winner) {
    if (winner === 1) {
        console.log("P1 active");
        p1.active = true;
    } else if (winner === 2) {
        console.log("P2 active");
        p2.active = true;
    } else if (winner === 3) {
        console.log("P3 active");
        p3.active = true;
    } else if (winner === 4) {
        console.log("P4 active");
        p4.active = true;
    }
    checkActivity(p1);
    checkActivity(p2);
    checkActivity(p3);
    checkActivity(p4);
}
function checkActivity (n) {
    if (n.active === true) {
        console.log("active = true");
        activate(n);
    } else if (n.active === false) {
        console.log("active = false");
        deactivate(n);
    }
}
function activate(player) {
    console.log("run activate", player);
    if (player === p1) {
        w = player1_selector;
        x = player1_legs_selector;
        y = player1_average_selector;
        z = player1_lastscore_selector;
    } else if (player === p2) {
        w = player2_selector;
        x = player2_legs_selector;
        y = player2_average_selector;
        z = player2_lastscore_selector;
    } else if (player === p3) {
        w = player3_selector;
        x = player3_legs_selector;
        y = player3_average_selector;
        z = player3_lastscore_selector;
    } else if (player === p4) {
        w = player4_selector;
        x = player4_legs_selector;
        y = player4_average_selector;
        z = player4_lastscore_selector;
    }

    w.classList.remove("passive");
    w.classList.add("active");
    x.classList.remove("passive");
    x.classList.add("active");
    y.classList.remove("passive");
    y.classList.add("active");
    z.classList.remove("passive");
    z.classList.add("active");
}
function deactivate(player) {
    console.log("run deactivate", player);
    if (player === p1) {
        w = player1_selector;
        x = player1_legs_selector;
        y = player1_average_selector;
        z = player1_lastscore_selector;
    } else if (player === p2) {
        w = player2_selector;
        x = player2_legs_selector;
        y = player2_average_selector;
        z = player2_lastscore_selector;
    } else if (player === p3) {
        w = player3_selector;
        x = player3_legs_selector;
        y = player3_average_selector;
        z = player3_lastscore_selector;
    } else if (player === p4) {
        w = player4_selector;
        x = player4_legs_selector;
        y = player4_average_selector;
        z = player4_lastscore_selector;
    }

    w.classList.remove("active");
    w.classList.add("passive");
    x.classList.remove("active");
    x.classList.add("passive");
    y.classList.remove("active");
    y.classList.add("passive");
    z.classList.remove("active");
    z.classList.add("passive");
}



function updatePlayerNames () {
    const select_player_1_name = document.querySelector("#player_1 .player_name");
    select_player_1_name.innerText = p1.name;
    const select_player_2_name = document.querySelector("#player_2 .player_name");
    select_player_2_name.innerText = p2.name;
    const select_player_3_name = document.querySelector("#player_3 .player_name");
    select_player_3_name.innerText = p3.name;
    const select_player_4_name = document.querySelector("#player_4 .player_name");
    select_player_4_name.innerText = p4.name;
}
function updatePlayerLegs () {
    const sp1 = document.querySelector("#player_1 .player_legs");
    sp1.innerText = p1.legs;
    const sp2 = document.querySelector("#player_2 .player_legs");
    sp2.innerText = p2.legs;
    const sp3 = document.querySelector("#player_3 .player_legs");
    sp3.innerText = p3.legs;
    const sp4 = document.querySelector("#player_4 .player_legs");
    sp4.innerText = p4.legs;
}
function updatePlayerRemainingScore () {
    const player_1_remaining_score = document.querySelector("#player_1 .player_score")
    player_1_remaining_score.innerText = p1.remaining;
    const player_2_remaining_score = document.querySelector("#player_2 .player_score")
    player_2_remaining_score.innerText = p2.remaining;
    const player_3_remaining_score = document.querySelector("#player_3 .player_score")
    player_3_remaining_score.innerText = p3.remaining;
    const player_4_remaining_score = document.querySelector("#player_4 .player_score")
    player_4_remaining_score.innerText = p4.remaining;
    
}
function updatePlayerAverage () {
    const sp1 = document.querySelector("#player_1 .player_average");
    sp1.innerText = `Avg: ${p1.average.toFixed(2)}`;
    const sp2 = document.querySelector("#player_2 .player_average");
    sp2.innerText = `Avg: ${p2.average.toFixed(2)}`;
    const sp3 = document.querySelector("#player_3 .player_average");
    sp3.innerText = `Avg: ${p3.average.toFixed(2)}`;
    const sp4 = document.querySelector("#player_4 .player_average");
    sp4.innerText = `Avg: ${p4.average.toFixed(2)}`;
}
function updatePlayerLastscore () {
    const sp1 = document.querySelector("#player_1 .player_lastscore");
    sp1.innerText = `Last: ${p1.lastscore}`;
    const sp2 = document.querySelector("#player_2 .player_lastscore");
    sp2.innerText = `Last: ${p2.lastscore}`;
    const sp3 = document.querySelector("#player_3 .player_lastscore");
    sp3.innerText = `Last: ${p3.lastscore}`;
    const sp4 = document.querySelector("#player_4 .player_lastscore");
    sp4.innerText = `Last: ${p4.lastscore}`;
}

//Event Listeners:

// Akte für jeden Spieler mit name score average lastscore AKTIVITÄT legs
