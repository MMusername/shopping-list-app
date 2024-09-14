export const listsTable: string = "ListsTable";
export const productsTable: string = "ProductsTable";

export const populateProductsListQuery: string = `
    INSERT INTO ${productsTable} (id, name, type, url) VALUES 
    (1, 'Milk', 'Dairy', NULL),
    (2, 'Bread', 'Bakery', NULL),
    (3, 'Cheese', 'Dairy', NULL),
    (4, 'Apple', 'Fruit', NULL),
    (5, 'Banana', 'Fruit', NULL),
    (6, 'Chicken', 'Meat', NULL),
    (7, 'Fish', 'Seafood', NULL),
    (8, 'Rice', 'Grain', NULL),
    (9, 'Yogurt', 'Dairy', NULL),
    (10, 'Tomato', 'Vegetable', NULL),
    (11, 'Cucumber', 'Vegetable', NULL),
    (12, 'Orange Juice', 'Beverage', NULL),
    (13, 'Soda', 'Beverage', NULL),
    (14, 'Eggs', 'Dairy', NULL),
    (15, 'Butter', 'Dairy', NULL),
    (16, 'Pasta', 'Grain', NULL),
    (17, 'Beef', 'Meat', NULL),
    (18, 'Salmon', 'Seafood', NULL),
    (19, 'Carrot', 'Vegetable', NULL),
    (20, 'Potato', 'Vegetable', NULL);
`;
