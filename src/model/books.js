import axios from 'axios'
import router from '../controller/router.js'
const BASE_URL = 'https://openlibrary.org';

// add common 'User-Agent' header as requested by openlibrary API policies: https://openlibrary.org/developers/api
const API_HEADERS = {
    'User-Agent': 'OpenLibraryFrontEndProject/1.0 (py58wpb@eduvaud.ch)'
};


export async function searchBooks(query) {
    if (!query || !query.trim()) return []; // Avoid empty queries
    try {
        let data=[];
        const url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=10`
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
            authors: book.author_name || [],
            first_publish_year: book.first_publish_year || 'Unknown',
            cover_image: book.cover_i || 'Unknown'
        }));
    } catch (error) {
        console.error('Failed to fetch books:', error);
        return [];
    }
}

export async function getBookDetails(id) {
    const bookDetails = await fetch(`${BASE_URL}/works/${id}.json`, {
        headers: API_HEADERS
    });
    if (!bookDetails.ok) {
        throw new Error('Failed to fetch book details');
    }
    return await bookDetails.json();
}