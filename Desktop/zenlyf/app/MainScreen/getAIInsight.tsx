import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const GetAIInsight = () => {
  const handleShare = () => {
    console.log('Share pressed');
    // Here you would implement sharing functionality
  };

  const handleSave = () => {
    console.log('Save pressed');
    // Here you would implement save functionality
  };

  const handleSeeAll = () => {
    console.log('See all pressed');
    // Here you would navigate to all previous insights
  };

  const handleOpenPrevious = () => {
    console.log('Open previous insight pressed');
    // Here you would open the previous insight
  };

  const renderCurrentInsight = () => (
    <View style={styles.insightCard}>
      {/* AI Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Summary</Text>
        <Text style={styles.summaryText}>
          The patient is a 70-year-old male with a history of type 2 diabetes and hypertension. Both conditions are currently poorly controlled. Metformin dosage has been increased to 1000 mg twice daily. A follow-up appointment is scheduled in 3 months.
        </Text>
      </View>

      {/* Recommendations Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <View style={styles.recommendationsList}>
          <Text style={styles.recommendationText}>
            • Emphasize the importance of diet and exercise to improve diabetes and blood pressure control.
          </Text>
          <Text style={styles.recommendationText}>
            • Monitor blood pressure regularly at home.
          </Text>
          <Text style={styles.recommendationText}>
            • Check renal function and electrolytes prior to next visit.
          </Text>
          <Text style={styles.recommendationText}>
            • Review medication adherence and assess for any side effects.
          </Text>
          <Text style={styles.recommendationText}>
            • Encourage daily foot inspections to prevent diabetic complications.
          </Text>
          <Text style={styles.recommendationText}>
            • Schedule routine eye and foot exams as part of ongoing diabetes management.
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={20} color={colors.white} />
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="download-outline" size={20} color={colors.black} />
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPreviousInsight = (key: number) => (
    <View key={key} style={styles.previousInsightCard}>
      {/* Header with name and date */}
      <View style={styles.previousInsightHeader}>
        <Text style={styles.patientName}>John Doe</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>21st Apr 2024</Text>
          <Text style={styles.timeText}>10 AM</Text>
        </View>
      </View>

      {/* AI Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Summary</Text>
        <Text style={styles.summaryText}>
          The patient is a 70-year-old male with a history of type 2 diabetes and hypertension. Both conditions are currently poorly controlled. Metformin dosage has been increased to 1000 mg twice daily. A follow-up appointment is scheduled in 3 months.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.previousActionButtons}>
        <TouchableOpacity style={styles.previousActionButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={16} color={colors.gray1} />
          <Text style={styles.previousActionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.previousActionButton} onPress={handleOpenPrevious}>
          <Ionicons name="open-outline" size={16} color={colors.gray1} />
          <Text style={styles.previousActionText}>Open</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader text="AI Insight View" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current AI Insight */}
        {renderCurrentInsight()}

        {/* Previous Insights Section */}
        <View style={styles.previousInsightsSection}>
          <View style={styles.previousInsightsHeader}>
            <Text style={styles.previousInsightsTitle}>Previous Insights</Text>
            <TouchableOpacity onPress={handleSeeAll}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Previous Insights Cards */}
          {renderPreviousInsight(1)}
          {renderPreviousInsight(2)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GetAIInsight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  insightCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    lineHeight: 20,
  },
  recommendationsList: {
    gap: 8,
  },
  recommendationText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    lineHeight: 20,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  shareButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.white,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray1,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  previousInsightsSection: {
    marginBottom: 20,
  },
  previousInsightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  previousInsightsTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
  },
  previousInsightCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  previousInsightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  patientName: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  timeText: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  previousActionButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  previousActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  previousActionText: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
});