var stav;
stav = "idle";
var otoceno = [];
var hotovo = [];


function startHry() {
    const karti = document.getElementsByClassName("karta");
    for (var i = 0; i < karti.length; i++) {
        karti[i].innerHTML = "B";
    }
}


function resetKarta(item) {
    item.innerText = "B";
}


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