var stav;
var otoceno;
var hotovo;

const flip = new Audio("flip.ogg");

const dvojice = ["11,14", "12,33", "13,32", "21,23", "22,34", "24,31"];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*
* P .
* F .
* 2 .
* 2? .
* 2??
* */

let text = '{ "cards" : [' +
    '{ "pozice":"11" , "letter":"F" },' +
    '{ "pozice":"12" , "letter":"2?" },' +
    '{ "pozice":"13" , "letter":"2??" },' +
    '{ "pozice":"14" , "letter":"F" },' +
    '{ "pozice":"21" , "letter":"0" },' +
    '{ "pozice":"22" , "letter":"P" },' +
    '{ "pozice":"23" , "letter":"0" },' +
    '{ "pozice":"24" , "letter":"2" },' +
    '{ "pozice":"31" , "letter":"2" },' +
    '{ "pozice":"32" , "letter":"2??" },' +
    '{ "pozice":"33" , "letter":"2?" },' +
    '{ "pozice":"34" , "letter":"P" },' +
    ']}';

const back = "<img src='neotec_logo.png'>";

window.addEventListener("load", function(event) {
    const karty = document.getElementsByClassName("card");
    console.log("Startuju hru... Počet kartiček je " + karty.length);
    stav = "idle";
    otoceno = [];
    hotovo = [];
    for (var i = 0; i < karty.length; i++) {
//        karty[i].innerHTML = "B";
        karty[i].innerHTML = back;
        karty[i].dataset.status = "B";
        console.log("Kartička $i nastavena na B");
    }
});

function isThisTheCouple(couple) {
    console.log("Kontroluji zda " + couple + " je couple...");
    return dvojice.includes(couple);
}

async function winGame() {
    console.log("Konec hry");
    const lettercont = document.querySelector(".resultbox");
    const messagecont = document.querySelector(".msgbox");
    const l2 = document.getElementById('letter-2??');
    const podpisy = document.querySelector(".podpisy");
    await sleep(600);
    lettercont.style.top = "30%";
    lettercont.style.left = "50%";
    lettercont.style.bottom = "auto";
    lettercont.style.borderRadius = "20px";
    lettercont.style.transform = "translate(-50%, -50%) scale(2.0)";
    await sleep(1500);

    l2.style.textDecoration = "line-through";
    l2.style.textDecorationThickness = "6px";
    l2.style.textDecorationColor = "red";
    console.log(l2);
    await sleep(1500);
    l2.style.textDecoration = "none";
    l2.innerHTML = "<span style='color: #ffffff; font-family: Rubik Burned, cursive;'>3</span>";

    messagecont.style.display = "block";

    podpisy.style.display = "block";
}

function getPismenko(poziceF) {
    var retText = "ERROR";
    switch (poziceF) {
        case '11':
            retText = "<span style='color: #ffffff; font-family: Rubik Distressed, cursive'>F</span>";
            break;
        case '12':
            retText = "<span style='color: #ffffff; font-family: Rubik Microbe, cursive;'>2</span>";
            break;
        case '13':
            retText = "<span style='color: #ffffff; font-family: Rubik Burned, cursive;'>2</span>";
            break;
        case '14':
            retText = "<span style='color: #ffffff; font-family: Rubik Distressed, cursive;'>F</span>";
            break;
        case '21':
            retText = "<span style='color: #ffffff; font-family: Rubik Distressed, cursive;'>0</span>";
            break;
        case '22':
            retText = "<span style='color: #ffffff; font-family: Rubik Distressed, cursive;'>P</span>";
            break;
        case '23':
            retText = "<span style='color: #ffffff; font-family: Rubik Distressed, cursive;'>0</span>";
            break;
        case '24':
            retText = "<span style='color: #ffffff; font-family: Rubik Distressed, cursive;'>2</span>";
            break;
        case '31':
            retText = "<span style='color: #ffffff; font-family: Rubik Distressed, cursive;'>2</span>";
            break;
        case '32':
            retText = "<span style='color: #ffffff; font-family: Rubik Burned, cursive;'>2</span>";
            break;
        case '33':
            retText = "<span style='color: #ffffff; font-family: Rubik Microbe, cursive;'>2</span>";
            break;
        case '34':
            retText = "<span style='color: #ffffff; font-family: Rubik Distressed, cursive;'>P</span>";
            break
    }
    return retText;
}

function getRawPismenko(poziceF) {
    var retText = "ERROR";
    switch (poziceF) {
        case '11':
            retText = "F";
            break;
        case '12':
            retText = "2?";
            break;
        case '13':
            retText = "2??";
            break;
        case '14':
            retText = "F";
            break;
        case '21':
            retText = "0";
            break;
        case '22':
            retText = "P";
            break;
        case '23':
            retText = "0";
            break;
        case '24':
            retText = "2";
            break;
        case '31':
            retText = "2";
            break;
        case '32':
            retText = "2??";
            break;
        case '33':
            retText = "2?";
            break;
        case '34':
            retText = "P";
            break;
    }
    return retText;
}

async function otocit(poziceF) {
    const karticka = document.getElementById(poziceF); // Získat objekt elementu
    switch (karticka.dataset.status) { // Změna stavu
        case "F":
            console.log("Tato karta je už otočená!");
            break;
        case "B":
            console.log("Otočených kartiček: " + otoceno.length);
            console.log("Otáčím na front...");
            flip.play();
            karticka.innerHTML = getPismenko(poziceF);
            karticka.dataset.status = "F";
            otoceno.push(karticka);
            console.log("Otočených kartiček: " + otoceno.length);
            if (otoceno.length > 1) {
                if (isThisTheCouple(otoceno[0].id + "," + otoceno[1].id) || isThisTheCouple(otoceno[1].id + "," + otoceno[0].id)) {
                    console.log("It's a match! : " + otoceno[0].id + "," + otoceno[1].id);
                    hotovo.push(otoceno[0].id + "," + otoceno[1].id);
                    console.log("Momentální počet párů : " + hotovo.length);
                    const letterbox = document.getElementById("letter-" + getRawPismenko(poziceF)); // Získat objekt elementu
                    letterbox.innerHTML = getPismenko(poziceF);
                    await sleep(1000);
                    karticka.style.opacity = 0;
                    otoceno[0].style.opacity = 0;
                    otoceno = [];
                    if (hotovo.length === 6) {
                        winGame();
                    }
                } else {
                    var tempKarta = otoceno[0];
                    otoceno = [];
                    console.log("Otáčím karty zpátky...");
                    await sleep(1000);
                    console.log("Otočeno zpět!");
                    tempKarta.dataset.status = "B";
                    tempKarta.innerHTML = back;
                    karticka.dataset.status = "B";
                    karticka.innerHTML = back;
                }
            }
            break;
    }
}

function karta(radek, sloupec) {
    console.log("Stav akce je: " + stav);
    console.log("Klik na kartičku " + radek + sloupec);
    switch (stav) {
        case 'idle':
            stav = "not_idle"; // Čekám na druhou kartičku
            otocit(radek.toString() + sloupec.toString());
            break;
        case 'not_idle':
            stav = "idle"; // Už mám druhou kartičku
            let pozice = radek.toString() + sloupec.toString();
            otocit(pozice);
            break;
    }

}