const DATA_KEY = 'openlibrary';

const db = {
    readDB: () => {
        try {
            const data = localStorage.getItem(DATA_KEY);

            return data ? JSON.parse(data) : []; // Opérateur ternaire
        } catch (err) {
            console.error("Failed to read data from localStorage:", err);
            return [];
        }
    },
    writeDB: (data) => {
        if (!data) return console.log('No data found to save');
        try {
            localStorage.setItem(DATA_KEY, JSON.stringify(data));
            console.log(`Data successfully saved to localStorage under key: ${DATA_KEY}`);
        } catch (err) {
            console.error("Failed to write data to localStorage:", err);
        }
    },
}

export {db};