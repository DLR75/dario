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
const plate_command_z = document.getElementById("command_z");

// Variables:
let startingplayer;
let score;
let scorestring;
let activeplayer;

let p1 = {
    name: "",
    remaining: 999,
    average: 0,
    lastscore: 0,
    legs: 0,
    thrown: 0,
    sum: 0,
    active: false,
    prescore: "",
}
let p2 = {
    name: "",
    remaining: 999,
    average: 0,
    lastscore: 0,
    legs: 0,
    thrown: 0,
    sum: 0,
    active: false,
    prescore: "",
}
let p3 = {
    name: "",
    remaining: 999,
    average: 0,
    lastscore: 0,
    legs: 0,
    thrown: 0,
    sum: 0,
    active: false,
    prescore: "",
}
let p4 = {
    name: "",
    remaining: 999,
    average: 0,
    lastscore: 0,
    legs: 0,
    thrown: 0,
    sum: 0,
    active: false,
    prescore: "",
}
let gamerules = {
    gamemode: 1,
    target: 999,
    firstto: 99,
    numberofplayers: 4,
    startingplayermode: 1,
}

const checkoutsdoubledario = {
  1: ["to much"], 2: ["D1"], 3: ["1", "D1"], 4: ["D2"], 5: ["1", "D2"], 6: ["D3"], 7: ["3", "D2"], 8: ["D4"], 9: ["1", "D4"], 10: ["D5"],
  11: ["1", "D5"], 12: ["D6"], 13: ["1", "D6"], 14: ["D7"], 15: ["5", "D5"], 16: ["D8"], 17: ["1", "D8"], 18: ["D9"], 19: ["3", "D8"], 20: ["D10"],
  21: ["1", "D10"], 22: ["D11"], 23: ["3", "D10"], 24: ["D12"], 25: ["5", "D10"], 26: ["D13"], 27: ["7", "D10"], 28: ["D14"], 29: ["9", "D10"], 30: ["D15"],
  31: ["11", "D10"], 32: ["D16"], 33: ["1", "D16"], 34: ["D17"], 35: ["3", "D16"], 36: ["D18"], 37: ["5", "D16"], 38: ["D19"], 39: ["7", "D16"], 40: ["D20"],
  41: ["9", "D16"], 42: ["10", "D16"], 43: ["11", "D16"], 44: ["12", "D16"], 45: ["13", "D16"], 46: ["14", "D16"], 47: ["15", "D16"], 48: ["16", "D16"], 49: ["17", "D16"], 50: ["18", "D16"],
  51: ["19", "D16"], 52: ["20", "D16"], 53: ["13", "D20"], 54: ["18", "D18"], 55: ["15", "D20"], 56: ["16", "D20"], 57: ["17", "D20"], 58: ["18", "D20"], 59: ["19", "D20"], 60: ["20", "D20"],
  61: ["20", "9", "D16"], 62: ["20", "10", "D16"], 63: ["20", "11", "D16"], 64: ["T16", "D8"], 65: ["20", "13", "D16"], 66: ["16", "18", "D16"], 67: ["20", "15", "D16"], 68: ["T20", "D4"], 69: ["19", "18", "D16"], 70: ["T20", "D5"],
  71: ["20", "19", "D16"], 72: ["T20", "D6"], 73: ["T19", "D8"], 74: ["T20", "D7"], 75: ["20", "15", "D20"], 76: ["T20", "D8"], 77: ["T19", "D10"], 78: ["T20", "D9"], 79: ["20", "19", "D20"], 80: ["T20", "D10"],
  81: ["T20", "1", "D10"], 82: ["T20", "D11"], 83: ["T17", "D16"], 84: ["T20", "D12"], 85: ["T17", "D17"], 86: ["T20", "D13"], 87: ["T19", "D15"], 88: ["T20", "D14"], 89: ["T19", "D16"], 90: ["T20", "D15"],
  91: ["T19", "D17"], 92: ["T20", "D16"], 93: ["T19", "D18"], 94: ["T20", "D17"], 95: ["T19", "D19"], 96: ["T20", "D18"], 97: ["T19", "D20"], 98: ["T20", "D19"], 99: ["T20", "7", "D16"], 100: ["T20", "D20"],
  101: ["T20", "1", "D20"], 102: ["T20", "2", "D20"], 103: ["T20", "3", "D20"], 104: ["T20", "4", "D20"], 105: ["T20", "5", "D20"], 106: ["T20", "6", "D20"], 107: ["T20", "7", "D20"], 108: ["T20", "8", "D20"], 109: ["T20", "9", "D20"], 110: ["T20", "10", "D20"],
  111: ["T20", "11", "D20"], 112: ["T20", "12", "D20"], 113: ["T20", "13", "D20"], 114: ["T20", "14", "D20"], 115: ["T20", "15", "D20"], 116: ["T20", "16", "D20"], 117: ["T20", "17", "D20"], 118: ["T20", "18", "D20"], 119: ["T20", "19", "D20"], 120: ["T20", "20", "D20"],
  121: ["T20", "T19", "D2"], 122: ["T20", "T20", "D1"], 123: ["T20", "T19", "D3"], 124: ["T20", "T16", "D8"], 125: ["T20", "T11", "D16"], 126: ["T20", "T10", "D18"], 127: ["T20", "T17", "D8"], 128: ["T20", "T20", "D4"], 129: ["T20", "T15", "D12"], 130: ["T20", "T20", "D5"],
  131: ["T20", "T13", "D16"], 132: ["T20", "T20", "D6"], 133: ["T20", "T17", "D11"], 134: ["T20", "T20", "D7"], 135: ["T20", "T17", "D12"], 136: ["T20", "T20", "D8"], 137: ["T20", "T19", "D10"], 138: ["T20", "T20", "D9"], 139: ["T20", "T19", "D11"], 140: ["T20", "T20", "D10"],
  141: ["T20", "T19", "D12"], 142: ["T20", "T20", "D11"], 143: ["T20", "T19", "D13"], 144: ["T20", "T20", "D12"], 145: ["T20", "T19", "D14"], 146: ["T20", "T20", "D13"], 147: ["T20", "T19", "D15"], 148: ["T20", "T20", "D14"], 149: ["T20", "T19", "D16"], 150: ["T20", "T20", "D15"],
  151: ["T20", "T19", "D17"], 152: ["T20", "T20", "D16"], 153: ["T20", "T19", "D18"], 154: ["T20", "T20", "D17"], 155: ["T20", "T19", "D19"], 156: ["T20", "T20", "D18"], 157: ["T20", "T19", "D20"], 158: ["T20", "T20", "D19"], 160: ["T20", "T20", "D20"], 161: ["T20", "T17", "BULL"],
  164: ["T19", "T19", "BULL"], 167: ["T20", "T19", "BULL"], 170: ["T20", "T20", "BULL"],
};

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
    gamerules.gamemode = sessionStorage.getItem("gamemode");
    gamerules.firstto = sessionStorage.getItem("firstto");
    gamerules.numberofplayers = sessionStorage.getItem("numberofplayers");
    gamerules.startingplayermode = sessionStorage.getItem("startingplayer");
    p1.name = sessionStorage.getItem("player_1_name");
    p2.name = sessionStorage.getItem("player_2_name");
    p3.name = sessionStorage.getItem("player_3_name");
    p4.name = sessionStorage.getItem("player_4_name");
    gamerules.gamemode = Number(gamerules.gamemode);
    gamerules.firstto = Number(gamerules.firstto);
    gamerules.numberofplayers = Number(gamerules.numberofplayers);

    // logSessionStorage();
    figureOut();
}   function logSessionStorage () {
    console.log("gamemode:", gamerules.gamemode);
    console.log("first to:", gamerules.firstto, "legs");
    console.log("numberofplayers:", gamerules.numberofplayers);
    console.log("startingplayer:", gamerules.startingplayermode);
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
    el.style.display = index < gamerules.numberofplayers ? "flex" : "none";
    });
}
function figureOutGamemode () {
    if (gamerules.gamemode === 1 || gamerules.gamemode === 2) {
        gamerules.target = 501;
    } else {
        gamerules.target = 301;
    }
    p1.remaining = gamerules.target;
    p2.remaining = gamerules.target;
    p3.remaining = gamerules.target;
    p4.remaining = gamerules.target;
}
function figureOutStartPlayer () {
    if (gamerules.startingplayermode === "Random") {
        pickRandomPlayer();
    } else if (gamerules.startingplayermode === "Bull") {
        openBullPopup();
    } else if (gamerules.startingplayermode === "P1") {
        selectStartingPlayer(1);
    } else if (gamerules.startingplayermode === "P2") {
        selectStartingPlayer(2);
    } else if (gamerules.startingplayermode === "P3") {
        selectStartingPlayer(3);
    } else if (gamerules.startingplayermode === "P4") {
        selectStartingPlayer(4);
    }
}
function pickRandomPlayer () {
    let pick = Math.floor(Math.random() * gamerules.numberofplayers) +1;
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
    startingplayer = winner;
    if (winner === 1) {
        // console.log("P1 active");
        p1.active = true;
    } else if (winner === 2) {
        // console.log("P2 active");
        p2.active = true;
    } else if (winner === 3) {
        // console.log("P3 active");
        p3.active = true;
    } else if (winner === 4) {
        // console.log("P4 active");
        p4.active = true;
    }
    checkActivity(p1);
    checkActivity(p2);
    checkActivity(p3);
    checkActivity(p4);
}
function checkActivity (n) {
    if (n.active === true) {
        // console.log("active = true");
        activate(n);
    } else if (n.active === false) {
        // console.log("active = false");
        deactivate(n);
    }
}
function activate(player) {
    // console.log("run activate", player);
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

    determineActivePlayer();
    const checkOut = activeplayer.remaining;
    checkCheckOutPossibility(checkOut);
}
function deactivate(player) {
    // console.log("run deactivate", player);
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


    // Updates.
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


function determineActivePlayer () {
    if (p1.active === true) {
        activeplayer = p1;
    } else if (p2.active === true) {
        activeplayer = p2;
    } else if (p3.active === true) {
        activeplayer = p3;
    } else if (p4.active === true) {
        activeplayer = p4;
    }
}
function calculateAverage () {
    activeplayer.sum = activeplayer.sum + score;
    activeplayer.average = activeplayer.sum * 3 / activeplayer.thrown;
    updatePlayerAverage();
}
function calculateLastScore () {
    activeplayer.lastscore = score;
    updatePlayerLastscore();
}

function deleteInputs () {
    scorestring = scorestring.slice(0, -1);
    get_input_display.innerText = scorestring;
    preScore(scorestring);
}

// function switchActivePlayerNext (activeplayer) {
//     if (gamerules.numberofplayers === 1) {

//     } else if (gamerules.numberofplayers === 2) {
//         if (activeplayer === p1) {
//             p1.active = false;
//             p2.active = true;
//             activeplayer = p2;
//         } else if (activeplayer === p2) {
//             p2.active = false;
//             p1.active = true;
//             activeplayer = p1;
//         }
//     } else if (gamerules.numberofplayers === 3) {
//         if (activeplayer === p1) {
//             p1.active = false;
//             p2.active = true;
//             activeplayer = p2;
//         } else if (activeplayer === p2) {
//             p2.active = false;
//             p3.active = true;
//             activeplayer = p3;
//         } else if (activeplayer === p3) {
//             p3.active = false;
//             p1.active = true;
//             activeplayer = p1;
//         }
//     } else if (gamerules.numberofplayers === 4) {
//         if (activeplayer === p1) {
//             p1.active = false;
//             p2.active = true;
//             activeplayer = p2;
//         } else if (activeplayer === p2) {
//             p2.active = false;
//             p3.active = true;
//             activeplayer = p3;
//         } else if (activeplayer === p3) {
//             p3.active = false;
//             p4.active = true;
//             activeplayer = p4;
//         } else if (activeplayer === p4) {
//             p4.active = false;
//             p1.active = true;
//             activeplayer = p1;
//         }
//     }
//     checkActivity(p1);
//     checkActivity(p2);
//     checkActivity(p3);
//     checkActivity(p4);
// }

function switchActivePlayerNext () {
    const playerlist = [p1, p2, p3, p4].slice(0, gamerules.numberofplayers); //list of all players cut to length

    let currentplayerIndex = playerlist.indexOf(activeplayer); //position of activeplayer in playerlist
    let nextplayerIndex = (currentplayerIndex + 1) % playerlist.length; //position of next activeplayer

    playerlist[currentplayerIndex].active = false; //change activity
    playerlist[nextplayerIndex].active = true; //change activity

    activeplayer = playerlist[nextplayerIndex]; //determine new activeplayer

    playerlist.forEach(player => checkActivity(player)); //run functions to check activity
}
function switchActivePlayerPrevious () {
    const playerlist = [p1, p2, p3, p4].slice(0, gamerules.numberofplayers); //list of all players cut to length

    let currentplayerIndex = playerlist.indexOf(activeplayer); //position of activeplayer in playerlist
    let previousplayerIndex = (currentplayerIndex - 1 + playerlist.length) % playerlist.length; //position of next activeplayer

    playerlist[currentplayerIndex].active = false; //change activity
    playerlist[previousplayerIndex].active = true; //change activity

    activeplayer = playerlist[previousplayerIndex]; //determine new activeplayer

    playerlist.forEach(player => checkActivity(player)); //run functions to check activity
}

function switchActivePlayerStart () {
    if (gamerules.numberofplayers === 1) {

    } else if (gamerules.numberofplayers === 2) {
        if (startingplayer === 1) {
            p1.active = false;
            p2.active = true;
            activeplayer = p2;
            startingplayer = 2;
        } else if (startingplayer === 2) {
            p2.active = false;
            p1.active = true;
            activeplayer = p1;
            startingplayer = 1;
        }
    } else if (gamerules.numberofplayers === 3) {
        if (startingplayer === 1) {
            p1.active = false;
            p2.active = true;
            activeplayer = p2;
            startingplayer = 2;
        } else if (startingplayer === 2) {
            p2.active = false;
            p3.active = true;
            activeplayer = p3;
            startingplayer = 3;
        } else if (startingplayer === 3) {
            p3.active = false;
            p1.active = true;
            activeplayer = p1;
            startingplayer = 1;
        }
    } else if (gamerules.numberofplayers === 4) {
        if (startingplayer === 1) {
            p1.active = false;
            p2.active = true;
            activeplayer = p2;
            startingplayer = 2;
        } else if (startingplayer === 2) {
            p2.active = false;
            p3.active = true;
            activeplayer = p3;
            startingplayer = 3;
        } else if (startingplayer === 3) {
            p3.active = false;
            p4.active = true;
            activeplayer = p4;
            startingplayer = 4;
        } else if (startingplayer === 4) {
            p4.active = false;
            p1.active = true;
            activeplayer = p1;
            startingplayer = 1;
        }
    }
    checkActivity(p1);
    checkActivity(p2);
    checkActivity(p3);
    checkActivity(p4);
}

function startNewLeg () {
    p1.remaining = gamerules.target;
    p1.lastscore = 0;
    p2.remaining = gamerules.target;
    p2.lastscore = 0;
    p3.remaining = gamerules.target;
    p3.lastscore = 0;
    p4.remaining = gamerules.target;
    p4.lastscore = 0;

    updatePlayerRemainingScore();
    updatePlayerLastscore();
    switchActivePlayerStart();
}
function addLeg () {
    activeplayer.legs = activeplayer.legs + 1;
    updatePlayerLegs();
    if (activeplayer.legs === gamerules.firstto) {
        matchWon();
    } else {
        const message = "+1 leg"
        displaySomething(message);
        startNewLeg();
    }
}
function matchWon () {
    console.log(activeplayer.name, "won the match!")

    document.querySelector(".gameshot_popup").style.display = "flex";
    document.getElementById("gameshot_player").innerText = activeplayer.name;

    // confetti({
    // particleCount: 150,
    // spread: 70,
    // origin: { y: 0.6 }
    // });
    setInterval(() => {
        confetti({
            particleCount: 50,
            spread: 120,
            origin: { x: Math.random(), y: 0 },
            ticks: 500,
            gravity: 0.9
        });
    }, 200);
}
function displaySomething(message) {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    async function showMessage() {
        const overlay_message = document.getElementById("overlay_message");
        overlay_message.textContent = message;

        document.getElementById("overlay_message").classList.add("grow");
        document.getElementById("overlay_message").classList.add("legwon");
        await sleep(2000);
        overlay_message.textContent = "";
        document.getElementById("overlay_message").classList.remove("grow");
        document.getElementById("overlay_message").classList.remove("legwon");
        
        
    }
    showMessage();
}

function buildScorestring (input) {
    input = String(input);
    if (scorestring === undefined) {
        scorestring = input;
    } else {
        scorestring = scorestring + input;
    }
    get_input_display.innerText = scorestring;
    preScore(scorestring);
}
function preScore (scorestring) {
    const prescore = convertScorestringToNumber(scorestring);
    const preremaining = activeplayer.remaining - prescore;
    displayPrescore (preremaining);
    checkCheckOutPossibility(preremaining);
}
function convertScorestringToNumber (scorestring) {
    if (scorestring === undefined) {
        scorestring = "0";
    }
    score = scorestring;
    score = score.split("+");
    score = score.map(Number);
    score = score.reduce((a,b) => a + b, 0);

    return score;
}
function scoreScore () {
    if (scorestring === undefined) {
        score = 0;
    }
    input = undefined;
    input_display = undefined;
    get_input_display.innerText = "";
    scorestring = undefined;
    checkScore();
}
function checkScore () {
    if (score > 180) {
        alert("impossible");
    } else {
        applyScore();
    }
}
function applyScore () {
    activeplayer.thrown = activeplayer.thrown + 3;
    let newscore = activeplayer.remaining-score;
    if (newscore > 1) {
        activeplayer.remaining = activeplayer.remaining-score;
        updatePlayerRemainingScore();
        calculateAverage();
        calculateLastScore();
        switchActivePlayerNext();
        displayScore();
    } else if (newscore === 1) {
        if (gamerules.gamemode === 1 || 3) {
            alert("score busted");
            score = 0;
            calculateAverage();
            calculateLastScore();
            switchActivePlayerNext();
            displayScore();
        } else if (gamerules.gamemode === 2 || 4) {
            activeplayer.remaining = activeplayer.remaining-score;
            updatePlayerRemainingScore(activeplayer);
            calculateAverage();
            calculateLastScore();
            switchActivePlayerNext();
            displayScore();
        }
    } else if (newscore  === 0) {
        if (gamerules.gamemode === 1 || 3) {
            if (activeplayer.remaining === 180 || activeplayer.remaining === 169 ||
                 activeplayer.remaining === 168 || activeplayer.remaining === 166 ||
                  activeplayer.remaining === 165 || activeplayer.remaining === 163 ||
                   activeplayer.remaining === 159) {
                alert("score busted, bogeynumber");
                score = 0;
                calculateAverage();
                calculateLastScore();
                switchActivePlayerNext();
                displayScore();
            } else {
                activeplayer.remaining = activeplayer.remaining-score;
                updatePlayerRemainingScore();
                calculateAverage();
                calculateLastScore();
                addLeg();
            }
        } else if (gamerules.gamemode === 2 || 4) {
            activeplayer.remaining = activeplayer.remaining-score;
            updatePlayerRemainingScore();
            calculateAverage();
            calculateLastScore();
            addLeg();
        }
    } else {
        alert("score busted");
        score = 0;
        calculateAverage();
        calculateLastScore();
        switchActivePlayerNext();
        displayScore();
    }
}

    //Checkout
function checkCheckOutPossibility (remainingscore) {
    if (gamerules.gamemode === 1 || 3) {
        if (remainingscore > 170) {
            console.log("no checkout");
            displayRecommended1("");
            displayRecommended2("");
            displayRecommended3("");
        } else if (remainingscore === 169 || remainingscore === 168 ||
             remainingscore === 166 || remainingscore === 165 ||
              remainingscore === 163 || remainingscore === 159) {
            console.log("no checkout, bogeynumber");
            displayRecommended1("");
            displayRecommended2("");
            displayRecommended3("");
        } else {
            console.log("checkout possible");
            displayCheckout(remainingscore);
        }
    } else if (gamerules.gamemode === 2 || 4) {
        if (remainingscore > 180) {
            console.log("no checkout");
            displayRecommended1("");
            displayRecommended2("");
            displayRecommended3("");
        } else {
            console.log("checkout possible");
            displayCheckout(remainingscore);
        }
    } 
}
function displayCheckout(remainingscore) {
    const weg = getCheckout(remainingscore);
    console.log(weg);
    const check1 = weg [0];
    const check2 = weg [1];
    const check3 = weg [2];

    displayRecommended1(check1);
    displayRecommended2(check2);
    displayRecommended3(check3);
}
function getCheckout (remainingscore) {
    return checkoutsdoubledario[remainingscore] || null;
}
function displayRecommended1(message) {
    if (message === undefined) {
        message = "";
    }
    const selector = document.getElementById("recommended_1");
    selector.innerText = message;
}
function displayRecommended2(message) {
    if (message === undefined) {
        message = "";
    }
    const selector = document.getElementById("recommended_2");
    selector.innerText = message;
}
function displayRecommended3(message) {
    if (message === undefined) {
        message = "";
    }
    const selector = document.getElementById("recommended_3");
    selector.innerText = message;
}
function displayScore () {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    async function showMessage() {
        const overlay_message = document.getElementById("overlay_message");
        overlay_message.textContent = score;

        if (score === 69) {
            document.getElementById("overlay_message").classList.add("grow");
            document.getElementById("overlay_message").classList.add("sixtynine");
            await sleep(5000);
            overlay_message.textContent = "";
            document.getElementById("overlay_message").classList.remove("grow");
            document.getElementById("overlay_message").classList.remove("sixtynine");
        } else if (score === 42) {
            document.getElementById("overlay_message").classList.add("grow");
            document.getElementById("overlay_message").classList.add("fortytwo");
            await sleep(5000);
            overlay_message.textContent = "";
            document.getElementById("overlay_message").classList.remove("grow");
            document.getElementById("overlay_message").classList.remove("fortytwo");
        } else if (score >= 100) {
            document.getElementById("overlay_message").classList.add("grow");
            document.getElementById("overlay_message").classList.add("onehundredplus");
            await sleep(5000);
            overlay_message.textContent = "";
            document.getElementById("overlay_message").classList.remove("grow");
            document.getElementById("overlay_message").classList.remove("onehundredplus");
        } else {
            document.getElementById("overlay_message").classList.add("grow");
            await sleep(2000);
            overlay_message.textContent = "";
            document.getElementById("overlay_message").classList.remove("grow");
        }
        
    }

    showMessage();
}
function displayPrescore(preremainng) {
    let a = activeplayer.remaining;
    a = a.toString();
    let b = preremainng.toString();
    let string = a + "(" + b + ")";
    activeplayer.prescore = string;
    updatePlayerPrescore ();

}
function updatePlayerPrescore () {
    if (activeplayer === p1) {
        const player_1_remaining_score = document.querySelector("#player_1 .player_score")
        player_1_remaining_score.innerText = p1.prescore;
    } else if (activeplayer === p2) {
        const player_2_remaining_score = document.querySelector("#player_2 .player_score")
        player_2_remaining_score.innerText = p2.prescore;
    } else if (activeplayer === p3) {
        const player_3_remaining_score = document.querySelector("#player_3 .player_score")
        player_3_remaining_score.innerText = p3.prescore;
    } else if (activeplayer === p4) {
        const player_4_remaining_score = document.querySelector("#player_4 .player_score")
        player_4_remaining_score.innerText = p4.prescore;
    }
}

function calculateGoBackInTime () {
    switchActivePlayerPrevious();
    removePreviousScoreFromList();
}

// Lists
let p1_scores = [
    {score: 140, darts: 3},
]
let p2_scores = []
let p3_scores = []
let p4_scores = []

let p1_legaverages = [
    {average: 42, darts: 12},
]
let p2_legaverages = []
let p3_legaverages = []
let p4_legaverages = []

function addScoreToList (newscore, newdarts) {
    if (activeplayer === p1) {
        p1_scores.push({score: newscore, darts: newdarts});
    } else if (activeplayer === p2) {
        p2_scores.push({score: newscore, darts: newdarts});
    } else if (activeplayer === p3) {
        p3_scores.push({score: newscore, darts: newdarts});
    } else if (activeplayer === p4) {
        p4_scores.push({score: newscore, darts: newdarts});
    }
    calculateAverage();
    calculateLastScore();
}
function removePreviousScoreFromList () {
    if (activeplayer === p1) {
        p1_scores.pop();
    } else if (activeplayer === p2) {
        p2_scores.pop();
    } else if (activeplayer === p3) {
        p3_scores.pop();
    } else if (activeplayer === p4) {
        p4_scores.pop();
    }
    console.log("run removePreviousScoreFromList");
}

//Event Listeners:
plate_1.addEventListener("click", () => {
    input = "1";
    buildScorestring (input);
}); plate_2.addEventListener("click", () => {
    input = "2";
    buildScorestring (input);
}); plate_3.addEventListener("click", () => {
    input = "3";
    buildScorestring (input);
}); plate_4.addEventListener("click", () => {
    input = "4";
    buildScorestring (input);
}); plate_5.addEventListener("click", () => {
    input = "5";
    buildScorestring (input);
}); plate_6.addEventListener("click", () => {
    input = "6";
    buildScorestring (input);
}); plate_7.addEventListener("click", () => {
    input = "7";
    buildScorestring (input);
}); plate_8.addEventListener("click", () => {
    input = "8";
    buildScorestring (input);
}); plate_9.addEventListener("click", () => {
    input = "9";
    buildScorestring (input);
}); plate_plus.addEventListener("click", () => {
    input = "+";
    buildScorestring (input);
}); plate_0.addEventListener("click", () => {
    input = "0";
    buildScorestring (input);
}); plate_score.addEventListener("click", () => {
    scoreScore();
}); plate_delete.addEventListener("click", () => {
    deleteInputs();
}); plate_command_z.addEventListener("click", () => {
    calculateGoBackInTime();
});

document.getElementById("player_settings_1").addEventListener("click", function() {
    document.querySelector(".settings_popup").style.display = "flex";
    document.getElementById("settings_popup_playername").innerText = p1.name + "'s settings";
});
document.getElementById("player_settings_2").addEventListener("click", function() {
    document.querySelector(".settings_popup").style.display = "flex";
    document.getElementById("settings_popup_playername").innerText = p2.name + "'s settings";
});
document.getElementById("player_settings_3").addEventListener("click", function() {
    document.querySelector(".settings_popup").style.display = "flex";
    document.getElementById("settings_popup_playername").innerText = p3.name + "'s settings";
});
document.getElementById("player_settings_4").addEventListener("click", function() {
    document.querySelector(".settings_popup").style.display = "flex";
    document.getElementById("settings_popup_playername").innerText = p4.name + "'s settings";
});
document.getElementById("close_settings_button").addEventListener("click", function() {
    document.querySelector(".settings_popup").style.display = "none";
});
