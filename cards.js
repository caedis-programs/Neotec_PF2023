var stav;
var otoceno;
var hotovo;

const dvojice = ["11,23", "12,24", "13,31", "14,22", "21,32", "23,34"];

const front = "F";
const back= "<img src='neotec_logo.png'>";

window.addEventListener("load", function(event) {
    const karty = document.getElementsByClassName("card");
    console.log("Startuju hru... Počet kartiček je " + karty.length);
    stav = "idle";
    otoceno = [];
    hotovo = [];
    for (var i = 0; i < karty.length; i++) {
//        karty[i].innerHTML = "B";
        karty[i].innerHTML = back;
        console.log("Kartička $i nastavena na B");
    }
});

function otocit(poziceF) {
    const karticka = document.getElementById(poziceF); // Získat objekt elementu
    switch(karticka.innerHTML) { // Změna stavu
        case "F":
            console.log("Tato karta je už otočená!");
            break;
        case "B":
            karticka.innerHTML = front;
            otoceno.push(karticka);
            break;
    }
}

function karta(radek, sloupec) {
    switch (stav) {
        case 'idle':
            stav = "not_idle"; // Čekám na druhou kartičku
            otocit(radek.toString() + sloupec.toString());
            console.log("Klik na kartičku " + radek + sloupec);
            break;
        case 'not_idle':
            if(otoceno.length === 1) {
                stav = "idle"; // Už mám druhou kartičku
                let pozice = radek.toString() + sloupec.toString();
                otocit(pozice);
                console.log("Klik na kartičku " + radek + sloupec);
                break;
            }
    }

}