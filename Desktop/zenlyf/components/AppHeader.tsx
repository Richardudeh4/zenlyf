
import { useNavigation, useRouter } from 'expo-router';
import React, { CSSProperties } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { fonts } from "../Config/Fonts";
import P from "./P";

const { width, height } = Dimensions.get("window");

interface PProps {
  text?: string;
  iconComp?: any;
  contStyle?: CSSProperties;
  navStyle?: CSSProperties;
  showBorder?: boolean;
  showBackArrow?: boolean;
  goHome?: boolean;
  cancel?: boolean;
  modalClose?: () => void;
  disabled?: boolean;
  goToScreen?: string;
}

export default function AppHeader({
  text,
  iconComp,
  contStyle,
  navStyle,
  showBorder,
  showBackArrow = true,
  goHome = false,
  cancel,
  disabled,
  modalClose,
  goToScreen,
}: PProps) {
  const router = useRouter();
  const navigation = useNavigation();

  const handlePress = () => {
    if (cancel && modalClose) {
      modalClose();
    } else if (goHome) {
      // For Expo Router, reset to home
      router.replace('/');
    } else if (goToScreen) {
      router.push(goToScreen);
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.navCont,contStyle, showBorder && styles.navBorder]}>
      <View style={[styles.nav, navStyle]}>
        <TouchableOpacity
          onPress={handlePress}
          style={{ flexDirection: "row", alignItems: "center" }}
          disabled={disabled}
        >
          {showBackArrow && (
            <Image source={require("../assets/images/arrowback.png")} style={{ marginRight: 12 }} />
          )}
          <P style={styles.navText}>{text}</P>
        </TouchableOpacity>
        <P style={styles.navText}> </P>
        {iconComp}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navCont: {
    width : width/2,
    height: 24,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
    
  },
  nav: {
    width: "100%",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    paddingTop: 2,
  },
  navText: {
    color: "#000",
    fontFamily: fonts.onestLight,
  },
  navBorder: {
    borderBottomWidth: 1,
    borderColor: "#313030",
  },
});
