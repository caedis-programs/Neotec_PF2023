var stav;
stav = "idle";
var otoceno = [];
var hotovo = [];

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
    switch(karticka.innerText) { // Změna stavu
        case "F":
            karticka.innerHTML = "B";
            break;
        case "B":
            karticka.innerHTML = "F";
            break;
    }
}

function karta(radek, sloupec) {
    switch (stav) {
        case 'idle':
            stav = "not_idle"; // Čekám na druhou kartičku
            otocit(radek.toString() + sloupec.toString());
            console.log("Klik na kartičku na řádku " + radek + sloupec);
            break;
        case 'not_idle':
            stav = "idle"; // Už mám druhou kartičku
            let pozice = radek.toString() + sloupec.toString();
            otocit(pozice);
            console.log("Klik na kartičku na řádku " + radek + sloupec);
            break;
    }

}