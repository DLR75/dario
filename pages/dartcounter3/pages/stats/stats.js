// supabase
const supabaseUrl = "https://tretfgmkwrwkurncitma.supabase.co";
const supabaseKey = "sb_publishable_e-fhuxHuNeIUVNIJId9lDQ_lk7ccsgb";
const db = supabase.createClient(supabaseUrl, supabaseKey);

//data
let data = [
    {x: 0, y: 5},
    {x: 1, y: 3},
    {x: 2, y: 6},
    {x: 3, y: 7},
    {x: 4, y: 3},
    {x: 5, y: 2},
    {x: 6, y: 3},
    {x: 7, y: 5},
    {x: 8, y: 3},
    {x: 9, y: 6},
    {x: 10, y: 7},
    {x: 11, y: 3},
    {x: 12, y: 2},
    {x: 13, y: 3},
    {x: 14, y: 5},
    {x: 15, y: 3},
    {x: 16, y: 6},
    {x: 17, y: 7},
    {x: 18, y: 3},
    {x: 19, y: 2},
    {x: 20, y: 3},
    {x: 21, y: 5},
    {x: 22, y: 3},
    {x: 23, y: 6},
    {x: 24, y: 7},
    {x: 25, y: 3},
    {x: 26, y: 2},
    {x: 27, y: 3},
];
const playername = "Player 1";
start(playername);

async function start (player) {
    const supabasedata = await getData(player);
    
    const converteddata = convertData(supabasedata);
    console.log("converteddata:", converteddata);
    drawCanvas(converteddata, 24, 10, 10);
}

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

function convertData (data) {
    return data.map((item, i) => ({
        // x: new Date(item.created_at).toLocaleTimeString(),
        x: i,
        y: item.stat_average
    }));
}




//canvas function
function drawCanvas (dataset, x, y, y_scale) {
    //canvas
    let canvas = document.querySelector("canvas");

    let diagram_size_x = x + 2;
    let diagram_size_y = y + 2;

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
        let x = dataset[i].x;
        let y = dataset[i].y/y_scale;

        c.beginPath();
        c.arc(x0 + e * x, y0 - e * y, e / 8, 0, Math.PI * 2, false);
        c.strokeStyle = "red";
        c.stroke();
    }
    //draw graph line
    for (i = 0; i < dataset.length - 1; i++) {
        let x = dataset[i].x;
        let y = dataset[i].y/y_scale;
        let x2 = dataset[i + 1].x;
        let y2 = dataset[i + 1].y/y_scale;

        c.beginPath();
        c.moveTo(x0 + e * x, y0 - e * y);
        c.lineTo(x0 + e * x2, y0 - e * y2);
        c.strokeStyle = "black";
        c.stroke();
    }
}

