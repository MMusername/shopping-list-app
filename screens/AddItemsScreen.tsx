// src/screens/AddItemsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { ProductModel } from '../models/ProductModel';
import { deleteFromShoppingList, getAllProducts, getDatabase, getShoppingList, insertIntoShoppingList, updateItemNote } from '../scripts/databaseUtils';
import { ListItemModel } from '../models/ListItemModel';
import ListOfItems from '../components/ListOfItems';
import { groupByType } from '../scripts/utils';
import EditItemModal from '../components/EditItemModal';

type AddItemsScreenRouteProp = RouteProp<RootStackParamList, 'AddItems'>;

const AddItemsScreen: React.FC = () => {
    const route = useRoute<AddItemsScreenRouteProp>();
    const { listID } = route.params;
    const [allProducts, setAllProducts] = useState<ProductModel[]>([]);
    const [groupedProducts, setGroupedProducts] = useState<{title: string, data: ListItemModel[]}[]>([]);
    const [shoppingList, setShoppingList] = useState<ListItemModel[]>([]);
    const [editItemModalVisible, setEditItemModalVisible] = useState<boolean>(false);
    const [itemNote, setItemNote] = useState<string>("");
    const [currentItem, setCurrentItem] = useState<ListItemModel>();

    const db = getDatabase();

    useEffect(() => {
        setAllProducts(getAllProducts(db));
        setShoppingList(getShoppingList(db, listID));
    }, []);

    useEffect(() => {
        var prod = allProducts
            .map(item => ({
                ...item,
                isBought: shoppingList.some(p => p.id === item.id),
                note: "",
            }))
        .sort((a, b) => {
            if (a.type !== b.type) {
                return a.type.localeCompare(b.type);
            }
            if (a.isBought !== b.isBought) {
                return a.isBought ? 1 : -1;
            }
            return a.name.localeCompare(b.name);
        });

        setGroupedProducts(groupByType(prod));
    }, [allProducts, shoppingList]);

    const handleProductPressed = (item: ListItemModel) => {
        console.log("Clicked product:", item.name);
        if (shoppingList.some(p => p.id === item.id)) {
            // remove item from list
            setShoppingList(shoppingList.filter(p => p.id !== item.id));
            deleteFromShoppingList(db, listID, item);
        }
        else {
            // add item to list
            setShoppingList([...shoppingList, item]);
            insertIntoShoppingList(db, listID, item);
        }
    };

    const handleProductLongPressed = (item: ListItemModel) => {
        setCurrentItem(item);
        setItemNote(item.note);
        handleProductPressed(item);
        setEditItemModalVisible(true);
    };

    const handleAddItemNote = () => {
        if (currentItem && itemNote) {
            updateItemNote(db, listID, currentItem?.id, itemNote);
            setShoppingList(shoppingList.map(p => 
                p.id === currentItem.id
                    ? {...p, note: itemNote}
                    : p
            ));
        }
        setEditItemModalVisible(false);
    };

    return (
        <View style={styles.container}>

            <EditItemModal 
                visible={editItemModalVisible} 
                setVisible={setEditItemModalVisible}
                itemNote={itemNote} 
                setItemNote={setItemNote}
                handleAddNote={handleAddItemNote}
                handleDeleteItem={null}
            />

            <Text style={styles.text}>Add items to List ID: {listID}</Text>
            <ListOfItems 
                groupedProducts={groupedProducts} 
                handleProductPressed={handleProductPressed} 
                handleProductLongPressed={handleProductLongPressed}
                isAddingScreen={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default AddItemsScreen;
