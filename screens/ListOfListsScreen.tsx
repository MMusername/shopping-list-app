// /screens/ListOfListsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import { createList, createListsTable, deleteList, getAllLists, getDatabase } from '../scripts/databaseUtils';
import { ListModel } from '../models/ListModel';
import NewListNameModal from '../components/NewListNameModal';
import { getDefaultShoppingListName } from '../scripts/utils';

// Define the type of navigation prop
type ListOfListsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ListOfLists'>;

const ListOfListsScreen: React.FC = () => {
    const navigation = useNavigation<ListOfListsScreenNavigationProp>();
    const [shoppingLists, setShoppingLists] = useState<ListModel[]>([]);
    const [enterNewListNameVisible, setEnterNewListNameVisible] = useState<boolean>(false);
    const [newListName, setNewListName] = useState<string>("");

    const db = getDatabase();

    useEffect(() => {
        createListsTable(db);

        const lists: ListModel[] = getAllLists(db);
        console.log("lists: ", lists);
        setShoppingLists(lists);
    }, []);

    const handleCreateNewListButton = () => {
        console.log("log: create new list button cliecked.");
        setEnterNewListNameVisible(true);
    };

    const handleCreateNewList = () => {
        console.log("log: done creating new list button clicked.");
        setEnterNewListNameVisible(false);
        console.log("name: ", newListName);
        const name = newListName !== "" ? newListName : getDefaultShoppingListName();
        const newList = createList(db, name);
        setShoppingLists([...shoppingLists, newList]);
        setNewListName('');
        navigation.navigate('ShoppingList', { listID: newList.id});
    };

    const handleDeleteList = (id: number) => {
        console.log("log: delete list with id =", id, ".");
        deleteList(db, id);
        setShoppingLists(shoppingLists.filter(list => list.id !== id));
    };

    return (
        <View style={styles.container}>
            <NewListNameModal
                enterNewListNameVisible={enterNewListNameVisible} 
                setEnterNewListNameVisible={setEnterNewListNameVisible}
                newListName={newListName}
                setNewListName={setNewListName} 
                handleCreateNewList={handleCreateNewList}                
            />

            {shoppingLists.map(list => 
                <TouchableOpacity
                    key={list.id}
                    onPress={() => navigation.navigate('ShoppingList', { listID: list.id})}
                    style={{ flexDirection: 'row' }}
                >
                    <Text>Name: {list.name}, id: {list.id}</Text>
                    <TouchableOpacity onPress={() => handleDeleteList(list.id)}>
                        <Text>DELETE</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            )}
            <Button
                title="Create List"
                onPress={handleCreateNewListButton}
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalCard: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default ListOfListsScreen;
