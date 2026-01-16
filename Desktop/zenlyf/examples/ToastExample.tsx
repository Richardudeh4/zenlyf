import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../Config/colors';
import { fonts } from '../Config/Fonts';
import { useToast } from '../contexts/ToastContext';

const ToastExample = () => {
  const { showToast } = useToast();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toast Examples</Text>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.success }]}
        onPress={() => showToast('Success! Operation completed successfully.', 'success')}
      >
        <Text style={styles.buttonText}>Show Success Toast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.error }]}
        onPress={() => showToast('Error! Something went wrong.', 'error')}
      >
        <Text style={styles.buttonText}>Show Error Toast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.orange }]}
        onPress={() => showToast('Warning! Please check your input.', 'warning')}
      >
        <Text style={styles.buttonText}>Show Warning Toast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => showToast('Info: This is an informational message.', 'info')}
      >
        <Text style={styles.buttonText}>Show Info Toast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.gray1 }]}
        onPress={() => showToast('Custom duration: 5 seconds', 'info', 5000)}
      >
        <Text style={styles.buttonText}>Show Custom Duration Toast</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.onestMedium,
  },
});

export default ToastExample;
















