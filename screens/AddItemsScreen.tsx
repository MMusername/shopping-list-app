// src/screens/AddItemsScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

// Define the type of the route and navigation props
type AddItemsScreenRouteProp = RouteProp<RootStackParamList, 'AddItems'>;
type AddItemsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddItems'>;

const AddItemsScreen: React.FC = () => {
  const route = useRoute<AddItemsScreenRouteProp>();
  const { listID } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add items to List ID: {listID}</Text>
      {/* Implement your item addition logic here */}
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
