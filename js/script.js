let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let pad = $('#pad');
let divMsgEleve = $('#msg-eleve');
let pMsgEleve = $('#msg');
let pBackMsgEleve = $('#back-msg');
let progressB = $ ( "#progressBarRemy");
let valueProgressBar = 100;
let backReal = $('#back-real');
let photoPop = $('#photoPop');
let touches = 1;



// BackGroung
let imgBackround = 'img/map.jpg';
let imageBg = new Image();
imageBg.src = imgBackround;

// Player
let imgLeft = 'img/sprites/left.png';
let imageLeft = new Image();
imageLeft.src = imgLeft;

let imgRight = 'img/sprites/right.png';
let imageRight = new Image();
imageRight.src = imgRight;

let imgUp = 'img/sprites/up.png';
let imageUp = new Image();
imageUp.src = imgUp;

let imgDown = 'img/sprites/down.png';
let imageDown = new Image();
imageDown.src = imgDown;

let playerX = 235;
let playerY = 225;

// Avatar Gwen
let avatarGwen = 'img/avatars/gwen.png';
let avtrGwen = new Image();
avtrGwen.src = avatarGwen;

// Avatar Marcy
let avatarMarcy = 'img/avatars/marcy.png';
let avtrMarcy = new Image();
avtrMarcy.src = avatarMarcy;

// Avatar Marie
let avatarMarie = 'img/avatars/marie.png';
let avtrMarie = new Image();
avtrMarie.src = avatarMarie;

// Avatar Shera
let avatarShera = 'img/avatars/shera.png';
let avtrShera = new Image();
avtrShera.src = avatarShera;

// Avatar Shera
let avatarCeline = 'img/avatars/celine.png';
let avtrCeline = new Image();
avtrCeline.src = avatarCeline;

// Avatar Shera
let avatarJean = 'img/avatars/jean.png';
let avtrJean = new Image();
avtrJean.src = avatarJean;

// Progress Bar
progressB.progressbar ({
    value: 100
});

function regressionPB(){
    valueProgressBar -= (100/6);
    $ (function (){
        progressB.progressbar ({
            value: valueProgressBar
        });
    });
}

// Random
function random(min, max) {
    let nb = min + (max - min + 1) * Math.random();
    return Math.floor(nb);
}

// Eleve (générique)
function eleve(name, message, backMessage, source) {
    this.name = name;
    this.message = message;
    this.backMessage = backMessage;
    this.source = source;
}

// Elèves
let jean = new eleve("Jean", "Rémi, j’ai faim", "Ça me rappelle quand j’ai piraté la carte de la cantine de la fac", 'img/avatars/jean.png');
let shera = new eleve("Shera", "Ça marche  pas", "Il est maudit ton ordi", 'img/avatars/shera.png');
let marcy = new eleve("Marcy", "Rémiiiiii ", "Oui j'arrive", 'img/avatars/marcy.png');
let celine = new eleve("Celine", "Rémy ! J'ai tout fait planter !", "Moi mon rêve c'est de devenir une poule", 'img/avatars/celine.png');
let marie = new eleve("Marie", "Je comprends pas", "Nan mais t'inquiète", 'img/avatars/marie.png');
let gwen = new eleve("Gwen","Rémi l’ordinateur marche plus !","wtf !", 'img/avatars/gwen.png');



let selectionCanvas = $('#canvas');
let selectionBoutonNewGame = $('.newGame');
let selectionReglesDuJeu = $('#regles');

// New Game
pad.hide();
backReal.hide();
progressB.hide();
selectionCanvas.hide();
selectionBoutonNewGame.click(function() {
        pad.toggle(1000),
        selectionCanvas.toggle(1000),
        selectionBoutonNewGame.hide(),
        selectionReglesDuJeu.hide(),
        progressB.toggle(1000),
        backReal.show(1000),
        ctx.drawImage(imageBg, 0, 0, 800, 460, 0, 0, 800, 460),
        ctx.drawImage(imageDown, playerX, playerY),
        showAvatars()
    }
);

// Dialog Chatiment
$(function () {
    $("#chatiment-impromptu").dialog({
        autoOpen: false,
        close: function () {
            pad.show();
            console.log("...");
        },
        resizable: false,
        height: 250,
        width: 400,
        modal: true,
        buttons: {
            "Nope": function () {
                $(this).dialog("close");
                touches = 1;
            }
        }
    });
});

// Message Impromptu
function alertMsgImpromptu() {
    let x = random(1, 20);
    console.log(x);
    if (x == 5) {
        $("#chatiment-impromptu").dialog("open");
        $('.ui-dialog-titlebar').hide();
        pad.hide();
        touches = 0;
    }
}

// Dialog eleve
$(function () {

    divMsgEleve.dialog({
        autoOpen: false,
        close: function () {
            pad.show();
            console.log("...");
        },
        resizable: false,
        height: 300,
        width: 500,
        modal: true,
        buttons: {
            "Fermer": function () {
                $(this).dialog("close");
                touches = 1;
                if (valueProgressBar <=0){
                    // affichage photo
                    console.log("Affichage Photo");
                    popingEnd();
                }
            }
        }
    });
});

// Pop photo
$(function () {
    photoPop.dialog({
        autoOpen: false,
        close: function () {
            pad.show();
            console.log("Bravo");
        },
        resizable: false,
        height: 500,
        width: 650,
        modal: true,
        buttons: {
            "Nope": function () {
                $(this).dialog("close");
            }
        }
    });
});

function popingEnd() {
    photoPop.dialog("open");
    $('.ui-dialog-titlebar').hide();
    $(".ui-dialog-buttonpane").hide();
    pad.hide();
    touches = 0;
}

