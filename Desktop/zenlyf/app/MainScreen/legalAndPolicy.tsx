import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const LegalAndPolicy = () => {
  const router = useRouter();

  const handleViewDocument = (documentType: string) => {
    console.log(`Viewing ${documentType}`);
    // Here you would typically open the document or navigate to document viewer
    alert(`${documentType} would be opened here`);
  };

  const handleLiabilityClause = () => {
    console.log('Showing Zenlyf liability clause');
    // Here you would typically show the liability clause
    alert('Zenlyf liability clause would be displayed here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader text="Legal & Policy" contStyle={{paddingLeft:24}} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Terms of Use */}
        <View style={styles.policySection}>
          <View style={styles.policyHeader}>
           <Image source={require("../../assets/images/pdf.png")} style={{width:40,height:40}} />
            <Text style={styles.policyTitle}>Terms of Use</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewButton} 
            onPress={() => handleViewDocument('Terms of Use')}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          <Text style={styles.downloadText}>Download as PDF</Text>
        </View>

        {/* Privacy Policy */}
        <View style={styles.policySection}>
          <View style={styles.policyHeader}>
            <Image source={require("../../assets/images/docs.png")} style={{width:40,height:40}} />
            <Text style={styles.policyTitle}>Privacy Policy</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewButton} 
            onPress={() => handleViewDocument('Privacy Policy')}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>

        {/* Telehealth Consent Guidelines */}
        <View style={styles.policySection}>
          <View style={styles.policyHeader}>
          <Image source={require("../../assets/images/docs.png")} style={{width:40,height:40}} />
            <Text style={styles.policyTitle}>Telehealth Consent Guidelines</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewButton} 
            onPress={() => handleViewDocument('Telehealth Consent Guidelines')}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>

        {/* Medical Disclaimer */}
        <View style={styles.policySection}>
          <View style={styles.policyHeader}>
          <Image source={require("../../assets/images/docs.png")} style={{width:40,height:40}} />
            <Text style={styles.policyTitle}>Medical Disclaimer</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewButton} 
            onPress={() => handleViewDocument('Medical Disclaimer')}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.liabilityButton} onPress={handleLiabilityClause}>
          <Text style={styles.liabilityButtonText}>Show Zenlyf's liability clause</Text>
        </TouchableOpacity>
        
        <Text style={styles.infoNote}>
          All legal views are read-only and downloadable if needed.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LegalAndPolicy;

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
  policySection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 20,
    padding: 20,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap:10,
  },
  documentIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pdfText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  policyTitle: {
    fontSize: 24,
    fontWeight:"500",
    fontFamily: fonts.onestBold,
    color: "#050505",
    flex: 1,
  },
  viewButton: {
    backgroundColor:"#F2F9FF",
    borderRadius: 8,
    borderWidth:1,
    height:52,
    borderColor:"#0077FF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    marginBottom: 8,
    width:"100%",
  },
  viewButtonText: {
    fontSize: 18,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
    fontWeight:"500",
  },
  downloadText: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  liabilityButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  liabilityButtonText: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.white,
    fontWeight:"700",
  },
  infoNote: {
    fontSize: 12,
    fontWeight:"400",
    fontFamily: fonts.onestLight,
    color: colors.primary,
    textAlign: 'center',
  },
});