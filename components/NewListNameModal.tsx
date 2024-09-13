// NewListModal.tsx
import React from "react";
import { Modal, View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { getDefaultShoppingListName } from "../scripts/utils";

type NewListModalProps = {
    enterNewListNameVisible: boolean;
    setEnterNewListNameVisible: React.Dispatch<React.SetStateAction<boolean>>;
    newListName: string;
    setNewListName: React.Dispatch<React.SetStateAction<string>>;
    handleCreateNewList: () => void;
};

const NewListNameModal: React.FC<NewListModalProps> = ({
    enterNewListNameVisible,
    setEnterNewListNameVisible,
    newListName,
    setNewListName,
    handleCreateNewList,
}) => {
    return (
        <Modal
            visible={enterNewListNameVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setEnterNewListNameVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalCard}>
                    <TextInput 
                        placeholder={getDefaultShoppingListName()}
                        value={newListName}
                        onChangeText={setNewListName}
                        onSubmitEditing={handleCreateNewList}
                    />
                    <TouchableOpacity onPress={handleCreateNewList}>
                        <Text>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
})

export default NewListNameModal;