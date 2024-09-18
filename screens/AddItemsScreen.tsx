// src/screens/AddItemsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { ProductModel } from '../models/ProductModel';
import { deleteFromShoppingList, getAllProducts, getDatabase, getShoppingList, insertIntoShoppingList } from '../scripts/databaseUtils';
import { ListItemModel } from '../models/ListItemModel';

type AddItemsScreenRouteProp = RouteProp<RootStackParamList, 'AddItems'>;

const groupByType = (items: ListItemModel[]) => {
    return items.reduce((acc, item) => {
        const foundSection = acc.find(section => section.title === item.type);

        if (foundSection) {
            foundSection.data.push(item);
        } 
        else {
            acc.push({
                title: item.type,
                data: [item],
            });
        }

        return acc;
    }, [] as { title: string; data: ListItemModel[] }[]);
};

const AddItemsScreen: React.FC = () => {
    const route = useRoute<AddItemsScreenRouteProp>();
    const { listID } = route.params;
    const [allProducts, setAllProducts] = useState<ProductModel[]>([]);
    const [groupedProducts, setGroupedProducts] = useState<{title: string, data: ListItemModel[]}[]>([]);
    const [shoppingList, setShoppingList] = useState<ListItemModel[]>([]);

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
            }))
        .sort((a, b) => {
            if (a.isBought !== b.isBought) {
                return a.isBought ? 1 : -1;
            }
            if (a.type !== b.type) {
                return a.type.localeCompare(b.type);
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
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add items to List ID: {listID}</Text>
            <SectionList
                sections={groupedProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item} ) => (
                    <TouchableOpacity
                        onPress={() => handleProductPressed(item)}
                    >
                        <Text>{item.name}   |   {item.isBought ? "kupiony" : "nie"}</Text>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View>
                        <Text style={{ color: 'red' }}>{title}</Text>
                    </View>
                )}
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
