let turn = "p1";
let scorep1 = 501;
let scorep2 = 501;
let namep1 = "Player 1";
let namep2 = "Player 2";
let sump1 = 0;
let numberofscoresp1 = 0;
let sump2 = 0;
let numberofscoresp2 = 0;

let averagep1 = 0;
let averagep2 = 0;

let lastscorep1 = 0;
let lastscorep2 = 0;

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM bereit");

    document.getElementById("p1").innerText = `${scorep1.toFixed(0)} `;
    document.getElementById("p2").innerText = `${scorep2.toFixed(0)} `;
    
    
    document.getElementById("namep1").innerText = namep1;
    document.getElementById("namep2").innerText = namep2;

    const lastscorep1 = document.querySelector(".box_p1 .lastscore");
    lastscorep1.innerText = "last score: /";

    const lastscorep2 = document.querySelector(".box_p2 .lastscore");
    lastscorep2.innerText = "last score: /";

    const namechangep1 = document.querySelector(".box_p1 .name");
    namechangep1.addEventListener("click", () => {
        console.log("klick")
        const newname = prompt("Enter Name")
        console.log(newname)
        if (newname == "") {
        document.getElementById("ausgabe").innerText = "Canceled"
        }
        else if (newname == null) {
            document.getElementById("ausgabe").innerText = "Canceled"
        }
        else {
            namep1 = newname;
            document.getElementById("namep1").innerText = namep1;
        }
    });

    const namechangep2 = document.querySelector(".box_p2 .name");
    namechangep2.addEventListener("click", () => {
        console.log("klick")
        const newname = prompt("Enter Name")
        console.log(newname)
        if (newname == "") {
        document.getElementById("ausgabe").innerText = "Canceled"
        }
        else if (newname == null) {
            document.getElementById("ausgabe").innerText = "Canceled"
        }
        else {
            namep2 = newname;
            document.getElementById("namep2").innerText = namep2;
        }
    });

});

function startSkript () {
    scorep1 = 501;
    scorep2 = 501;
    document.getElementById("p1").innerText = `${scorep1.toFixed(0)} `;
    document.getElementById("p2").innerText = `${scorep2.toFixed(0)} `;
    document.getElementById("action").innerText = `${namep1}'s turn`;

    sump1 = 0;
    sump2 = 0;
    numberofscoresp1 = 0;
    numberofscoresp2 = 0;
    averagep1 = 0;
    averagep2 = 0;
    const av1 = document.querySelector(".box_p1 .average");
    av1.innerText = `average: ${averagep1.toFixed(2)}`;
    const av2 = document.querySelector(".box_p2 .average");
    av2.innerText = `average: ${averagep2.toFixed(2)}`;


    lastscorep1 = document.querySelector(".box_p1 .lastscore");
    lastscorep1.innerText = `last score: /`;

    lastscorep2 = document.querySelector(".box_p2 .lastscore");
    lastscorep2.innerText = `last score: /`;
}

function addScoreSkript () {
    const score = Number(document.getElementById("inputbox").value);
    console.log(score);

    if (turn == "p1") {
        const newscorep1 = Number(scorep1-score);
        // console.log(newscorep1);
        scorep1 = newscorep1;
        document.getElementById("p1").innerText = `${scorep1.toFixed(0)} `;

        if (scorep1 == 0) {
            endScript ();
        }
        else if (scorep1 > 0) {
            turn = "p2";
            document.getElementById("action").innerText = `${namep2}'s turn`;

            lastscorep1 = document.querySelector(".box_p1 .lastscore");
            lastscorep1.innerText = `last score: ${score}`;

            averageP1Script (score);
        }
        
    }

    else if (turn == "p2") {
        const newscorep2 = Number(scorep2-score);
        // console.log(newscorep2);
        scorep2 = newscorep2;
        document.getElementById("p2").innerText = `${scorep2.toFixed(0)} `;

        if (scorep2 == 0) {
            endScript ();
        }
        else if (scorep2 > 0) {
            turn = "p1";
            document.getElementById("action").innerText = `${namep1}'s turn`;

            lastscorep2 = document.querySelector(".box_p2 .lastscore");
            lastscorep2.innerText = `last score: ${score}`;

            averageP2Script (score);
        }
    }
}

function endScript () {
    if (turn == "p1") {
        document.getElementById("action").innerText = `${namep1} won`;
    }
    
    else if (turn == "p2") {
        document.getElementById("action").innerText = `${namep2} won`;
    }
}



function averageP1Script (score) {
    sump1 += score;
    ++numberofscoresp1;
    averagep1 = sump1 / numberofscoresp1;

    const av1 = document.querySelector(".box_p1 .average");
    av1.innerText = `average: ${averagep1.toFixed(2)}`;
}

function averageP2Script (score) {
    sump2 += score;
    ++numberofscoresp2;
    const averagep2 = sump2 / numberofscoresp2;

    const av2 = document.querySelector(".box_p2 .average");
    av2.innerText = `average: ${averagep2.toFixed(2)}`;
}