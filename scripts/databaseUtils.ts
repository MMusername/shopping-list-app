import * as SQLite from 'expo-sqlite';
import { ListModel } from '../models/ListModel';
import { listsTable, populateProductsListQuery, productsTable } from '../assets/databaseConst';
import { ProductModel } from '../models/ProductModel';
import { ListItemModel } from '../models/ListItemModel';

const shoppingList: string = 'ShoppingList_';

const getRandomId = (min: number = 1, max: number = 10000): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getDatabase = () => {
    const db = SQLite.openDatabaseSync('database.db');
    return db;
};

export const createListsTable = async (db: SQLite.SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS ${listsTable} (
        id INT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
    );`;
    db.execAsync(query);
};

export const createList = (db: SQLite.SQLiteDatabase, name: string): ListModel => {
    const id = getRandomId();
    const query = `INSERT INTO ${listsTable} (id, name) VALUES (${id}, '${name}');`;
    db.execAsync(query);
    return {id, name} as ListModel;
};

export const getAllLists = (db: SQLite.SQLiteDatabase): ListModel[] => {
    return db.getAllSync(`SELECT * From ${listsTable}`) as ListModel[];
};

export const deleteList = (db: SQLite.SQLiteDatabase, id: number) => {
    const query = `DELETE FROM ${listsTable} WHERE id = ${id}`;
    db.runAsync(query);
};

export const createProductsTable = (db: SQLite.SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS ${productsTable} (
        id INT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        url TEXT
    );`;
    db.execSync(query);
};

export const isProductsTableEmpty = (db: SQLite.SQLiteDatabase) => {
    const query = `SELECT COUNT(*) as count FROM ${productsTable}`;
    const result: {count: number} | null = db.getFirstSync(query);
    if (result && result.count > 0) return false;
    return true;
};

export const populateProductsTable = (db: SQLite.SQLiteDatabase) => {
    db.runAsync(populateProductsListQuery);
};

export const getAllProducts = (db: SQLite.SQLiteDatabase): ProductModel[] => {
    return db.getAllSync(`SELECT * From ${productsTable}`) as ProductModel[];
};

export const createShoppingListTable = (db: SQLite.SQLiteDatabase, id: number) => {
    const query = `CREATE TABLE IF NOT EXISTS ${shoppingList + id} (
        id INT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        url TEXT,
        isBought BOOLEAN NOT NULL
    );`;
    db.execAsync(query);
};

export const insertIntoShoppingList = async (db: SQLite.SQLiteDatabase, id: number, item: ListItemModel) => {
    const query = `INSERT INTO ${shoppingList + id} (id, name, type, url, isBought) 
    VALUES (${item.id}, '${item.name}', '${item.type}', '${item.url}', 0);`;
    db.execAsync(query);
};

export const deleteFromShoppingList = async (db: SQLite.SQLiteDatabase, id: number, item: ListItemModel) => {
    const query = `DELETE FROM ${shoppingList + id} WHERE id = ${item.id}`;
    db.runAsync(query);
};

export const getShoppingList = (db: SQLite.SQLiteDatabase, id: number): ListItemModel[] => {
    return db.getAllSync(`SELECT * From ${shoppingList + id}`) as ListItemModel[];
};

export const updateIsBought = async (db: SQLite.SQLiteDatabase, listID: number, itemID: number) => {
    const query = `UPDATE ${shoppingList + listID} SET isBought = NOT isBought WHERE id = ${itemID}`;
    db.runAsync(query);
}