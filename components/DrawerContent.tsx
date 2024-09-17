// CustomDrawer.tsx
import React from 'react';
import { TouchableOpacity, Animated, StyleSheet, Text, Dimensions } from 'react-native';
import { NavigationContainerRef } from '@react-navigation/native';

// Get device width for drawer calculation
const { width } = Dimensions.get('window');

// Define type for props
type CustomDrawerProps = {
    drawerTranslateX: Animated.Value;
    toggleDrawer: () => void;
    navigationRef: React.RefObject<NavigationContainerRef<any>>;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Custom drawer component
const CustomDrawer: React.FC<CustomDrawerProps> = ({ drawerTranslateX, toggleDrawer, navigationRef, setDrawerOpen }) => {
    return (
        <Animated.View style={[styles.drawer, { top: 0, transform: [{ translateX: drawerTranslateX }] }]}>
            <TouchableOpacity
                style={styles.drawerButton}
                onPress={() => {
                    setDrawerOpen(false);
                    toggleDrawer();
                }}
            >
                <Text style={styles.drawerText}>Close Drawer</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.drawerButton}
                onPress={() => {
                    setDrawerOpen(false);
                    toggleDrawer();
                    // Navigate to the Settings screen
                    navigationRef.current?.navigate('Settings');
                }}
            >
                <Text style={styles.drawerText}>Go to Settings</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0, // Drawer starts at the top of the screen
        bottom: 0,
        width: width * 0.75, // Drawer takes 75% of the screen width
        backgroundColor: '#fff',
        zIndex: 1000, // Ensure it overlays the screen
        elevation: 10,
        padding: 20,
    },
    drawerButton: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    drawerText: {
        fontSize: 16,
    },
});

export default CustomDrawer;
