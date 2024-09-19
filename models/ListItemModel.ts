import { ProductModel } from "./ProductModel";

export interface ListItemModel extends ProductModel {
    isBought: boolean;
    note: string;
}