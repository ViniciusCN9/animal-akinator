/* ELEMENTOS DA TELA */
const CONTAINER_BUBBLE_AKINATOR = document.getElementById("ctn-bubble-akinator")
const CONTAINER_BUBBLE_CONTINUE = document.getElementById("ctn-bubble-continue")
const CONTAINER_BUBBLE_USER = document.getElementById("ctn-bubble-user")
const CONTAINER_BUBBLE_EXIT = document.getElementById("ctn-bubble-exit")
const CONTAINER_INITIAL = document.getElementById("ctn-initial")
const CONTAINER_GAME = document.getElementById("ctn-game")
const CONTAINER_LOADING = document.getElementById("ctn-loading")
const MUSIC_AUDIO = document.getElementById("aud-music")
const MUSIC_BUTTON_ON = document.getElementById("btn-music-on")
const MUSIC_BUTTON_OFF = document.getElementById("btn-music-off")
const AKINATOR_IMAGE = document.getElementById("img-akinator")

/* ENTIDADES */
class Animal {
    constructor(name, translatedName, type, info, image) {
        this.name = name
        this.translatedName = translatedName
        this.type = type
        this.info = info
        this.image = image
    }

    reset() {
        this.name = null
        this.translatedName = null
        this.type = null
        this.info = null
        this.image = null
    }
}

class Type {
    constructor(id, name, question, locomotion) {
        this.id = id
        this.name = name
        this.question = question
        this.locomotion = locomotion
    }
}

class Locomotion {
    constructor(id, name, question, additional) {
        this.id = id
        this.name = name
        this.question = question
        this.additional = additional
    }
}

class Additional {
    constructor(id, name, question) {
        this.id = id
        this.name = name
        this.question = question
    }
}

class Filter {
    constructor(type, locomotion, additional) {
        this.type = type
        this.locomotion = locomotion
        this.additional = additional
    }
}

/* CONSTANTES */
const DISPLAY_NONE_CLASS = "d-none"
const DISPLAY_FLEX_CLASS = "d-flex"
const AKINATOR_IMAGE_01 = "https://viniciuscn9.github.io/animal-akinator/docs/assets/akinator-01.webp"
const AKINATOR_IMAGE_02 = "https://viniciuscn9.github.io/animal-akinator/docs/assets/akinator-02.webp"
const AKINATOR_IMAGE_03 = "https://viniciuscn9.github.io/animal-akinator/docs/assets/akinator-03.webp"
const AKINATOR_IMAGE_04 = "https://viniciuscn9.github.io/animal-akinator/docs/assets/akinator-04.webp"
const AKINATOR_IMAGE_05 = "https://viniciuscn9.github.io/animal-akinator/docs/assets/akinator-05.webp"

const QUESTION_STATE = {
    isType: "isType",
    isLocomotion: "isLocomotion",
    isAdditonal: "isAdditional"
}

const EXPLAIN_MESSAGE = "Escolha um animal e responda as perguntas!"
const ERROR_MESSAGE = "Não foi possível identificar o animal!"

/* VARIÁVEIS GLOBAIS */
var animals
var animal
var filter
var types
var actualType
var locomotions
var actualLocomotion
var additionals
var actualAdditional

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
    resetGame()
    if (CONTAINER_LOADING.classList.contains(DISPLAY_FLEX_CLASS) && CONTAINER_GAME.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_LOADING.classList.replace(DISPLAY_FLEX_CLASS, DISPLAY_NONE_CLASS)
        CONTAINER_GAME.classList.replace(DISPLAY_NONE_CLASS, DISPLAY_FLEX_CLASS)
    }
    showContinue()
}

function closeGame() {
    if (CONTAINER_GAME.classList.contains(DISPLAY_FLEX_CLASS) && CONTAINER_INITIAL.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_GAME.classList.replace(DISPLAY_FLEX_CLASS, DISPLAY_NONE_CLASS)
        CONTAINER_INITIAL.classList.replace(DISPLAY_NONE_CLASS, DISPLAY_FLEX_CLASS)
    }
    resetGame()
}

/* EXIBIÇÕES */
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
    changeAkinatorImage(AKINATOR_IMAGE_05)
    console.log(animal)
    console.log(animals)
    CONTAINER_BUBBLE_AKINATOR.innerHTML = `<div id="ctn-bubble-akinator-success" class="d-flex flex-column justify-content-center align-items-center"><h3><strong>${animal.translatedName.toUpperCase()}</strong></h3><img src="${animal.image}" title="${animal.info}" width = 400px, height = 300px></div>`
    showExit()
}

function showContinue() {
    CONTAINER_BUBBLE_AKINATOR.innerHTML = EXPLAIN_MESSAGE

    if (CONTAINER_BUBBLE_CONTINUE.classList.contains(DISPLAY_NONE_CLASS) && !CONTAINER_BUBBLE_EXIT.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_BUBBLE_CONTINUE.classList.remove(DISPLAY_NONE_CLASS)
        CONTAINER_BUBBLE_EXIT.classList.add(DISPLAY_NONE_CLASS)
    }
}

function showQuestion(question) {
    CONTAINER_BUBBLE_AKINATOR.innerHTML = question
}

