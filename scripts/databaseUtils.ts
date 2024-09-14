import * as SQLite from 'expo-sqlite';
import { ListModel } from '../models/ListModel';
import { listsTable, populateProductsListQuery, productsTable } from '../assets/databaseConst';

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