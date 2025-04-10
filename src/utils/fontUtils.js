// src/utils/fontUtils.js
import * as Font from 'expo-font';
import { Platform } from 'react-native';
import { FONTS } from '../constants/theme';

// This function will load fonts asynchronously
export const loadFonts = async () => {
  // For a non-Expo project, you'll need to import the font files differently
  // and use a different approach to load them
  
  if (Platform.OS === 'web') {
    // For web, you'd typically load fonts via CSS or a Web Font Loader
    console.log('Web platform detected. Load fonts via CSS or other web methods.');
    return;
  }
  
  try {
    await Font.loadAsync({
      // Primary Font - Poppins
      'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      
      // Secondary Font - Inter
      'Inter-Light': require('../assets/fonts/Inter-Light.ttf'),
      'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
      'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
      'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
      'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    });
    console.log('Fonts loaded successfully');
  } catch (error) {
    console.error('Error loading fonts:', error);
    // Fall back to system fonts
  }
};

// This function gets the correct font family name based on the font and weight
export const getFontFamily = (family, weight) => {
  // If using system fonts as fallback
  if (family === 'System') {
    return undefined; // React Native will use the system font
  }
  
  // For custom fonts, construct the font family name
  // For example: 'Poppins-Bold' or 'Inter-Regular'
  if (weight) {
    const weightMap = {
      '300': 'Light',
      '400': 'Regular',
      '500': 'Medium',
      '600': 'SemiBold',
      '700': 'Bold',
    };
    
    return `${family}-${weightMap[weight] || 'Regular'}`;
  }
  
  // Default to regular weight
  return `${family}-Regular`;
};

// For development, until you have the font files, this function will help
// determine what font to use
export const getFont = (family, weight) => {
  // During development, use system fonts
  return {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: weight || '400',
  };
  
  // Once you have the font files, uncomment this:
  /*
  return {
    fontFamily: getFontFamily(family, weight),
  };
  */
};

export default {
  loadFonts,
  getFontFamily,
  getFont,
};