// src/screens/ShoppingListScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { ListItemModel } from '../models/ListItemModel';

// Define the type of the route and navigation props
type ShoppingListScreenRouteProp = RouteProp<RootStackParamList, 'ShoppingList'>;
type ShoppingListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ShoppingList'>;

const ShoppingListScreen: React.FC = () => {
  const route = useRoute<ShoppingListScreenRouteProp>();
  const navigation = useNavigation<ShoppingListScreenNavigationProp>();
  const { listID } = route.params;
  const [shoppingList, setShoppingList] = useState<ListItemModel[]>([]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shopping List ID: {listID}</Text>
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
