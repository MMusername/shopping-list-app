// src/screens/AddItemsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { ProductModel } from '../models/ProductModel';
import { getAllProducts, getDatabase } from '../scripts/databaseUtils';

// Define the type of the route and navigation props
type AddItemsScreenRouteProp = RouteProp<RootStackParamList, 'AddItems'>;
// type AddItemsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddItems'>;

const AddItemsScreen: React.FC = () => {
    const route = useRoute<AddItemsScreenRouteProp>();
    const { listID } = route.params;
    const [allProducts, setAllProducts] = useState<ProductModel[]>([]);

    const db = getDatabase();

    useEffect(() => {
        setAllProducts(getAllProducts(db));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add items to List ID: {listID}</Text>
            {allProducts.map(product => 
                <TouchableOpacity
                    key={product.id}
                >
                    <Text>{product.name}</Text>
                </TouchableOpacity>
            )}
        </View>
  ) ;
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
