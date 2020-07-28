export const GET_TRANSLATIONS = 'GET_TRANSLATIONS';

export function getTranslatedKeys(payload) {
    return { 
        type: GET_TRANSLATIONS, 
        payload
    }
}