// src/screens/ShoppingListScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { ListItemModel } from '../models/ListItemModel';
import { getDatabase, getShoppingList, updateIsBought } from '../scripts/databaseUtils';
import ListOfItems from '../components/ListOfItems';
import { groupByType } from '../scripts/utils';

// Define the type of the route and navigation props
type ShoppingListScreenRouteProp = RouteProp<RootStackParamList, 'ShoppingList'>;
type ShoppingListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ShoppingList'>;

const ShoppingListScreen: React.FC = () => {
    const route = useRoute<ShoppingListScreenRouteProp>();
    const navigation = useNavigation<ShoppingListScreenNavigationProp>();
    const { listID } = route.params;
    const [shoppingList, setShoppingList] = useState<ListItemModel[]>([]);
    const [groupedProducts, setGroupedProducts] = useState<{title: string, data: ListItemModel[]}[]>([]);

    const db = getDatabase();

    useFocusEffect(
        useCallback(() => {
            console.log(getShoppingList(db, listID));
            setShoppingList(getShoppingList(db, listID));
        }, [])
    );

    useEffect(() => {
        const prod = shoppingList.sort((a, b) => {
            if (a.isBought !== b.isBought) {
                return a.isBought ? 1 : -1;
            }
            if (a.type !== b.type) {
                return a.type.localeCompare(b.type);
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

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Shopping List ID: {listID}</Text>
            <ListOfItems groupedProducts={groupedProducts} handleProductPressed={handleProductPressed}/>
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
