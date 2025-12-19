// Variables:
let gamemode = "501do";
let firstto = 1;
let numberofplayers = 2;
let gamestate = "idle";

let player_1_name = "Player 1";
let player_2_name = "Player 2";
let player_3_name = "Player 3";
let player_4_name = "Player 4";
let player_1_legs = 0;
let player_2_legs = 0;
let player_3_legs = 0;
let player_4_legs = 0;
let player_1_remaining = 501;
let player_2_remaining = 501;
let player_3_remaining = 501;
let player_4_remaining = 501;
let player_1_average;
let player_2_average;
let player_3_average;
let player_4_average;
let player_1_lastscore;
let player_2_lastscore;
let player_3_lastscore;
let player_4_lastscore;
let player_1_thrown;                //number of darts thrown
let player_2_thrown;
let player_3_thrown;
let player_4_thrown;

let target;                         //required to win


//Eventlisteners:
const gamemodeselector = document.querySelector(".gamemode_button");
    gamemodeselector.addEventListener("click", () => {
        console.log("gamemode click")

    });

//Functions: