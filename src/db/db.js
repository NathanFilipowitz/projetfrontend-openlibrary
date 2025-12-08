import fs from 'fs';

export function readDB(nameDB) {
    try {
        const data = fs.readFileSync(nameDB, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Failed to read data:", err);
        return null;
    }
}

export function writeDB(data, nameDB) {
    if (!data) return console.log('No data Found');
    try {
        fs.writeFileSync(nameDB, JSON.stringify(data));
        console.log("Data Saved");
    } catch (err) {
        console.error("Failed to write data:", err);
    }
}

export function updateDB(updatedRecord, nameDB, uniqueIdentifier = 'id') {
    const existingData = readDB(nameDB);

    if (!existingData) {
        console.error('No existing data found.');
        return;
    }
    const indexToUpdate = existingData.findIndex(record => record[uniqueIdentifier] === updatedRecord[uniqueIdentifier]);

    if (indexToUpdate === -1) {
        console.error('Record not found for update.');
        return;
    }
    existingData[indexToUpdate] = { ...existingData[indexToUpdate], ...updatedRecord };
    writeDB(existingData, nameDB);
}