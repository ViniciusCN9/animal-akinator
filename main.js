/* ELEMENTOS DA TELA */
const CONTAINER_BUBBLE_AKINATOR = document.getElementById("ctn-bubble-akinator")
const CONTAINER_BUBBLE_CONTINUE = document.getElementById("ctn-bubble-continue")
const CONTAINER_BUBBLE_USER = document.getElementById("ctn-bubble-user")
const CONTAINER_BUBBLE_EXIT = document.getElementById("ctn-bubble-exit")
const CONTAINER_INITIAL = document.getElementById("ctn-initial")
const CONTAINER_GAME = document.getElementById("ctn-game")
const MUSIC_AUDIO = document.getElementById("aud-music")
const MUSIC_BUTTON_ON = document.getElementById("btn-music-on")
const MUSIC_BUTTON_OFF = document.getElementById("btn-music-off")

/* CONSTANTES */
const DISPLAY_NONE_CLASS = "d-none"
const DISPLAY_FLEX_CLASS = "d-flex"
const AKINATOR_IMAGE_01 = "./images/akinator-01.webp"
const AKINATOR_IMAGE_02 = "./images/akinator-02.webp"
const AKINATOR_IMAGE_03 = "./images/akinator-03.webp"
const AKINATOR_IMAGE_04 = "./images/akinator-04.webp"
const AKINATOR_IMAGE_05 = "./images/akinator-05.webp"
const QUESTION_IS_MAMMAL = "Esse animal é um mamífero?"
const QUESTION_IS_BIRD = "Esse animal é uma ave?"
const QUESTION_IS_REPTILE = "Esse animal é um réptil?"
const EXPLAIN_MESSAGE = "Escolha um animal e responda as perguntas!"
const SUCCESS_MESSAGE = "E o animal é: "
const ERROR_MESSAGE = "Não foi possível identificar o animal!"

/* ENTIDADE */
class Animal {
    constructor(name, type, locomotion, habitat, food) {
        this.name = name
        this.type = type
        this.locomotion = locomotion
        this.habitat = habitat
        this.food = food
    }

    reset() {
        this.name = null
        this.type = null
        this.locomotion = null
        this.habitat = null
        this.food = null
    }
}

/* VARIÁVEIS GLOBAIS */
var animal = new Animal(null, null, null, null, null)
var exclusions = []

/* CONTROLES DE MÚSICA */
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

/* CONTROLES DO JOGO */
function playGame() {
    if (CONTAINER_INITIAL.classList.contains(DISPLAY_FLEX_CLASS) && CONTAINER_GAME.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_INITIAL.classList.replace(DISPLAY_FLEX_CLASS, DISPLAY_NONE_CLASS)
        CONTAINER_GAME.classList.replace(DISPLAY_NONE_CLASS, DISPLAY_FLEX_CLASS)
    }
    showContinue()
    reset()
}

function closeGame() {
    if (CONTAINER_GAME.classList.contains(DISPLAY_FLEX_CLASS) && CONTAINER_INITIAL.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_GAME.classList.replace(DISPLAY_FLEX_CLASS, DISPLAY_NONE_CLASS)
        CONTAINER_INITIAL.classList.replace(DISPLAY_NONE_CLASS, DISPLAY_FLEX_CLASS)
    }
    reset()
}

/* EXIBIÇÕES */
function showContinue() {
    CONTAINER_BUBBLE_AKINATOR.innerHTML = EXPLAIN_MESSAGE

    if (CONTAINER_BUBBLE_CONTINUE.classList.contains(DISPLAY_NONE_CLASS) && !CONTAINER_BUBBLE_EXIT.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_BUBBLE_CONTINUE.classList.remove(DISPLAY_NONE_CLASS)
        CONTAINER_BUBBLE_EXIT.classList.add(DISPLAY_NONE_CLASS)
    }
}

function showChoice() {
    CONTAINER_BUBBLE_AKINATOR.innerHTML = QUESTION_IS_MAMMAL

    if (CONTAINER_BUBBLE_USER.classList.contains(DISPLAY_NONE_CLASS) && !CONTAINER_BUBBLE_EXIT.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_BUBBLE_USER.classList.replace(DISPLAY_NONE_CLASS, DISPLAY_FLEX_CLASS)
        CONTAINER_BUBBLE_EXIT.classList.add(DISPLAY_NONE_CLASS)
    }

    if (CONTAINER_BUBBLE_USER.classList.contains(DISPLAY_NONE_CLASS) && !CONTAINER_BUBBLE_CONTINUE.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_BUBBLE_USER.classList.replace(DISPLAY_NONE_CLASS, DISPLAY_FLEX_CLASS)
        CONTAINER_BUBBLE_CONTINUE.classList.add(DISPLAY_NONE_CLASS)
    }
}

function showExit() {
    if (CONTAINER_BUBBLE_USER.classList.contains(DISPLAY_FLEX_CLASS) && CONTAINER_BUBBLE_EXIT.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_BUBBLE_USER.classList.replace(DISPLAY_FLEX_CLASS, DISPLAY_NONE_CLASS)
        CONTAINER_BUBBLE_EXIT.classList.remove(DISPLAY_NONE_CLASS)
    }
}

function showError() {
    CONTAINER_BUBBLE_AKINATOR.innerHTML = ERROR_MESSAGE
    showExit()
}

function showSuccess() {
    CONTAINER_BUBBLE_AKINATOR.innerHTML = SUCCESS_MESSAGE + animal.type // Aqui será o animal.name
    showExit()
}

/* MANIPULAÇÃO */
function handle(isTrue) {
    if (animal.type == null) {
        if (!exclusions.includes("mammal")) {
            let type = isTrue ? "mammal" : null
            console.log(type)
            if (type == null) {
                CONTAINER_BUBBLE_AKINATOR.innerHTML = QUESTION_IS_BIRD
                exclusions.push("mammal")
                return
            }
            animal.type = type
            showSuccess() // Não será exibido aqui
            return
        }
        if (!exclusions.includes("bird")) {
            let type = isTrue ? "bird" : null
            console.log(type)
            if (type == null) {
                CONTAINER_BUBBLE_AKINATOR.innerHTML = QUESTION_IS_REPTILE
                exclusions.push("bird")
                return
            }
            animal.type = type
            showSuccess() // Não será exibido aqui
            return
        }
        if (!exclusions.includes("reptile")) {
            let type = isTrue ? "reptile" : null
            console.log(type)
            if (type == null) {
                showError()
                return
            }
            animal.type = type
            showSuccess() // Não será exibido aqui
            return
        }
    }
    // TODO: Terminar implementação para os demais tipos
}

/* UTILITADES */
function reset() {

    exclusions = []
    animal.reset()
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


