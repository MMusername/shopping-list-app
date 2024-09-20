// src/screens/ShoppingListScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import { RouteProp, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { ListItemModel } from '../models/ListItemModel';
import { deleteFromShoppingList, getDatabase, getShoppingList, updateIsBought, updateItemNote } from '../scripts/databaseUtils';
import ListOfItems from '../components/ListOfItems';
import { groupByType } from '../scripts/utils';
import EditItemModal from '../components/EditItemModal';

// Define the type of the route and navigation props
type ShoppingListScreenRouteProp = RouteProp<RootStackParamList, 'ShoppingList'>;
type ShoppingListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ShoppingList'>;

const ShoppingListScreen: React.FC = () => {
    const route = useRoute<ShoppingListScreenRouteProp>();
    const navigation = useNavigation<ShoppingListScreenNavigationProp>();
    const { listID } = route.params;
    const [shoppingList, setShoppingList] = useState<ListItemModel[]>([]);
    const [groupedProducts, setGroupedProducts] = useState<{title: string, data: ListItemModel[]}[]>([]);
    const [itemNote, setItemNote] = useState<string>("");
    const [editItemModalVisible, setEditItemModalVisible] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<ListItemModel | null>(null);

    const db = getDatabase();

    useFocusEffect(
        useCallback(() => {
            console.log(getShoppingList(db, listID));
            setShoppingList(getShoppingList(db, listID));
        }, [])
    );

    useEffect(() => {
        const prod = shoppingList.sort((a, b) => {
            if (a.type !== b.type) {
                return a.type.localeCompare(b.type);
            }
            if (a.isBought !== b.isBought) {
                return a.isBought ? 1 : -1;
            }
            return a.name.localeCompare(b.name);
        });

        setGroupedProducts(groupByType(prod));
    }, [shoppingList]);

    const handleProductPressed = (item: ListItemModel) => {
        setShoppingList(shoppingList.map((p) => 
            p.id === item.id
                ? { ...p, isBought: !p.isBought }
                : p 
        ));
        updateIsBought(db, listID, item.id);
    };

    const handleProductLongPressed = (item: ListItemModel) => {
        setCurrentItem(item);
        setItemNote(item.note);
        setEditItemModalVisible(true);
    }

    const handleAddNote = () => {
        if (currentItem && itemNote) {
            updateItemNote(db, listID, currentItem?.id, itemNote);
            setShoppingList(shoppingList.map(p => 
                p.id === currentItem.id
                    ? {...p, note: itemNote}
                    : p
            ));
        }
        setEditItemModalVisible(false);
    }

    const handleDeleteItem = () => {
        if (currentItem) {
            deleteFromShoppingList(db, listID, currentItem);        
            setShoppingList(shoppingList.filter(p => p.id !== currentItem.id));
        }
        setEditItemModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <EditItemModal 
                visible={editItemModalVisible} 
                setVisible={setEditItemModalVisible}
                itemNote={itemNote} 
                setItemNote={setItemNote}
                handleAddNote={handleAddNote}
                handleDeleteItem={handleDeleteItem}
            />

            <Text style={styles.text}>Shopping List ID: {listID}</Text>
            <ListOfItems 
                groupedProducts={groupedProducts} 
                handleProductPressed={handleProductPressed}
                handleProductLongPressed={handleProductLongPressed}
                isAddingScreen={false}
            />
            <Button
                title="Add Items to this List"
                onPress={() => navigation.navigate('AddItems', { listID })}
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

export default ShoppingListScreen;
