const BASE_URL = 'https://openlibrary.org';
const BASE_URL_COVER = 'https://covers.openlibrary.org';

export async function searchAuthors(query) {
    if (!query || !query.trim()) return []; // Avoid empty queries
    try {
        const url = `${BASE_URL}/search/authors.json?q=${encodeURIComponent(query)}&limit=10`
        const response = await fetch(
            url,
            {
                method: 'GET'
            }
        )
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();

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
        const url = `${BASE_URL}/search.json?author=${encodeURIComponent(name)}&limit=10`
        const response = await fetch(
            url,
            {
                method: 'GET'
            }
        )
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();

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