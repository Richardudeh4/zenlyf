import React from 'react';
import { View, Text, Switch, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../Config/colors';
import { fonts } from '../Config/Fonts';

interface SwitchInputProps {
  label?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  contStyle?: StyleProp<ViewStyle>;
}

const SwitchInput = ({ label, value, onValueChange, contStyle }: SwitchInputProps) => {
  return (
    <View style={[styles.container, contStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        trackColor={{ false: '#D1D1D6', true: colors.primary }}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
        ios_backgroundColor="#D1D1D6"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
});

export default SwitchInput;
