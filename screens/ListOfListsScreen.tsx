// src/screens/ListOfListsScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';

// Define the type of navigation prop
type ListOfListsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ListOfLists'>;

const ListOfListsScreen: React.FC = () => {
  const navigation = useNavigation<ListOfListsScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>List of Shopping Lists</Text>
      <Button
        title="Go to Shopping List (ID: 1)"
        onPress={() => navigation.navigate('ShoppingList', { listID: '1' })}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
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

export default ListOfListsScreen;
