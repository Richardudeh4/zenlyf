import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
  size?: number;
  selectedColor?: string;
  unselectedBorderColor?: string;
  selectedBorderWidth?: number;
  unselectedBorderWidth?: number;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  radioStyle?: ViewStyle;
  value?: any;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  onPress,
  label,
  disabled = false,
  size = 24,
  selectedColor = '#0077FF',
  unselectedBorderColor = '#D9D9D9',
  selectedBorderWidth = 15,
  unselectedBorderWidth = 8,
  labelStyle,
  containerStyle,
  radioStyle,
  value,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  const radioButtonStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: selected ? selectedBorderWidth : unselectedBorderWidth,
    borderColor: selected ? selectedColor : unselectedBorderColor,
    backgroundColor: selected ? selectedColor : 'transparent',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={[radioButtonStyle, radioStyle]} />
      {label && (
        <Text
          style={[
            styles.label,
            {
              opacity: disabled ? 0.5 : 1,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 8,
    flex: 1,
  },
});

export default RadioButton;