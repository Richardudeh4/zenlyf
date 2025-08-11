import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxProps {
  checked: boolean;
  onPress: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'large';
  color?: string;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;
  iconColor?: string;
  borderColor?: string;
  variant?: 'square' | 'rounded' | 'circle';
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  label,
  disabled = false,
  size = 'medium',
  color = '#007AFF',
  labelStyle,
  containerStyle,
  checkboxStyle,
  iconColor,
  borderColor,
  variant = 'square',
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'large':
        return { width: 23, height: 23, iconSize: 18, fontSize: 18 };
      default:
        return { width: 22, height: 22, iconSize: 14, fontSize: 16 };
    }
  };

  const getBorderRadius = () => {
    const sizeStyles = getSizeStyles();
    switch (variant) {
      case 'circle':
        return sizeStyles.width / 2;
      case 'rounded':
        return 6;
      default:
        return 3;
    }
  };

  const sizeStyles = getSizeStyles();
  const borderRadius = getBorderRadius();

  const handlePress = () => {
    if (!disabled) {
      onPress(!checked);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.checkbox,
          {
            width: sizeStyles.width,
            height: sizeStyles.height,
            borderRadius,
            backgroundColor: checked ? color : 'transparent',
            borderColor: borderColor || (checked ? color : '#CCCCCC'),
            opacity: disabled ? 0.5 : 1,
          },
          checkboxStyle,
        ]}
      >
        {checked && (
          <Ionicons
            name="checkmark"
            size={sizeStyles.iconSize}
            color={iconColor || 'white'}
          />
        )}
      </View>
      {label && (
        <Text
          style={[
            styles.label,
            {
              fontSize: sizeStyles.fontSize,
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  label: {
    flex: 1,
    color: '#333333',
  },
});

export default Checkbox;