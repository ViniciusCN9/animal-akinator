const CONTAINER_INITIAL = document.getElementById("ctn-initial")
const CONTAINER_GAME = document.getElementById("ctn-game")
const MUSIC_AUDIO = document.getElementById("aud-music")
const MUSIC_BUTTON_ON = document.getElementById("btn-music-on")
const MUSIC_BUTTON_OFF = document.getElementById("btn-music-off")

const DISPLAY_NONE_CLASS = "d-none"
const DISPLAY_FLEX_CLASS = "d-flex"

/* CONTROLES DA MÚSICA */
function setMusicOff() {
    MUSIC_BUTTON_ON.classList.add(DISPLAY_NONE_CLASS)
    MUSIC_BUTTON_OFF.classList.remove(DISPLAY_NONE_CLASS)
    MUSIC_AUDIO.pause()
}

function setMusicOn() {
    MUSIC_BUTTON_OFF.classList.add(DISPLAY_NONE_CLASS)
    MUSIC_BUTTON_ON.classList.remove(DISPLAY_NONE_CLASS)
    MUSIC_AUDIO.play()
}

function playGame() {
    if (CONTAINER_INITIAL.classList.contains(DISPLAY_FLEX_CLASS) && CONTAINER_GAME.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_INITIAL.classList.replace(DISPLAY_FLEX_CLASS, DISPLAY_NONE_CLASS)
        CONTAINER_GAME.classList.replace(DISPLAY_NONE_CLASS, DISPLAY_FLEX_CLASS)
    }
}

// let input = "input";

// print("Esse animal é um mamífero? ");
// input = "get input";

// if (input == sim) {
//     print("Esse animal é um quadrúpede? ");
//     input = "get input";

//     if (input == sim) {
//         print("Esse animal é carnívoro? ");
//         input = "get input";

//         if (input == sim) {
//             print("Esse animal é um leão");
//             break;
//         }

//         else {
//             print("Esse animal é um cavalo");
//             break;
//         }
//     }

//     else {
//         print("Esse animal é um bípede? ");
//         input = "get input";

//         if (input == sim) {
//             print("Esse animal é onívoro? ");
//             input = "get input";

//             if (input == sim) {
//                 print("Esse animal é um homem");
//                 break;
//             }

//             else {
//                 print("Esse animal é um macaco");
//                 break;
//             }
//         }

//         else {
//             print("Esse animal é voador? ");
//             input = "get input";

//             if (input == sim) {
//                 print("Esse animal é um morcego");
//                 break;
//             }

//             else {
//                 print("Esse animal é uma baleia");
//                 break;
//             }
//         }
//     }
// }

// else {
//     print("Esse animal é uma ave?");
//     input = "get input";




// }
// if (input = sim) {
//     print("Esse animal é do tipo Não-voador?")
//     input = "get input";

//     if (input = sim) {
//         print("Esse animal é do tipo Tropical?")
//         input = "get input";

//         if (input = sim) {
//             print("Esse animal é um Avestruz?")
//             input = "get input";

//             else
//             print("Esse animal é do tipo polar, e é um Pinguim");
//         }


