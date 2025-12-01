const BASE_URL = 'https://openlibrary.org';

export async function searchSubjects(query) {
    if (!query || !query.trim()) return [];
    try {
        const url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=10&fields=*`;

        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();

        console.log("Premier résultat brut:", data.docs[0]);

        return data.docs.map(doc => {
            const allSubjects = [
                ...(doc.subject || [])
            ];

            const uniqueSubjects = [...new Set(allSubjects)];

            return {
                key: doc.key,
                title: doc.title,
                authors: doc.author_name || [],
                first_publish_year: doc.first_publish_year || 'Unknown',
                subject: uniqueSubjects.length > 0
                    ? uniqueSubjects.slice(0, 5).join(', ')
                    : 'Pas de sujets trouvés'
            };
        });
    } catch (error) {
        console.error('Failed to fetch subjects:', error);
        return [];
    }
}