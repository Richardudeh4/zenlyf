import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const TodayOverview = () => {
  const router = useRouter();

  const overviewCards = [
    {
      id: 1,
      title: "Meds to take today",
      icon: "medical" as const,
      onPress: () => {
        // Navigate to medications screen
        router.push('/MainScreen/todayMeds');
      }
    },
    {
      id: 2,
      title: "Today's exercise plan",
      icon: "fitness" as const,
      onPress: () => {
        // Navigate to exercise plan screen
        console.log('Navigate to exercise plan');
      }
    },
    {
      id: 3,
      title: "Progress summary from wearables",
      icon: "trending-up" as const,
      onPress: () => {
        // Navigate to wearables progress screen
        console.log('Navigate to wearables progress');
      }
    },
    {
      id: 4,
      title: "AI follow-ups pending",
      icon: "chatbubble" as const,
      onPress: () => {
        // Navigate to AI follow-ups screen
        console.log('Navigate to AI follow-ups');
      }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader text="Today's Overview" />

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cardsContainer}>
          {overviewCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.card}
              onPress={card.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Ionicons name={card.icon} size={24} color={colors.primary} />
                </View>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.black} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TodayOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  cardsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  card: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    lineHeight: 22,
  },
});
