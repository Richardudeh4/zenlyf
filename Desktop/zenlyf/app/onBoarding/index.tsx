import P from '@/components/P';
import { colors } from '@/Config/colors';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
    id: number;
    title: string;
    subtitle: string;
    illustration: any; // Changed to any to accommodate require() statements
    buttonText: string;
}

const slides: OnboardingSlide[] = [
    {
        id: 1,
        title: "Your health,\nin safe hands.",
        subtitle: "Zenlyf checks your well-being,\ntracks your meds, and alerts someone\nif something's wrong.",
        illustration: require("../../assets/images/elderly.png"),
        buttonText: 'Next'
    },
    {
        id: 2,
        title: "Connect your\nWearables.",
        subtitle: "Sync your Apple Watch, Fitbit, or\nphone sensors to help Zenlyf track\nactivity, movement and sleep.",
        illustration: require("../../assets/images/tracker.png"),
        buttonText: 'Next'
    },
    {
        id: 3,
        title: "Invite Caregiver\nor Doctor.",
        subtitle: "Invite a caregiver or doctor to check in,\ntrack your health, and get alerts\nin case of emergency.",
        illustration: require("../../assets/images/elderly2.png"),
        buttonText: 'Invite Someone'
    },
    {
        id: 4,
        title: "Set small goals.\nSee big results.",
        subtitle: "Track your meds, mood, movement,\nand progress - one step at a time.",
        illustration: require("../../assets/images/calendar.png"),
        buttonText: "Let's go"
    }
];

const OnboardingScreen = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            const nextSlide = currentSlide + 1;
            setCurrentSlide(nextSlide);
            flatListRef.current?.scrollToIndex({ index: nextSlide, animated: true });
        } else {
            // Last slide - navigate to authentication
            router.push('/(auth)/signin');
        }
    };

    const handleSkip = () => {
        // Skip onboarding and go to authentication
        router.push('/(auth)/signin');
    };

    const onViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentSlide(viewableItems[0].index);
        }
    };

    const renderIllustration = (type: string) => {
        switch (type) {
            case 'health':
                return (
                    <View style={styles.circleBackground}>
                        <View style={styles.innerCircle}>
                            <View style={styles.characterContainer}>
                                <View style={styles.characterPlaceholder}>
                                    <Text style={styles.characterEmoji}>👴🏻</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            case 'wearables':
                return (
                    <View style={styles.circleBackground}>
                        <View style={styles.innerCircle}>
                            <View style={styles.wearableContainer}>
                                <View style={styles.wearablePlaceholder}>
                                    <Text style={styles.wearableEmoji}>⌚</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            case 'caregiver':
                return (
                    <View style={styles.circleBackground}>
                        <View style={styles.innerCircle}>
                            <View style={styles.characterContainer}>
                                <View style={styles.characterPlaceholder}>
                                    <Text style={styles.characterEmoji}>👩🏽‍⚕️</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            case 'goals':
                return (
                    <View style={styles.goalsContainer}>
                        <View style={styles.goalsPlaceholder}>
                            <Text style={styles.goalsEmoji}>📋</Text>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    const renderSlide = ({ item }: { item: OnboardingSlide }) => (
        <View style={styles.slide}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                           <Image source={require("../../assets/images/logo.png")} style={{width:40, height:47}} />
                    </View>
                </View>
                {currentSlide < slides.length - 1 && (
                    <TouchableOpacity onPress={handleSkip}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Illustration */}
                <View style={styles.ringContainer}>
                    <View style={styles.outerRing} />
                    <View style={styles.middleRing} />
                    <View style={styles.innerRing} />
                    <View style={styles.imageContainer}>
                        <Image source={item.illustration} style={styles.illustrationImage} />
                    </View>
                </View>
               

                {/* Text Content */}
                <View style={styles.textContent}>
                    <Text style={styles.title}>{item.title}</Text>
                    <P style={styles.subtitle}>{item.subtitle}</P>
                </View>

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                    {/* Next Button */}
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.nextButtonText}>{item.buttonText}</Text>
                        {item.buttonText === "Let's go" && (
                            <Text style={styles.arrowIcon}> →</Text>
                        )}
                    </TouchableOpacity>

                    {/* Page Indicator */}
                    <View style={styles.pageIndicator}>
                        {slides.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    index === currentSlide ? styles.activeDot : styles.inactiveDot
                                ]}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderSlide}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                }}
            />
        </SafeAreaView>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    slide: {
        width,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
    },
    logoContainer: {
        flex: 1,
    },
    logo: {
        alignItems: 'flex-start',
    },
    logoIcon: {
        width: 40,
        height: 40,
        backgroundColor: colors.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 20,
        color: 'white',
    },
    skipText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.primary,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-between',
    },
    ringContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        position: 'relative',
    },
    outerRing: {
        position: 'absolute',
        width: 342,
        height: 342,
        borderRadius: 171,
        borderWidth: 1,
        borderColor: "#D1E9FF",
    },
    middleRing: {
        position: 'absolute',
        width: 274,
        height: 274,
        borderRadius: 137,
        borderWidth: 1,
        borderColor: "#D1E9FF",
    },
    innerRing: {
        position: 'absolute',
        width: 206,
        height: 206,
        borderRadius: 103,
        borderWidth: 1,
        borderColor: "#D1E9FF",
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
    },
    illustrationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        position:"absolute",
    },
    illustrationImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    circleBackground: {
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(0, 119, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 119, 255, 0.1)',
    },
    innerCircle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(0, 119, 255, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 119, 255, 0.15)',
    },
    characterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    characterPlaceholder: {
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 90,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    characterEmoji: {
        fontSize: 80,
    },
    wearableContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    wearablePlaceholder: {
        width: 200,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    wearableEmoji: {
        fontSize: 100,
    },
    goalsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    goalsPlaceholder: {
        width: 280,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 16,
        borderWidth: 3,
        borderColor: colors.primary,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    goalsEmoji: {
        fontSize: 80,
    },
    textContent: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#050505',
        textAlign: 'center',
        lineHeight: 38,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666666',
        textAlign: 'center',
        lineHeight: 22,
    },
    bottomSection: {
        paddingBottom: 40,
        gap: 24,
    },
    nextButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    nextButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    arrowIcon: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    pageIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    activeDot: {
        backgroundColor: colors.primary,
        width: 24,
        borderRadius: 12,
    },
    inactiveDot: {
        backgroundColor: '#D1D1D6',
        width: 8,
    },
});