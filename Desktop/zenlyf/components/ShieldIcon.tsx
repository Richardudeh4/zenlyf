import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { colors } from '../Config/colors';

export default function ShieldIcon() {
  const shieldSvg = useMemo(() => `
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Shield background -->
      <path d="M60 10L100 25V55C100 80 82 102 60 110C38 102 20 80 20 55V25L60 10Z" fill="${colors.primary}" stroke="${colors.primary}" stroke-width="2"/>
      
      <!-- Checkmark -->
      <path d="M45 60L55 70L75 50" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `, []);

  return (
    <View style={styles.container}>
      <SvgXml xml={shieldSvg} width={120} height={120} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
