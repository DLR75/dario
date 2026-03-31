// supabase
const supabaseUrl = "https://tretfgmkwrwkurncitma.supabase.co";
const supabaseKey = "sb_publishable_e-fhuxHuNeIUVNIJId9lDQ_lk7ccsgb";
const db = supabase.createClient(supabaseUrl, supabaseKey);

//variables
let playername = "Player 1";
let dates = [];
let filteredsupabasedata = [];
let grouped = [];
let grouped_countdarts = [];
let grouped_scoresum = [];
let chartData = [];
let converteddata = [];

//cleanup
async function cleanUp() {
    dates = [];
    filteredsupabasedata = [];
    grouped = [];
    grouped_countdarts = [];
    grouped_scoresum = [];
    chartData = [];
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
    console.log("dates:", dates);
}
//filter for matches
async function filterDataForMatchingDates (player) {
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
        return dates.includes(entry.date);
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
    console.log("grouped_average:", grouped);
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
    console.log("grouped_countdarts:", grouped_countdarts);
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
    console.log("grouped_scoresum:", grouped_scoresum);
}

//combine + fill gaps
async function fillGaps() {
    chartData = dates.map(date => {
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

// convert data
async function convertData (data) {
    converteddata = data.map((item, i) => ({
        // x: new Date(item.created_at).toLocaleTimeString(),
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

//run
async function run () {
    await cleanUp();
    await createTimeframeDays();
    await filterDataForMatchingDates(playername);
    await group();
    await groupCountdarts();
    await groupScoresum();
    await fillGaps();
    await convertData(chartData);
    drawCanvas(converteddata, 24, 10, 10);
}
run();


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
        c.strokeStyle = "lightgrey"; 
        c.stroke();
    }
    for (let i = 0; i < (diagram_size_x + 1); i++) {
        c.beginPath();
        c.moveTo(e + e * i, e);
        c.lineTo(e + e * i,e * diagram_size_y - e);
        c.strokeStyle = "lightgrey";
        c.stroke();
    }
    //draw legend
    c.beginPath();
    c.moveTo(x0, y0 - (e * diagram_size_y - e * 2));
    c.lineTo(x0, y0);
    c.lineTo(x0 + e * diagram_size_x - e * 2, y0);
    c.strokeStyle = "black";
    c.stroke();
        //draw y numbers
        for (i = 0; i < diagram_size_y - 1; i++) {
            let y = y0 - e * i;
            c.textAlign = "center";
            c.textBaseline = "middle";
            c.fillText(i*y_scale, e/2, y)
        }
            //draw x numbers
        for (i = 0; i < diagram_size_x - 1; i++) {
            let x = x0 + e * i;
            c.textAlign = "center";
            c.textBaseline = "middle";
            c.fillText(i, x, y0 + e / 2)
        }
    //draw graph points
    for (i = 0; i < dataset.length; i++) {
        if (dataset[i].y != 0) {
            let x = dataset[i].x;
            let y = dataset[i].y/y_scale;

            c.beginPath();
            c.arc(x0 + e * x, y0 - e * y, e / 8, 0, Math.PI * 2, false);
            c.strokeStyle = "red";
            c.stroke();
        }
        
    }
    //draw graph line

    const dataset_no_y0 = dataset.filter(item => item.y !== 0);
    console.log(dataset_no_y0);

    for (i = 0; i < dataset_no_y0.length - 1; i++) {
        let x = dataset_no_y0[i].x;
        let y = dataset_no_y0[i].y/y_scale;
        let x2 = dataset_no_y0[i + 1].x;
        let y2 = dataset_no_y0[i + 1].y/y_scale;

        c.beginPath();
        c.moveTo(x0 + e * x, y0 - e * y);
        c.lineTo(x0 + e * x2, y0 - e * y2);
        c.strokeStyle = "black";
        c.stroke();
    }
}

//select player
const input_name_selector = document.getElementById("input_name");
const title = document.getElementById("title");

title.innerText =`${playername} stats`;

input_name_selector.addEventListener("change", () => {
    playername = input_name_selector.value;
    title.innerText =`${playername} stats`;
    run();
})
