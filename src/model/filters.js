// src/model/filters.js

// Les options pour les menus déroulants
export const sortOptions = [
    { value: '', label: 'Pertinence' },
    { value: 'new', label: 'Plus récents' },
    { value: 'old', label: 'Plus anciens' },
    { value: 'random', label: 'Aléatoire' }
];

export const languageOptions = [
    { value: '', label: 'Toutes les langues' },
    { value: 'fre', label: 'Français' },
    { value: 'eng', label: 'Anglais' },
    { value: 'spa', label: 'Espagnol' },
    { value: 'deu', label: 'Allemand' }
];



// Fonction qui transforme vos variables en paramètres d'URL
export function buildFilterParams(filters) {
    let params = '';
    if (filters.language) params += `&language=${filters.language}`;
    if (filters.sort) params += `&sort=${filters.sort}`;
    return params;
}