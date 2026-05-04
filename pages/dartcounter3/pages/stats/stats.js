// supabase
const supabaseUrl = "https://tretfgmkwrwkurncitma.supabase.co";
const supabaseKey = "sb_publishable_e-fhuxHuNeIUVNIJId9lDQ_lk7ccsgb";
const db = supabase.createClient(supabaseUrl, supabaseKey);

//variables
let playername = "Dario";
let timemode;


let dates = [];
let weeksdates = [];
let monthsdates = [];
let filteredsupabasedata = [];
let grouped = [];
let grouped_countdarts = [];
let grouped_scoresum = [];
let chartData = [];
let chartDataReduced = [];
let converteddata = [];
let recent = [];
let last4matches;

//cleanup
async function cleanUp() {
    dates = [];
    weeksdates = [];
    monthsdates = [];
    filteredsupabasedata = [];
    grouped = [];
    grouped_countdarts = [];
    grouped_scoresum = [];
    chartData = [];
    chartDataReduced = [];
    converteddata = [];
}


//create Timeframe
async function createTimeframeDays () {
    const today = new Date();
    const days = 24;
    
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i)

        const iso = d.toISOString().split("T")[0];
        dates.push(iso);
    }
    // console.log("dates:", dates);
}
async function createTimeframeWeeks () {
    const today = new Date();
    const weeks = 24;
    const days = [];
    
    for (let i = weeks * 7 - 1; i >= 0; i--) {
        const d = new Date();

        d.setDate(today.getDate() - i)
        const iso = d.toISOString().split("T")[0];

        days.push(iso);
    }

    weeksdates = days;
    console.log("weeks:", weeksdates);
}
async function createTimeframeMonths () {
    const today = new Date();
    const months = 24;
    const days = [];
    
    for (let i = months * 30 - 1; i >= 0; i--) {
        const d = new Date();

        d.setDate(today.getDate() - i)
        const iso = d.toISOString().split("T")[0];

        days.push(iso);
    }

    monthsdates = days;
    console.log("months:", monthsdates);
}
//filter for matches
async function filterDataForMatchingDates (player, timeframe) {
    const supabasedata = await getData(player);

    //cut of time
    const supabasedatacleaned = supabasedata.map(entry => {
        return {
            ...entry,
            date: entry.created_at.slice(0,10)
        };
    });
    console.log("cleaneddates", supabasedatacleaned);
    //filter matches
    filteredsupabasedata = supabasedatacleaned.filter(entry => {
        return timeframe.includes(entry.date);
    });
    console.log("filteredmatches", filteredsupabasedata);
}
//group (combine all values of the day to one sum)
async function group() {
    filteredsupabasedata.forEach(entry => {
        // console.log("before entry.date:", grouped[entry.date]);
        if (!grouped[entry.date]) {
            grouped[entry.date] = 0;
        }
        grouped[entry.date] += entry.stat_average;
        // console.log("after entry.date:", grouped[entry.date]);
    });
    // console.log("grouped_average:", grouped);
}

async function groupCountdarts() {
    filteredsupabasedata.forEach(entry => {
        // console.log("before entry.date:", grouped_countdarts[entry.date]);
        if (!grouped_countdarts[entry.date]) {
            grouped_countdarts[entry.date] = 0;
        }
        grouped_countdarts[entry.date] += entry.stat_count_darts;
        // console.log("after entry.date:", grouped_countdarts[entry.date]);
    });
    // console.log("grouped_countdarts:", grouped_countdarts);
}

async function groupScoresum() {
    filteredsupabasedata.forEach(entry => {
        // console.log("before entry.date:", grouped_scoresum[entry.date]);
        if (!grouped_scoresum[entry.date]) {
            grouped_scoresum[entry.date] = 0;
        }
        grouped_scoresum[entry.date] += entry.stat_score_sum;
        // console.log("after entry.date:", grouped_scoresum[entry.date]);
    });
    // console.log("grouped_scoresum:", grouped_scoresum);
}

//combine + fill gaps
async function fillGaps(timeframe) {
    chartData = timeframe.map(date => {
        return {
            date: date,
            average: grouped_scoresum[date] / grouped_countdarts[date] * 3 || 0,
            averagesum: grouped[date] || 0,
            countdarts: grouped_countdarts[date] || 0,
            scoresum: grouped_scoresum[date] || 0,
        };
    })
    console.log("combine + fill gaps", chartData);
}

