import React from 'react'
import { ListItemModel } from '../models/ListItemModel';
import { View, Text, StyleSheet } from 'react-native';

type ListItemModelProp = {
    item: ListItemModel;
    isAddingScreen: boolean;
};

const ListItemView: React.FC<ListItemModelProp> = ({item, isAddingScreen}) => {

    const itemNoteText = (isNaN(Number(item.note))) ? item.note : " x" + item.note;

    return (
        <View style={styles.container}>
            <Text style={(item.isBought && !isAddingScreen) && styles.crossedText}>
                {item.name} {item.note && itemNoteText}
            </Text>
            {(item.isBought === true && isAddingScreen === true) && (
                <View style={styles.tickIcon}></View>
            )} 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 3,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    crossedText: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    tickIcon: {
        marginTop: 1,
        marginLeft: 5,
        height: 12,
        width: 12,
        borderRadius: 2,
        backgroundColor: 'green',
    },
});

export default ListItemView;