function showChoice() {
    if (CONTAINER_BUBBLE_USER.classList.contains(DISPLAY_NONE_CLASS) && !CONTAINER_BUBBLE_EXIT.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_BUBBLE_USER.classList.replace(DISPLAY_NONE_CLASS, DISPLAY_FLEX_CLASS)
        CONTAINER_BUBBLE_EXIT.classList.add(DISPLAY_NONE_CLASS)
    }

    if (CONTAINER_BUBBLE_USER.classList.contains(DISPLAY_NONE_CLASS) && !CONTAINER_BUBBLE_CONTINUE.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_BUBBLE_USER.classList.replace(DISPLAY_NONE_CLASS, DISPLAY_FLEX_CLASS)
        CONTAINER_BUBBLE_CONTINUE.classList.add(DISPLAY_NONE_CLASS)
    }

    handleQuestion(QUESTION_STATE.isType)
    setRandomAkinatorImage()
}

async function showLoading() {
    if (CONTAINER_INITIAL.classList.contains(DISPLAY_FLEX_CLASS) && CONTAINER_LOADING.classList.contains(DISPLAY_NONE_CLASS)) {
        CONTAINER_INITIAL.classList.replace(DISPLAY_FLEX_CLASS, DISPLAY_NONE_CLASS)
        CONTAINER_LOADING.classList.replace(DISPLAY_NONE_CLASS, DISPLAY_FLEX_CLASS)
    }

    await sleep(3000)

    playGame()
}

/* MANIPULAÇÕES */
function handleQuestion(questionState) {
    switch (questionState) {
        case QUESTION_STATE.isType: {
            if (Array.isArray(types) && types.length) {
                actualType = types[0]
                showQuestion(actualType.question)
                types.shift()
            } else {
                showError()
            }
            break
        }
        case QUESTION_STATE.isLocomotion: {
            if (Array.isArray(locomotions) && locomotions.length) {
                actualLocomotion = locomotions[0]
                showQuestion(actualLocomotion.question)
                locomotions.shift()
            } else {
                showError()
            }
            break
        }
        case QUESTION_STATE.isAdditonal: {
            if (Array.isArray(additionals) && additionals.length) {
                actualAdditional = additionals[0]
                showQuestion(actualAdditional.question)
                additionals.shift()
            } else {
                showError()
            }
            break
        }
        default:
            showError()
    }
} 

function handleChoice(isTrue) {
    setRandomAkinatorImage()

    if (filter.type == null) {
        if (isTrue) {
            filter.type = actualType
            locomotions = filter.type.locomotion
            handleQuestion(QUESTION_STATE.isLocomotion)
            return
        } else {
            handleQuestion(QUESTION_STATE.isType)
            return
        }
    }

    if (filter.locomotion == null) {
        if (isTrue) {
            filter.locomotion = actualLocomotion
            additionals = filter.locomotion.additional
            if (additionals.length) {
                handleQuestion(QUESTION_STATE.isAdditonal)
                return
            }
            filter.additional = new Additional(0, "", "")
        } else {
            handleQuestion(QUESTION_STATE.isLocomotion)
            return
        }
    }

    if (filter.additional == null) {
        if (isTrue) {
            filter.additional = actualAdditional
        } else {
            handleQuestion(QUESTION_STATE.isAdditonal)
            return
        }
    }

    findAnimal()
}

/* UTILIDADES */
function resetGame() {
    animal = null
    filter = new Filter(null, null, null)
    actualAdditional = null
    actualLocomotion = null
    actualType = null

    changeAkinatorImage(AKINATOR_IMAGE_01)

    loadAdditionals()
    loadLocomotions()
    loadTypes()
    loadAnimals()
}

function findAnimal() {
    animal = animals.find((object) =>
        object.type.name === filter.type.name &&
        object.type.locomotion.name === filter.locomotion.name &&
        object.type.locomotion.additional.name === filter.additional.name)
    showSuccess()
}

function loadAnimals() {
    animals = []
    readJSON("./database/animals.json").then((response) => {
        response.forEach((item) => {
            animals.push(
                new Animal(
                    item.name,
                    item.translatedName,
                    new Type(
                        item.type.id,
                        item.type.name,
                        item.type.question,
                        new Locomotion(
                            item.type.locomotion.id,
                            item.type.locomotion.name,
                            item.type.locomotion.question,
                            new Additional(
                                item.type.locomotion.additional.id,
                                item.type.locomotion.additional.name,
                                item.type.locomotion.additional.question
                            )
                        )
                    ),
                    item.info,
                    item.image
                )
            )
        })
    })
}

function loadAdditionals() {
    additionals = []
    readJSON("./database/additionals.json").then((response) => {
        response.forEach(item => {
            additionals.push(
                new Additional(item.id, item.name, item.question)
            )
        })
    })
}

function loadLocomotions() {
    locomotions = []
    readJSON("./database/locomotions.json").then((response) => {
        response.forEach(item => {
            let additional = additionals.filter((e) => item.additional.includes(e.id))
            locomotions.push(
                new Locomotion(item.id, item.name, item.question, additional)
            )
        })
    })
}

function loadTypes() {
    types = []
    readJSON("./database/types.json").then((response) => {
        response.forEach(item => {
            let locomotion = locomotions.filter((e) => item.locomotion.includes(e.id))
            types.push(
                new Type(item.id, item.name, item.question, locomotion)
            )
        })
    })
}

async function readJSON(path) {
    const object = await fetch(path)
    return await object.json()
}

function changeAkinatorImage(path) {
    AKINATOR_IMAGE.style["background-image"] = `url(${path})`
}

function  setRandomAkinatorImage() {
    let images = [AKINATOR_IMAGE_01, AKINATOR_IMAGE_02, AKINATOR_IMAGE_03, AKINATOR_IMAGE_04]
    let random = Math.floor(Math.random() * images.length)
    let path = images[random]
    changeAkinatorImage(path)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}