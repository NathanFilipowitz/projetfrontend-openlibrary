import axios from 'axios'

const BASE_URL = 'https://openlibrary.org';

export async function searchBooks(query) {
    if (!query || !query.trim()) return []; // Avoid empty queries
    try {
        let data=[];
        const url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=10`
        await axios({
            method: 'get',
            url: url,
            responseType: 'json'
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