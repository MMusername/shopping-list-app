// App.tsx
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Animated, Dimensions, StyleSheet } from 'react-native';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import ListOfListsScreen from './screens/ListOfListsScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import AddItemsScreen from './screens/AddItemsScreen';
import SettingsScreen from './screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './components/DrawerContent';
import { createProductsTableIfNotExist } from './scripts/utils';
import { ListItemModel } from './models/ListItemModel';

export type RootStackParamList = {
    ListOfLists: undefined;
    ShoppingList: { listID: number };
    AddItems: { listID: number };
    Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const { width } = Dimensions.get('window');

const App: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerTranslateX = useState(new Animated.Value(-width))[0];

    // Toggle the drawer
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
        Animated.timing(drawerTranslateX, {
            toValue: drawerOpen ? -width : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const navigationRef = React.useRef<NavigationContainerRef<RootStackParamList>>(null);

    // Create product table if not created yet.
    useEffect(() => {
        createProductsTableIfNotExist();
    }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            <View style={styles.container}>
                <Stack.Navigator
                    initialRouteName="ListOfLists"
                    screenOptions={({ navigation }): StackNavigationOptions => ({
                        headerLeft: () => (
                            <TouchableOpacity onPress={toggleDrawer} style={styles.menuIcon}>
                                <Icon name="menu" size={25} color="black" />
                            </TouchableOpacity>
                        ),
                        headerTitle: "Little Shopping List"
                    })}
                >
                    <Stack.Screen name="ListOfLists" component={ListOfListsScreen} />
                    <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
                    <Stack.Screen name="AddItems" component={AddItemsScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                </Stack.Navigator>
                {drawerOpen && (
                    <CustomDrawer
                        drawerTranslateX={drawerTranslateX}
                        toggleDrawer={toggleDrawer}
                        navigationRef={navigationRef}
                        setDrawerOpen={setDrawerOpen}
                    />
                )}
            </View>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuIcon: {
        marginLeft: 15,
    },
});

export default App;
