// get variables from sessionstorage
const gamemode = sessionStorage.getItem("gamemode");
const firstto = sessionStorage.getItem("firstto");
const numberofplayers = sessionStorage.getItem("numberofplayers");
const startingplayer = sessionStorage.getItem("startingplayer");


console.log("gamemode:", gamemode);
console.log("first to:", firstto, "legs");
console.log("numberofplayers:", numberofplayers);
console.log("startingplayer:", startingplayer);