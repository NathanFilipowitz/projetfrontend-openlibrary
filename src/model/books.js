const BASE_URL = 'https://openlibrary.org';
const params = new URLSearchParams();
const headers = new Headers({
    "User-Agent": "CPNV_projet_frontend/1.0 (py58wpb@eduvaud.ch)"
}); //header required by OpenLibrary API so that requests are not blocked

export async function searchBooks(query) {
    if (!query || !query.trim()) return []; // Avoid empty queries
    try {
        const response = await fetch(
            `${BASE_URL}/search.json?${new URLSearchParams(query)}&limit=10`,
            {
                method: 'GET',
                headers: headers
            }
        )
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();

        return data.docs.map(book => ({
            key: book.key,
            title: book.title,
            authors: book.author_name || [],
            first_publish_year: book.first_publish_year || 'Unknown'
        }));
    } catch (error) {
        console.error('Failed to fetch books:', error);
        return [];
    }
}