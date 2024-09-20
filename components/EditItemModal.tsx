// EditItemModal.tsx
import React from "react";
import { Modal, View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";

type EditItemModalProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    itemNote: string;
    setItemNote: React.Dispatch<React.SetStateAction<string>>;
    handleAddNote: () => void;
    handleDeleteItem: (() => void) | null;
};

const EditItemModal: React.FC<EditItemModalProps> = ({
    visible,
    setVisible,
    itemNote,
    setItemNote,
    handleAddNote,
    handleDeleteItem,
}) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalCard}>
                    <TextInput 
                        placeholder={"Product note"}
                        value={itemNote}
                        onChangeText={setItemNote}
                        onSubmitEditing={handleAddNote}
                    />
                    <TouchableOpacity onPress={handleAddNote}>
                        <Text>Update item note</Text>
                    </TouchableOpacity>
                    {handleDeleteItem !== null &&
                        <TouchableOpacity onPress={handleDeleteItem}>
                            <Text>Delete Item</Text>
                        </TouchableOpacity>
                    }
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

export default EditItemModal;