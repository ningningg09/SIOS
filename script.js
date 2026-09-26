// GAME VARIABLES

let currentDay = 1;

let oxygen = 100;
let food = 100;
let power = 100;
let radiationShielding = 100;

let outpost = "";

let waitingForChoice = false;


// LUNAR EVENTS

const lunarEvents = [

    {
        title: "🟢 Quiet Day",

        message:
            "Nothing unusual happened today.",

        choices: []
    },


    {
        title: "🥫 Food Contamination",

        message:
            "Some of your food has been contaminated. What will you do?",

        choices: [

            {
                text: "Discard the contaminated food",
                food: -5,
                oxygen: 0,
                power: 0
            },

            {
                text: "Use a purification system",
                food: 0,
                oxygen: -5,
                power: -5
            }

        ]
    },


    {
        title: "☀️ Solar Panel Dust",

        message:
            "Lunar dust has covered your solar panels.",

        choices: [

            {
                text: "Clean the solar panels",
                food: 0,
                oxygen: 0,
                power: -10
            },

            {
                text: "Ignore the dust",
                food: 0,
                oxygen: -15,
                power: 0,
            }

        ]
    },


    {
        title: "💨 Air Leak",

        message:
            "A small air leak has been detected.",

        choices: [

            {
                text: "Repair the leak",
                food: 0,
                oxygen: -5,
                power: -10
            },

            {
                text: "Ignore the leak",
                food: 0,
                oxygen: -15,
                power: 0
            }

        ]
    },


    {
        title: "⚡ Equipment Failure",

        message:
            "An important piece of equipment has stopped working.",

        choices: [

            {
                text: "Repair the equipment",
                food: 0,
                oxygen: 0,
                power: -15
            },

            {
                text: "Use backup equipment",
                food: -5,
                oxygen: 0,
                power: -5
            }

        ]
    },


    {
        title: "☢️ Shielding system malfunction",

        message:
            "The radiation shielding system has malfunctioned. What will you do?",

        choices: [

            {
                text: "Repair the radiation shielding",
                food: 0,
                oxygen: 0,
                power: -10,
                radiationShielding: -5
            },

            {
                text: "Ignore the leak",
                food: 0,
                oxygen: -10,
                power: 0,
                radiationShielding: -20
            },

            {
                text: "Use backup shielding system",
                food: 0,
                oxygen: 0,
                power: -15,
                radiationShielding: -10
            }

        ]
    }

];


// MARTIAN EVENTS

const martianEvents = [

    {
        title: "🟢 Quiet Day",

        message:
            "Nothing unusual happened today.",

        choices: []
    },


    {
        title: "🥫 Food Contamination",

        message:
            "A portion of your food has been contaminated. What will you do?",

        choices: [

            {
                text: "Discard the contaminated food",
                food: -10,
                oxygen: 0,
                power: 0
            },

            {
                text: "Use a purification system",
                food: 0,
                oxygen: -5,
                power: -10
            }

        ]
    },


    {
        title: "🌪️ Dust Storm",

        message:
            "A powerful Martian dust storm is approaching.",

        choices: [

            {
                text: "Seal the outpost",
                food: -5,
                oxygen: -5,
                power: -10
            },

            {
                text: "Do nothing",
                food: -5,
                oxygen: -10,
                power: -15
            }

        ]
    },


    {
        title: "💨 Habitat Leak",

        message:
            "A pressure leak has been detected.",

        choices: [

            {
                text: "Repair the leak",
                food: 0,
                oxygen: -5,
                power: -15
            },

            {
                text: "Ignore the leak",
                food: 0,
                oxygen: -20,
                power: 0
            }

        ]
    },


    {
        title: "⚡ Major Equipment Failure",

        message:
            "A major piece of equipment has failed.",

        choices: [

            {
                text: "Repair the equipment",
                food: 0,
                oxygen: 0,
                power: -20
            },

            {
                text: "Use backup equipment",
                food: -10,
                oxygen: -5,
                power: -10
            }

        ]
    },


    {
        title: "⚡ Equipment Failure",

        message:
            "An important piece of equipment has stopped working.",

        choices: [

            {
                text: "Repair the equipment",
                food: 0,
                oxygen: 0,
                power: -15
            },

            {
                text: "Use backup equipment",
                food: -5,
                oxygen: 0,
                power: -5
            }

        ]
    }

];


// CHOOSE LUNAR OUTPOST

function chooseLunar() {

    outpost = "lunar";

    document.getElementById("intro").style.display =
        "none";

    document.getElementById("lunarGame").style.display =
        "block";

}


// CHOOSE MARTIAN OUTPOST

function chooseMartian() {

    outpost = "martian";

    document.getElementById("intro").style.display =
        "none";

    document.getElementById("martianGame").style.display =
        "block";

}


// START LUNAR GAME

function startLunarGame() {

    document.getElementById("lunarGame").style.display =
        "none";

    document.getElementById("mainGame").style.display =
        "block";

    document.getElementById("outpostTitle").innerText =
        "🌕 Lunar Outpost";

    startMission();

}


// START MARTIAN GAME

function startMartianGame() {

    document.getElementById("martianGame").style.display =
        "none";

    document.getElementById("mainGame").style.display =
        "block";

    document.getElementById("outpostTitle").innerText =
        "🔴 Martian Outpost";

    startMission();

}


// START MISSION

