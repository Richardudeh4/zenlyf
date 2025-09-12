import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Animated, Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../Config/colors";
import { fonts } from "../../Config/Fonts";

const SafeItems = [
    {mainText: "Detect unusual inactivity and checks in with you", icon: require("../../assets/images/ecg.png")},
    {mainText: "Reminds you to take your medications promptly", icon: require("../../assets/images/pill.png")},
    {mainText: "Alert Loved ones if you fall or stop responding", icon: require("../../assets/images/digital.png")},
    {mainText: "Helps you understand and share medical reports", icon: require("../../assets/images/clinical.png")},
    {mainText: "Encourages daily checks-ins to stay connected", icon: require("../../assets/images/sentiment.png")},
];

const {height, width} = Dimensions.get("window");

const Screentwo = () => {
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [messageScale] = useState(new Animated.Value(1));
    const [notificationScale] = useState(new Animated.Value(1));

    const handleItemPress = (index: number) => {
        setSelectedItem(selectedItem === index ? null : index);
    };

    const handleMessagePress = () => {
        Animated.sequence([
            Animated.timing(messageScale, {
                toValue: 1.2,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(messageScale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleNotificationPress = () => {
        Animated.sequence([
            Animated.timing(notificationScale, {
                toValue: 1.2,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(notificationScale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
            {/* Header Section */}
            

            {/* Content Section */}
            <View style={styles.content}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>
                        5 Ways <Text style={styles.highlight}>Zenlyf</Text>{'\n'} Keeps you safe
                    </Text>
                </View>
                
                <View style={styles.itemsSection}>
                    {SafeItems.map((item, i) => (
                        <TouchableOpacity 
                            key={i} 
                            onPress={() => handleItemPress(i)}
                            style={[
                                styles.itemContainer,
                                selectedItem === i && styles.selectedItem
                            ]}
                        >
                            <View style={styles.itemContent}>
                                <Image source={item.icon} style={styles.itemIcon} />
                                <Text style={styles.itemText}>{item.mainText}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    onPress={() => {
                        router.push("/(auth)/accountSetup") 
                    }}
                    style={styles.nextButton}
                >
                    <Text style={styles.nextButtonText}>Next</Text> 
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    profileImageContainer: {
        position: 'relative',
        width: 60,
        height: 62,
        borderRadius: 30,
        backgroundColor: colors.primary,
        marginRight: 12,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    editButton: {
        width: 26,
        height: 26,
        borderRadius: 13,
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFF6FD',
    },
    profileInfo: {
        flex: 1,
    },
    greeting: {
        fontSize: 18,
        fontFamily: fonts.onestBold,
        color: colors.black,
        marginBottom: 2,
    },
    careCount: {
        fontSize: 14,
        fontFamily: fonts.onestLight,
        color: colors.black,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    notificationContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    messageBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#28A745',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#DC3545',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 10,
        fontFamily: fonts.onestBold,
        color: colors.white,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 4,
    },
    dropdownText: {
        fontSize: 14,
        fontFamily: fonts.onestMedium,
        color: colors.black,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    titleSection: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontFamily: fonts.onestBold,
        color: colors.black,
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    highlight: {
        color: '#0077FF',
    },
    itemsSection: {
        flex: 1,
        gap: 10,
        marginBottom: 40,
    },
    itemContainer: {
        paddingHorizontal: 19,
        paddingVertical: 17,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#B3DAFF',
        borderRadius: 8,
        backgroundColor: colors.white,
    },
    selectedItem: {
        paddingHorizontal: 25,
        paddingVertical: 19,
        backgroundColor: '#F8FBFF',
        borderColor: '#0077FF',
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    itemIcon: {
        width: 24,
        height: 24,
    },
    itemText: {
        fontSize: 14,
        fontFamily: fonts.onestMedium,
        color: colors.black,
        flex: 1,
    },
    nextButton: {
        paddingHorizontal: 0.06 * width,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 11,
        width: 382,
        height: 52,
        backgroundColor: '#0077FF',
        alignSelf: 'center',
    },
    nextButtonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: fonts.onestBold,
    },
});

export default Screentwo;