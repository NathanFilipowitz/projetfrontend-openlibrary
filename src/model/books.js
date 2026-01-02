import axios from 'axios'
import { buildFilterParams } from './filters.js'
const BASE_URL = 'https://openlibrary.org';
const API_HEADERS = {'User-Agent': 'OpenLibraryFrontEndProject/1.0 (py58wpb@eduvaud.ch)'};

export async function searchBooks(query, filters = {}) {
    if (!query || !query.trim()) return [];

    try {
        let data = [];
        // Construction de l'URL de base
        let url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}`;

        // Ajout des filtres grâce à la fonction importée
        url += buildFilterParams(filters);

        url += '&limit=20'; // Limite à 20 résultats

        await axios({
            method: 'get',
            url: url,
            responseType: 'json',
            headers: API_HEADERS
        })
            .then(function (response) {
                data = response.data
            });

        return data.docs.map(book => ({
            key: book.key,
            title: book.title,
            authors: book.author_name || ['Unknown Author'],
            first_publish_year: book.first_publish_year || 'Unknown',
            cover_image: book.cover_i || null
        }));
    } catch (error) {
        console.error('Failed to fetch books:', error);
        return [];
    }
}

export async function getBookDetails(id) {
    const bookDetails = await fetch(`${BASE_URL}/works/${id}.json`);
    if (!bookDetails.ok) {
        throw new Error('Failed to fetch book details');
    }
    return await bookDetails.json();
}