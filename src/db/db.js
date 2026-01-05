const db = {
    readDB: (data_key) => {
        try {
            const data = localStorage.getItem(data_key);

            return data ? JSON.parse(data) : []; // Opérateur ternaire
        } catch (err) {
            console.error("Failed to read data from localStorage:", err);
            return [];
        }
    },
    writeDB: (data_key, data) => {
        if (!data) return console.log('No data found to save');
        try {
            localStorage.setItem(data_key, JSON.stringify(data));
            console.log(`Data successfully saved to localStorage key: ${data_key} value: ${data}`);
        } catch (err) {
            console.error("Failed to write data to localStorage:", err);
        }
    },
}

export {db};