// reduce to 24 arrays // needs data to be dividable by 24

async function reduceTo24(data, reduce) {
    // console.log("reduce data:", data);

    const groupSize = data.length / 24;
    if ((data.length % 24) != 0) {
        alert("reduceTo24 groupSize not dividable by 24");
    };

    chartDataReduced = Array.from({length: 24}, (_, i) => {
        const group = data.slice(i * groupSize, (i + 1) * groupSize);

        return group.reduce((sum, obj) => ({
            average: sum.average + obj.average,
            averagesum: sum.averagesum + obj.averagesum,
            countdarts: sum.countdarts + obj.countdarts,
            date: obj.date,
            scoresum: sum.scoresum + obj.scoresum,
        }), {average: 0, averagesum: 0, countdarts: 0, date: 0, scoresum: 0});
    });
    
    chartDataReduced.forEach(entry => {
        if (entry.average != 0) {
            entry.average = entry.scoresum / entry.countdarts * 3;
        }
    });

    console.log("chartDataReduced:", chartDataReduced);
}

// convert data
async function convertData (data) {
    converteddata = data.map((item, i) => ({
        // x: new Date(item.created_at).toLocaleTimeString(),
        date: item.date,
        x: i,
        y: item.average,
    }));
    console.log("converteddata:", converteddata);
}

//get data
async function getData(player) {
    const {data, error} = await db
        .from("games501")
        .select("*")
        .eq("stat_player_id", player);
    
    if (error) {
        console.log("Supabaserror:", error);
        return;
    }
    console.log("supabasedata:", data);
    return data;
}

async function getDataMatchId(matchid) {
    const {data, error} = await db
        .from("games501")
        .select("*")
        .eq("stat_match_id", matchid);
    
    if (error) {
        console.log("Supabaserror:", error);
        return;
    }
    // console.log("supabasedata:", data);
    return data;
}

//run
async function run (timemode) {
    let timeframe;
    await cleanUp();
    if (timemode === "days") {
        await createTimeframeDays();
        timeframe = dates;
    } else if (timemode === "weeks") {
        await createTimeframeWeeks();
        timeframe = weeksdates;
    } else if (timemode === "months") {
        await createTimeframeMonths();
        timeframe = monthsdates;
    } else if (timemode === "legs") {
        
    } else {
        alert("run: no timeframe selected");
    }
    await filterDataForMatchingDates(playername, timeframe);
    await group();
    await groupCountdarts();
    await groupScoresum();
    await fillGaps(timeframe);
    await reduceTo24(chartData, 24);
    await convertData(chartDataReduced);
    drawCanvas(converteddata, 23, 10, 10);
}
async function runRun () {
    await getTimemode();
    await run(timemode);
}
runRun();


