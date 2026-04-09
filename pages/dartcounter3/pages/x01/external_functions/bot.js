export function generateLeg(botaverage, goal) {
    let list = [];

    let turnaverage = goal / botaverage;
    turnaverage = turnaverage.toFixed(0);
    const min = turnaverage - 2;
    const max = Number(turnaverage) + 2;

    generateTurns (min, max);
    fillList(botaverage, goal);
    return [...list];

    function generateTurns (min, max) {
        let dif = max - min + 1;
        const random = Math.floor(Math.random() * dif) + min;
        console.log("turns:", random);

        for (let i = random - 1; i >= 0; i--) {

            list.push(0);
        }
        // console.log("scores:", list);
    }

    function fillList (botaverage, goal) {
        // fill list with random numbers
        list.forEach((num, i, arr) => {
            const random = Math.floor(Math.random() * botaverage * 2) + 0;
            arr[i] = random;
        });

        // console.log("filled list:", list); 

        // find out remaining
        let remaining;
        function checkRemaining () {
            remaining = goal;
            list.forEach((num, i, arr) => {
                remaining = remaining - arr[i];
            });
            // console.log("   remaining",remaining);
        }
        checkRemaining();
        // change list to get 501 to 0
        while (remaining != 0) {
            if (remaining > 0) {

                const keys = Object.keys(list);
                const randomkey = keys[Math.floor(Math.random() * keys.length)];
                list[randomkey] += 1;

            } else {
                for (let i = 0; i < 100; i++) {
                    const keys = Object.keys(list);
                    const randomkey = keys[Math.floor(Math.random() * keys.length)];

                    if (list[randomkey] > 0) {
                        list[randomkey] -= 1;
                        i = 100;
                    }
                }
            }
            checkRemaining();
        }
        // test if last score is 0
        let keys = Object.keys(list);
        let lastkey = keys[keys.length - 1];
        let lastvalue = list[lastkey];

        if (lastvalue === 0) {
            console.log("lastvalue = 0")
            list[lastkey] = 2;
            for (let i = 0; i < 100; i++) {
                if (list[i] >= 2) {
                    list[i] -= 2;
                    i = 100;
                    console.log("fixed lastvalue")
                }
            }
        }
        // test for negative scores
        list.forEach((num, i, arr) => {
            if (arr[i] < 0) {
                console.log("error, negative score", arr[i])
            }
        });
        // log list
        // console.log("fixed list:", list); 
    }
}


// function callFunction (botaverage, goal) {
//     const leg1 = generateLeg(botaverage, goal);
//     const leg2 = generateLeg(botaverage, goal);
//     const leg3 = generateLeg(botaverage, goal);

//     console.log("leg1:", leg1);
//     console.log("leg2:", leg2);
//     console.log("leg3:", leg3);
// }

// let botaverage = 35;
// let goal = 501;
// callFunction(botaverage, goal);