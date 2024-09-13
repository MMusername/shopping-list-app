export const getDefaultShoppingListName = (): string => {
    const currentDate = new Date();
  
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  
    return `Shopping List ${day}.${month}`;
}