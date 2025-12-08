const BASE_URL = 'https://openlibrary.org';
const BASE_URL_COVER = 'https://covers.openlibrary.org/b/id/';
import axios from 'axios';

export async function searchAuthors(query) {
    if (!query || !query.trim()) return []; // Avoid empty queries
    try {
        let data = [];
        const url = `${BASE_URL}/search/authors.json?q=${encodeURIComponent(query)}&limit=10`
        await axios({
            method: 'get',
            url: url,
            responseType: 'json'
        })
        .then(function (response) {
            data = response.data
        });

        return data.docs.map(author => ({
            key: author.key,
            name: author.name,
            top_subjects: author.top_subjects,
            top_work: author.top_work,
            work_count: author.work_count
        }));
    } catch (error) {
        console.error('Failed to fetch authors:', error);
        return [];
    }
}

export async function searchAuthorWorks(name) {
    if (!name || !name.trim()) return []; // Avoid empty queries
    try {
        let data = [];
        const url = `${BASE_URL}/search.json?author=${encodeURIComponent(name)}&limit=50`
        await axios({
            method: 'get',
            url: url,
            responseType: 'json'
        })
        .then(function (response) {
            data = response.data
        });

        return data.docs.map(author => ({
            names: author.names,
            cover_i: author.cover_i,
            title: author.title,
            subtitle: author.subtitle,
            year: author.year,
            language: author.language
        }));
    } catch (error) {
        console.error('Failed to fetch books:', error);
        return [];
    }
}