//canvas function
function drawCanvas (dataset, xsize, ysize, y_scale) {
    //canvas
    let canvas = document.querySelector("canvas");

    let diagram_size_x = xsize + 2;
    let diagram_size_y = ysize + 2;

    let e = (window.innerWidth - 100) / diagram_size_x; //-100 for padding of box

    canvas.width = e * diagram_size_x;
    canvas.height = e * diagram_size_y;

    let x0 = e;
    let y0 = e * diagram_size_y - e;

    let c = canvas.getContext("2d");

    //draw grid
    for (let i = 0; i < (diagram_size_y -1); i++) {
        c.beginPath();
        c.moveTo(e, e + e * i);
        c.lineTo(e * diagram_size_x - e, e + e * i);
        c.strokeStyle = "hsl(0, 0%, 18%)"; 
        c.stroke();
    }
    for (let i = 0; i < (diagram_size_x + 1); i++) {
        c.beginPath();
        c.moveTo(e + e * i, e);
        c.lineTo(e + e * i,e * diagram_size_y - e);
        c.strokeStyle = "hsl(0, 0%, 18%)";
        c.stroke();
    }
    //draw legend
    c.beginPath();
    c.moveTo(x0, y0 - (e * diagram_size_y - e * 2));
    c.lineTo(x0, y0);
    c.lineTo(x0 + e * diagram_size_x - e * 2, y0);
    c.lineWidth = 3;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.strokeStyle = "hsl(0, 0%, 18%)";
    c.stroke();
        //draw y numbers
        for (i = 0; i < diagram_size_y - 1; i++) {
            let y = y0 - e * i;
            c.textAlign = "center";
            c.textBaseline = "middle";
            c.fillStyle = "hsl(0, 0%, 68%)";
            c.font = "10px Arial";
            c.fillText(i*y_scale, e/2, y)
        }
            //draw x numbers
        for (i = 0; i < diagram_size_x - 1; i++) {
            let x = x0 + e * i;
            c.textAlign = "center";
            c.textBaseline = "middle";
            // c.fillText(dataset[i].date, x, y0 + e / 2)
            c.fillStyle = "hsl(0, 0%, 68%)";
            c.font = "10px Arial";
            c.fillText(i, x, y0 + e / 2);
        }
    //draw graph points
    for (i = 0; i < dataset.length; i++) {
        if (dataset[i].y != 0) {
            let x = dataset[i].x;
            let y = dataset[i].y/y_scale;

            c.beginPath();
            c.arc(x0 + e * x, y0 - e * y, e / 8, 0, Math.PI * 2, false);
            c.strokeStyle = "hsl(345, 85%, 47%)";
            c.stroke();
        }
        
    }
    //draw graph line

    const dataset_no_y0 = dataset.filter(item => item.y !== 0);
    // console.log(dataset_no_y0);

    for (i = 0; i < dataset_no_y0.length - 1; i++) {
        let x = dataset_no_y0[i].x;
        let y = dataset_no_y0[i].y/y_scale;
        let x2 = dataset_no_y0[i + 1].x;
        let y2 = dataset_no_y0[i + 1].y/y_scale;

        c.beginPath();
        c.moveTo(x0 + e * x, y0 - e * y);
        c.lineTo(x0 + e * x2, y0 - e * y2);
        c.lineWidth = 3;
        c.lineCap = "round";
        c.lineJoin = "round";
        c.strokeStyle = "hsl(345, 85%, 47%)";
        c.stroke();
    }
}

//select player
const input_name_selector = document.getElementById("input_name");
const title = document.getElementById("title");

title.innerText = playername;

document.getElementById("title").addEventListener("click", function() {
    playername = prompt("Please enter a Playername");
    title.innerText = playername;
    runRun();
    statsrun();
});

// fit Text Recent Matches
function fitText(text) {
    let size = 50;
    text.style.fontSize = size + "px";

    while (text.scrollWidth > text. clientWidth && size > 8) {
        size = size - 0.25;
        text.style.fontSize = size + "px";
    }
}
fitText(document.getElementById("match_title"));

// get stats for stats column
let supabasedataforstats;

async function statsgetData(player) {
    const {data, error} = await db
        .from("games501")
        .select("*")
        .eq("stat_player_id", player);
    
    if (error) {
        console.log("Supabaserror:", error);
        return;
    }
    // console.log("stats supabasedata 1:", data);
    supabasedataforstats = data;
}

async function statsCountdarts() {
    let dartcount = 0;
    supabasedataforstats.forEach(entry => {
        dartcount = dartcount + entry.stat_count_darts;
    });
    return dartcount;
}

async function statsScoresum() {
    let scoresum = 0;
        supabasedataforstats.forEach(entry => {
        scoresum = scoresum + entry.stat_score_sum;
    });
    return scoresum;
}

async function statsCount180() {
    let oneeighty = 0;
        supabasedataforstats.forEach(entry => {
        oneeighty = oneeighty + entry.stat_count_180;
    });
    return oneeighty;
}

async function statsGetHighfinishes() {
    let highfinishes = [];
    supabasedataforstats.forEach(entry => {
        if (entry.stat_checkout >= 50 ) {
            highfinishes.push(entry.stat_checkout);
        }
    });

    let text = "Highfinishes: ";
    highfinishes.forEach(entry => {
        text = text + entry + ", ";
    });
    document.getElementById("statsvalue_highfinishes").innerText = text;
}

