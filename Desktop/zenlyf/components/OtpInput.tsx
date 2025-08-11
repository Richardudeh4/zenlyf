import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../Config/colors';
import { fonts } from '../Config/Fonts';

interface OtpInputProps {
  length: number;
  onComplete: (code: string) => void;
  onCodeChange?: (code: string) => void;
}

const { width } = Dimensions.get('window');

export default function OtpInput({ length, onComplete, onCodeChange }: OtpInputProps) {
  const [code, setCode] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    const fullCode = code.join('');
    if (onCodeChange) {
      onCodeChange(fullCode);
    }
    
    if (fullCode.length === length) {
      onComplete(fullCode);
    }
  }, [code, length, onComplete, onCodeChange]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    
    // Only allow single digit
    if (text.length > 1) {
      text = text.slice(-1);
    }
    
    newCode[index] = text;
    setCode(newCode);

    // Move to next input if there's text
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current is empty
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputPress = (index: number) => {
    // Focus the first empty input or the pressed input
    const firstEmptyIndex = code.findIndex(digit => !digit);
    const targetIndex = firstEmptyIndex !== -1 ? firstEmptyIndex : index;
    inputRefs.current[targetIndex]?.focus();
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TouchableOpacity
          key={index}
          style={styles.inputContainer}
          onPress={() => handleInputPress(index)}
          activeOpacity={0.7}
        >
          <TextInput
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={[
              styles.input,
              digit ? styles.inputFilled : styles.inputEmpty,
            ]}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
            caretHidden
            textAlign="center"
            fontSize={24}
            fontFamily={fonts.onestBold}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  input: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fonts.onestBold,
  },
  inputEmpty: {
    borderColor: '#E5E5E5',
    backgroundColor: colors.white,
  },
  inputFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
});
