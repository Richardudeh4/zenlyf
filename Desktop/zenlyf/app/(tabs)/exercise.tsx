import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import { useRouter } from 'expo-router';

const Exercise = () => {
  const router = useRouter();
  const handlePlayVideo = () => {
    console.log('Play video pressed');
    // Here you would implement video playback
  };

  const handleAddRoutine = () => {
    console.log('Add Routine pressed');
    router.push('/MainScreen/addRoutine');
    // Here you would implement add routine functionality
  };

  const exercises = [
    {
      id: 1,
      name: 'Squat',
      details: '12 reps • 3 sets',
      icon: 'body-outline',
    },
    {
      id: 2,
      name: 'Yoga',
      details: '25 mins • 2 sets',
      icon: 'leaf-outline',
    },
    {
      id: 3,
      name: 'Reverse Lunge',
      details: '10 reps • 2 sets',
      icon: 'walk-outline',
    },
    {
      id: 4,
      name: 'Plank',
      details: '45 sec • 3 sets',
      icon: 'fitness-outline',
    },
  ];

  const renderExerciseCard = (exercise: any) => (
    <View key={exercise.id} style={styles.exerciseCard}>
      <View style={styles.exerciseIcon}>
        <Ionicons name={exercise.icon as any} size={24} color={colors.primary} />
      </View>
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseDetails}>{exercise.details}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exercise</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Video Player Section */}
        <View style={styles.videoContainer}>
          <View style={styles.videoPlayer}>
            {/* Video Image Preview */}
            <View style={styles.videoImageContainer}>
              {/* Exercise image background */}
              <View style={styles.videoImage}>
                <View style={styles.exerciseImageContent}>
                  {/* Simple exercise illustration */}
                  <View style={styles.exerciseIllustration}>
                    <View style={styles.figureContainer}>
                      <View style={styles.figureHead} />
                      <View style={styles.figureBody} />
                      <View style={styles.figureArms} />
                      <View style={styles.figureLegs} />
                    </View>
                    <View style={styles.dumbbellContainer}>
                      <View style={styles.dumbbell} />
                      <View style={styles.dumbbell} />
                    </View>
                  </View>
                </View>
                
                {/* Play button overlay */}
                <View style={styles.videoOverlay}>
                  <TouchableOpacity style={styles.playButton} onPress={handlePlayVideo}>
                    <Ionicons name="play" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Exercise List Section */}
        <View style={styles.exerciseListContainer}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          {exercises.map(renderExerciseCard)}
        </View>
      </ScrollView>

      {/* Add Routine Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addRoutineButton} onPress={handleAddRoutine}>
          <Ionicons name="add" size={24} color={colors.white} />
          <Text style={styles.addRoutineText}>Add Routine</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  content: {
    flex: 1,
  },
  videoContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  videoPlayer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.gray1,
  },
  videoImageContainer: {
    flex: 1,
    position: 'relative',
  },
  videoImage: {
    flex: 1,
    backgroundColor: colors.primary,
    position: 'relative',
  },
  exerciseImageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseIllustration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  figureContainer: {
    alignItems: 'center',
  },
  figureHead: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 4,
  },
  figureBody: {
    width: 16,
    height: 30,
    backgroundColor: colors.white,
    marginBottom: 4,
  },
  figureArms: {
    width: 40,
    height: 8,
    backgroundColor: colors.white,
    marginBottom: 4,
  },
  figureLegs: {
    width: 30,
    height: 20,
    backgroundColor: colors.white,
  },
  dumbbellContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dumbbell: {
    width: 12,
    height: 8,
    backgroundColor: colors.black,
    borderRadius: 4,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  exerciseListContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 16,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  addRoutineButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addRoutineText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
});
