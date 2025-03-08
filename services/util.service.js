import { DESCENT, LIGHT, SERIOUS, READER_TYPE_NAMES, ERAS, NEW, VINTAGE, EXPENSIVE, PRICE_CLASSES, CHEAP } from './constants.js';

export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function getRandomNumber(digitsCount) {
    const multiplier = Math.pow(10, digitsCount)
    console.log(multiplier)
    return Math.ceil(Math.random() * multiplier)
}

export function getReaderLevel(pagesCount) {
    if (!pagesCount) return READER_TYPE_NAMES.NA

    const levels = {
        [SERIOUS]: () => pagesCount >= 500,
        [DESCENT]: () => pagesCount >= 200 && pagesCount < 500,
        [LIGHT]: () => pagesCount < 200,
    }

    const readerType = Object.keys(levels).find(level => levels[level]());
    return READER_TYPE_NAMES[readerType];
}

export function getBookEra(publishedDate) {
    if (!publishedDate) return ERAS.NA;

    const eras = {
        [VINTAGE]: () => new Date().getFullYear() - Number(publishedDate) > 10,
        [NEW]: () => new Date().getFullYear() - Number(publishedDate) <= 10
    }

    const era = Object.keys(eras).find(era => eras[era]());
    return ERAS[era];
}

export const getPriceColor = (price) => {
    if (!price) return PRICE_CLASSES[DESCENT];

    const priceTags = {
        [EXPENSIVE]: () => price >= 150,
        [CHEAP]: () => price < 20,
    }

    const priceTagName = Object.keys(priceTags).find(priceTag => priceTags[priceTag]());

    return PRICE_CLASSES[priceTagName] || PRICE_CLASSES[DESCENT];
}
