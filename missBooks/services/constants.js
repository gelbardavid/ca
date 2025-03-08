
export const NA = 'NA';

export const SERIOUS = 'serious';
export const DESCENT = 'descent';
export const LIGHT = 'light';

export const READER_TYPE_NAMES = {
    [SERIOUS]: 'Serious Reading',
    [DESCENT]: 'Descent Reading',
    [LIGHT]: 'Light Reading',
    [NA]: 'No information'
}

export const VINTAGE = 'vintage';
export const NEW = 'new';

export const ERAS = {
    [VINTAGE]: 'Vintage',
    [NEW]: 'New',
    [NA]: 'No informnation'
}

export const EXPENSIVE = 'expensive';
export const CHEAP = 'cheap';

export const PRICE_CLASSES = {
    [EXPENSIVE]: 'expensive-book',
    [CHEAP]: 'cheap-book',
    [DESCENT]: 'descent-price-book',
}

export const ROUTES = {
    ROOT: '/',
    HOME: '/home',
    ABOUT: '/about',
    BOOK: '/book',
    BOOK_DETAILS: '/book/:bookId',
    NOT_FOUNT: '*'
}
