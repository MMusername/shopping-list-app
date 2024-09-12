// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListOfListsScreen from './screens/ListOfListsScreen'
import ShoppingListScreen from './screens/ShoppingListScreen';
import AddItemsScreen from './screens/AddItemsScreen';
import SettingsScreen from './screens/SettingsScreen';

// Define type for stack params
export type RootStackParamList = {
  ListOfLists: undefined;
  ShoppingList: { listID: string };
  AddItems: { listID: string };
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListOfLists">
        <Stack.Screen name="ListOfLists" component={ListOfListsScreen} />
        <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
        <Stack.Screen name="AddItems" component={AddItemsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
