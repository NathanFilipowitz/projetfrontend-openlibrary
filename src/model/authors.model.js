const BASE_URL = '/api/openlibrary';
const BASE_URL_WORKS = '/api/openlibrary/authors/';

import axios from 'axios';

export const authorModel = {
    searchAuthors: async (query)=> {
        if (!query) return [];
        try {
            const url = `${BASE_URL}/search/authors.json?q=${encodeURIComponent(query)}&limit=10`
            const response = await axios({
                method: 'get',
                url: url,
                responseType: 'json',
            })

            return response.data.docs.map(author => ({
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
    },

    searchAuthorWorks: async (id) => {
        if (!id) return [];
        try {
            const url = `${BASE_URL_WORKS}${encodeURIComponent(id)}/works.json?limit=500`
             const response = await axios({
                method: 'get',
                url: url,
                responseType: 'json',
            })

            return response.data.entries.map(works => ({
                id: works.key,
                covers: works.covers,
                title: works.title,
            }));
        } catch (error) {
            console.error('Failed to fetch books:', error);
            return [];
        }
    },

}