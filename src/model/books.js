const BASE_URL = 'https://openlibrary.org';

export async function searchBooks(query) {
    if (!query || !query.trim()) return []; // Avoid empty queries
    try {
        const url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=10`
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