function startMission() {

    currentDay = 1;

    oxygen = 100;

    food = 100;

    power = 100;

    radiationShielding = 100;

    waitingForChoice = false;

    updateResources();

    document.getElementById("currentDay").innerText =
        currentDay;

    document.getElementById("eventTitle").innerText =
        "🚀 Mission Started";

    document.getElementById("eventMessage").innerText =
        "Your outpost is ready. Survive for 15 days.";

    document.getElementById("choices").innerHTML =
        "";

    document.getElementById("nextButton").style.display =
        "inline-block";

    document.getElementById("nextButton").disabled =
        false;

}


// NEXT DAY

function nextDay() {

    if (waitingForChoice) {

        return;

    }


    if (currentDay >= 15) {

        winGame();

        return;

    }


    currentDay++;


    // DAILY RESOURCE CONSUMPTION

    oxygen = oxygen - 5;

    food = food - 5;

    power = power - 5;

    radiationShielding = radiationShielding - 5;


    // EVENT LIST SELECTION

    let eventList;


    if (outpost === "lunar") {

        eventList = lunarEvents;

    }

    else {

        eventList = martianEvents;

    }


    // RANDOM EVENT

    let randomNumber =
        Math.floor(Math.random() * eventList.length);

    let event =
        eventList[randomNumber];


    // DISPLAY EVENT

    document.getElementById("currentDay").innerText =
        currentDay;

    document.getElementById("eventTitle").innerText =
        event.title;

    document.getElementById("eventMessage").innerText =
        event.message;


    document.getElementById("choices").innerHTML =
        "";


    if (event.choices.length > 0) {

        waitingForChoice = true;

        document.getElementById("nextButton").disabled =
            true;

        createChoices(event.choices);

    }

    else {

        waitingForChoice = false;

        document.getElementById("nextButton").disabled =
            false;

    }


    updateResources();

    checkGameOver();

}


// CHOICES

function createChoices(choices) {

    choices.forEach(function(choice) {

        let button =
            document.createElement("button");


        let buttonText =
            choice.text;


        let costs = [];


        if (choice.oxygen < 0) {

            costs.push(
                Math.abs(choice.oxygen)
                + "% Oxygen"
            );

        }


        if (choice.food < 0) {

            costs.push(
                Math.abs(choice.food)
                + "% Food"
            );

        }


        if (choice.power < 0) {

            costs.push(
                Math.abs(choice.power)
                + "% Power"
            );

        }


        if (choice.radiationShielding < 0) {

            costs.push(
                Math.abs(choice.radiationShielding)
                + "% Radiation Shielding"
            );

        }


        if (costs.length > 0) {

            buttonText +=
                " (-" + costs.join(", -") + ")";

        }


        button.innerText =
            buttonText;


        button.onclick = function() {

            chooseOption(choice);

        };


        document.getElementById("choices")
            .appendChild(button);

    });

}


// CHOOSE AN OPTION

function chooseOption(choice) {

    oxygen += choice.oxygen;

    food += choice.food;

    power += choice.power;

    radiationShielding +=
        choice.radiationShielding || 0;


    // PREVENT NEGATIVE NUMBERS

    if (oxygen < 0) {

        oxygen = 0;

    }

    if (food < 0) {

        food = 0;

    }

    if (power < 0) {

        power = 0;

    }

    if (radiationShielding < 0) {

        radiationShielding = 0;

    }


    updateResources();


    let buttons =
        document.getElementById("choices")
        .getElementsByTagName("button");


    for (
        let i = 0;
        i < buttons.length;
        i++
    ) {

        buttons[i].disabled = true;

    }


    // SHOW WHAT THE PLAYER CHOSE

    document.getElementById("eventMessage").innerText +=
        " You chose: " + choice.text + ".";


    waitingForChoice = false;


    document.getElementById("nextButton").disabled =
        false;


    // CHECK IF PLAYER LOST

    checkGameOver();

}


// UPDATE RESOURCE DISPLAY

function updateResources() {

    document.getElementById("oxygen").innerText =
        oxygen;

    document.getElementById("food").innerText =
        food;

    document.getElementById("power").innerText =
        power;

    document.getElementById("shieldingStat").innerText =
        radiationShielding;

}


// CHECK GAME OVER

function checkGameOver() {

    // IF ANY RESOURCE REACHES 0, YOU LOSE

    if (
        oxygen <= 0 ||
        food <= 0 ||
        power <= 0 ||
        radiationShielding <= 0
    ) {

        loseGame();

        return true;

    }


    return false;

}


// LOSE GAME

function loseGame() {

    waitingForChoice = false;


    document.getElementById("eventTitle").innerText =
        "💀 MISSION FAILED";


    if (oxygen <= 0) {

        document.getElementById("eventMessage").innerText =
            "Your oxygen reached 0%. The crew could not survive.";

    }

    else if (food <= 0) {

        document.getElementById("eventMessage").innerText =
            "Your food reached 0%. The crew could not survive.";

    }

    else if (power <= 0) {

        document.getElementById("eventMessage").innerText =
            "Your power reached 0%. The outpost could no longer function.";

    }

    else if (radiationShielding <= 0) {

        document.getElementById("eventMessage").innerText =
            "Your radiation shielding reached 0%. The crew was exposed to dangerous radiation.";

    }


    document.getElementById("choices").innerHTML =
        "";


    document.getElementById("nextButton").disabled =
        true;

}


// WIN GAME

function winGame() {

    waitingForChoice = false;


    document.getElementById("eventTitle").innerText =
        "🏆 MISSION COMPLETE!";


    document.getElementById("eventMessage").innerText =
        "You survived all 15 days!";


    document.getElementById("choices").innerHTML =
        "";


    document.getElementById("nextButton").disabled =
        true;

}


// EDITING NOTES

// - Add radiation shielding as a resource
// - Add a new event for radiation shielding
// - Add a timer for each day (approx 30s)
