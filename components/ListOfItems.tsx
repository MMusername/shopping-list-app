import React from "react";
import { SectionList, TouchableOpacity, View, Text } from "react-native";
import { ListItemModel } from "../models/ListItemModel";
import ListItemView from "./ListItemView";

type ListOfItemsProps = {
    groupedProducts: {title: string, data: ListItemModel[]}[];
    handleProductPressed: (item: ListItemModel) => void;
    handleProductLongPressed: (item: ListItemModel) => void;
    isAddingScreen: boolean;
};

const ListOfItems: React.FC<ListOfItemsProps> = ({ 
    groupedProducts, 
    handleProductPressed, 
    handleProductLongPressed,
    isAddingScreen
}) => {
    return (
        <SectionList
            sections={groupedProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item} ) => (
                <TouchableOpacity
                    onPress={() => handleProductPressed(item)}
                    onLongPress={() => handleProductLongPressed(item)}
                >
                    <ListItemView item={item} isAddingScreen={isAddingScreen}/>
                </TouchableOpacity>
            )}
            renderSectionHeader={({ section: { title } }) => (
                <View>
                    <Text style={{ color: 'red' }}>{title}</Text>
                </View>
            )}
        />
    );
};

export default ListOfItems;