let noRepeat = [true, true, true, true, true, true];

function messageEleve(eleve) {
    pMsgEleve.html("<img src="+ eleve.source +"><p>" + eleve.name + ' : ' + eleve.message + "</p>");
    pBackMsgEleve.html('<br><p>Rémi : ' + eleve.backMessage + '</p><img src="img/avatars/remiresized.png">');
    divMsgEleve.dialog("open");
    console.log(eleve.message);
    $('.ui-dialog-titlebar').hide();
    regressionPB();
    touches = 0;
    console.log(touches);
    return eleve.message
}

// Message des eleves
function affichagePopMsg() {
    if (playerX > 505 && playerX < 605 && playerY > 15 && playerY < 115 && noRepeat[0]) {
        messageEleve(shera);
        noRepeat[0] = false;
    }
    if (playerX > 415 && playerX < 515 && playerY > 305 && playerY < 405 && noRepeat[1]) {
        messageEleve(marie);
        noRepeat[1] = false;
    }
    if (playerX > 95 && playerX < 195 && playerY > 295 && playerY < 395 && noRepeat[2]) {
        messageEleve(jean);
        noRepeat[2] = false;
    }
    if (playerX > 0 && playerX < 125 && playerY > 0 && playerY < 125 && noRepeat[3]) {
        messageEleve(celine);
        noRepeat[3] = false;
    }
    if (playerX > 295 && playerX < 395 && playerY > 5 && playerY < 105 && noRepeat[4]) {
        messageEleve(gwen);
        noRepeat[4] = false;
    }
    if (playerX > 655 && playerX < 765 && playerY > 275 && playerY < 375 && noRepeat[5]) {
        messageEleve(marcy);
        noRepeat[5] = false;
    }
    else {
        alertMsgImpromptu();
    }
}

// Draw Images
ctx.drawImage(imageBg, 0, 0, 800, 460, 0, 0, 800, 460);
ctx.drawImage(imageDown, playerX, playerY);
let showAvatars = function () {
    ctx.drawImage(avtrGwen, 333, 20); // Position Gwen
    ctx.drawImage(avtrMarcy, 704, 332); // Position Marcy
    ctx.drawImage(avtrMarie, 456, 365); // Position Marie
    ctx.drawImage(avtrShera, 550, 80); // Position Shera
    ctx.drawImage(avtrCeline, 53, 53); // Position Celine
    ctx.drawImage(avtrJean, 135, 355); // Position Jean
};

// Déplacement Player
$("#left").click(function () {
    playerX -= 10;
    console.log("lol " + playerX);
    affichagePopMsg();
    ctx.clearRect(0, 0, 800, 600);
    ctx.drawImage(imageBg, 0, 0, 800, 460, 0, 0, 800, 460);
    showAvatars();
    ctx.drawImage(imageLeft, playerX, playerY);
});

$("#right").click(function () {
    playerX += 10;
    affichagePopMsg();
    console.log("lol " + playerX);
    ctx.clearRect(0, 0, 800, 600);
    ctx.drawImage(imageBg, 0, 0, 800, 460, 0, 0, 800, 460);
    showAvatars();
    ctx.drawImage(imageRight, playerX, playerY);
});


$("#down").click(function () {
    playerY += 10;
    affichagePopMsg();
    console.log("lol " + playerY);
    ctx.clearRect(0, 0, 800, 600);
    ctx.drawImage(imageBg, 0, 0, 800, 460, 0, 0, 800, 460);
    showAvatars();
    ctx.drawImage(imageDown, playerX, playerY);
});

$("#up").click(function () {
    playerY -= 10;
    affichagePopMsg();
    console.log("lol " + playerY);
    ctx.clearRect(0, 0, 800, 600);
    ctx.drawImage(imageBg, 0, 0, 800, 460, 0, 0, 800, 460);
    showAvatars();
    ctx.drawImage(imageUp, playerX, playerY);
});

window.onkeydown = function () {
    let e = event || window.event;
    let key = e.which || e.keyCode;
    if (touches == 1){
        console.log("touches" + touches);
        switch (key) {
            case 37: // left
                playerX -= 10;
                console.log("lol " + playerX);
                affichagePopMsg();
                ctx.clearRect(0, 0, 800, 600);
                ctx.drawImage(imageBg, 0, 0, 800, 460, 0, 0, 800, 460);
                showAvatars();
                ctx.drawImage(imageLeft, playerX, playerY);
                break;
            case 39: // right
                playerX += 10;
                affichagePopMsg();
                console.log("lol " + playerX);
                ctx.clearRect(0, 0, 800, 600);
                ctx.drawImage(imageBg, 0, 0, 800, 460, 0, 0, 800, 460);
                showAvatars();
                ctx.drawImage(imageRight, playerX, playerY);
                break;
            case 40: // down
                playerY += 10;
                affichagePopMsg();
                console.log("lol " + playerY);
                ctx.clearRect(0, 0, 800, 600);
                ctx.drawImage(imageBg, 0, 0, 800, 460, 0, 0, 800, 460);
                showAvatars();
                ctx.drawImage(imageDown, playerX, playerY);
                break;
            case 38: // top
                playerY -= 10;
                affichagePopMsg();
                console.log("lol " + playerY);
                ctx.clearRect(0, 0, 800, 600);
                ctx.drawImage(imageBg, 0, 0, 800, 460, 0, 0, 800, 460);
                showAvatars();
                ctx.drawImage(imageUp, playerX, playerY);
                break;
        }
    }
};