async function statsRecentMatches() {
    // matches by match id sorted by created_at
    const matches = supabasedataforstats.reduce((array, entry) => {
        // erstelle eine liste array und für eine neue id ein object
        if (!array[entry.stat_match_id]) {
            array[entry.stat_match_id] = [];
        }
        array[entry.stat_match_id].push(entry);
        return array;
    }, {});
    console.log("matches", matches);

    // convert object to array
    const matchesArray = Object.entries(matches);
    console.log("matchesArray", matchesArray);

    // map array 
    const renamedMatches = matchesArray.map(([match_id, legs]) => {
        let opponent;

        for (let i = 0; i < filteredsupabasedata.length; i++) {
            if (filteredsupabasedata[i].stat_match_id === legs[0].stat_match_id && filteredsupabasedata[i].stat_player_id != playername) {
                console.log("found", filteredsupabasedata[i].stat_player_id);
                opponent = filteredsupabasedata[i].stat_player_id;
                break;
            }
        }
        return {
            date: legs[0].created_at.slice(0, 16),
            legs: legs,
            match_id: legs[0].stat_match_id,
            opponent: opponent,
        }
    });
    console.log("renamedMatches:", renamedMatches);

    // sort by date
    const sortedMatches = renamedMatches.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    console.log("sortedMatches", sortedMatches);

    // slice to last 4 matches
    last4matches = sortedMatches.slice(0, 4);
    // console.log("last4matches:", last4matches);
    
    
    last4matches.forEach(entry => {
        let legswon = 0;
        let legslost = 0;
        entry.legs.forEach(legentry => {
            if (legentry.stat_score_sum === 501) {
                legswon = legswon + 1;
            } else {
                legslost = legslost + 1;
            }
        })
        recent.push(legswon);
        recent.push(legslost);
    })

    // find opponent
    async function findOpponent() {
        let dataMatchId;
        for (const entry of last4matches) {
            entryId = entry.match_id;
            let opponent;
            // console.log("matchid:", entryId);
            dataMatchId = await getDataMatchId(entryId);
            // console.log("dataMatchId:", dataMatchId);

            // dataMatchId durchgehen bis playerid != player
            for (const dataentry of dataMatchId) {
                if (dataentry.stat_player_id != playername) {
                    // console.log("found", dataentry.stat_player_id)
                    opponent = dataentry.stat_player_id;
                    break;
                }
            }
            entry.opponent = opponent;
        }
    }
    await findOpponent();
}
async function applyRecentMatches() {
    document.getElementById("recent1won").innerText = recent[0];
    document.getElementById("recent1lost").innerText = recent[1];
    document.getElementById("recent2won").innerText = recent[2];
    document.getElementById("recent2lost").innerText = recent[3];
    document.getElementById("recent3won").innerText = recent[4];
    document.getElementById("recent3lost").innerText = recent[5];
    document.getElementById("recent4won").innerText = recent[6];
    document.getElementById("recent4lost").innerText = recent[7];

    document.getElementById("recent1text").innerText = `${playername} vs ${last4matches[0].opponent}`;
    document.getElementById("recent2text").innerText = `${playername} vs ${last4matches[1].opponent}`;
    document.getElementById("recent3text").innerText = `${playername} vs ${last4matches[2].opponent}`;
    document.getElementById("recent4text").innerText = `${playername} vs ${last4matches[3].opponent}`;

    function calculatePercentage(a, b) {
        const percentage = 100 / (a + b) * a;
        return percentage
    }
    document.getElementById("bar1").style.width = calculatePercentage(recent[0], recent[1]) + "%";
    document.getElementById("bar2").style.width = calculatePercentage(recent[2], recent[3]) + "%";
    document.getElementById("bar3").style.width = calculatePercentage(recent[4], recent[5]) + "%";
    document.getElementById("bar4").style.width = calculatePercentage(recent[6], recent[7]) + "%";
}

async function statsrun() {
    await statsgetData(playername);
    console.log("stats supabasedata 2", supabasedataforstats);

    let dartcount = await statsCountdarts();
    document.getElementById("statsvalue_darts").innerText = "Darts: " + dartcount;

    let scoresum = await statsScoresum();

    let average = scoresum / dartcount * 3;
    average = Number(average.toFixed(2));
    document.getElementById("statsvalue_average").innerText = "Average: " + average;

    let oneeighty = await statsCount180();
    document.getElementById("statsvalue_180").innerText = "180s: " + oneeighty;

    await statsGetHighfinishes();

    await statsRecentMatches();

    await applyRecentMatches();
}
statsrun();



timeframeselector = document.getElementById("timeframe_selector");

async function getTimemode() {
    let timeframevalue = document.getElementById("timeframe_selector").value;
    // console.log(timeframevalue);
    if (timeframevalue === "1") {
        timemode = "days";
    } else if (timeframevalue === "2") {
        timemode = "weeks";
    } else if (timeframevalue === "3") {
        timemode = "months";
    } else if (timeframevalue === "4") {
        timemode = "legs";
    }
};

timeframeselector.addEventListener("change", () => {
    runRun();
});

