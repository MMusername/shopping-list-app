import { createProductsTable, getDatabase, isProductsTableEmpty, populateProductsTable } from './databaseUtils';

/* Returns string: 'Shopping List + {DD.MM}' */
export const getDefaultShoppingListName = (): string => {
    const currentDate = new Date();
  
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  
    return `Shopping List ${day}.${month}`;
};

export const createProductsTableIfNotExist = () => {
    const db = getDatabase();
    createProductsTable(db);
    if (isProductsTableEmpty(db)) {
        console.log("log: Populating products table...");
        populateProductsTable(db);
    }
    else {
        console.log("no need to populate products table.");
    }
};