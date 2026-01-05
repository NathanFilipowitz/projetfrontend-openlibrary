const BASE_URL = 'https://openlibrary.org';

export async function searchSubjects(query) {
    if (!query || !query.trim()) return [];
    try {
        const url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=10&fields=*`;
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();

        return data.docs.map(doc => {
            const allSubjects = [...(doc.subject || [])];
            const uniqueSubjects = [...new Set(allSubjects)];

            const lowerQuery = query.toLowerCase();
            // aide de l'ia pour le tri et mettre en gras le premier
            // 1. TRI : On met les sujets qui matchent en premier
            uniqueSubjects.sort((a, b) => {
                const aMatch = a.toLowerCase().includes(lowerQuery);
                const bMatch = b.toLowerCase().includes(lowerQuery);
                // Si b matche et a non, b passe devant (sort return positive)
                return (bMatch === aMatch) ? 0 : bMatch ? 1 : -1;
            });

            // 2. FORMATAGE : On ne met en gras QUE le premier élément (index 0)
            const formattedSubjects = uniqueSubjects.slice(0, 5).map((subj, index) => {
                // Si c'est le premier (index === 0) ET qu'il correspond à la recherche
                if (index === 0 && subj.toLowerCase().includes(lowerQuery)) {
                    // On injecte le HTML directement dans la string
                    return `<strong>${subj}</strong>`;
                }
                // Les autres restent normaux (pas en gras)
                return subj;
            });

            return {
                key: doc.key,
                title: doc.title,
                authors: doc.author_name || [],
                first_publish_year: doc.first_publish_year || 'Unknown',
                // On renvoie une string finie avec du HTML dedans
                subject: formattedSubjects.length > 0
                    ? formattedSubjects.join(', ')
                    : 'Pas de sujets trouvés'
            };
        });
    } catch (error) {
        console.error('Failed to fetch subjects:', error);
        return [];
    }
}