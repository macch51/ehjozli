// src/screens/onboarding/OnboardingScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Animated
} from 'react-native';
import theme from '../../constants/theme';

const { width, height } = Dimensions.get('window');

// Onboarding data
const onboardingData = [
  {
    id: '1',
    title: 'Discover Amazing Events',
    description: 'Find concerts, shows, sports events and more happening in your area and worldwide.',
    image: 'https://via.placeholder.com/600x600?text=Discover',
  },
  {
    id: '2',
    title: 'Buy Tickets with Ease',
    description: 'Secure your tickets in just a few taps with our simple and secure checkout process.',
    image: 'https://via.placeholder.com/600x600?text=Buy+Tickets',
  },
  {
    id: '3',
    title: 'Store Tickets Digitally',
    description: 'Access your tickets anytime, anywhere. No printing required, just show your phone at the venue.',
    image: 'https://via.placeholder.com/600x600?text=Digital+Tickets',
  },
  {
    id: '4',
    title: 'Never Miss an Event',
    description: 'Get personalized recommendations and notifications about events you\'ll love.',
    image: 'https://via.placeholder.com/600x600?text=Notifications',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  
  // Handle skip
  const handleSkip = () => {
    // Navigate to login/register screen or home screen
    // navigation.replace('Auth');
    
    // For demo purposes, just log
    console.log('Skipped onboarding');
    alert('Skipped onboarding. Would navigate to login/register screen.');
  };
  
  // Handle next slide
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };
  
  // Handle get started
  const handleGetStarted = () => {
    // Navigate to login/register screen or home screen
    // navigation.replace('Auth');
    
    // For demo purposes, just log
    console.log('Completed onboarding');
    alert('Completed onboarding. Would navigate to login/register screen.');
  };
  
  // Render onboarding item
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };
  
  // Render pagination dots
  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View 
              key={index} 
              style={[
                styles.dot, 
                { width: dotWidth, opacity }
              ]} 
            />
          );
        })}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.container}>
        {/* Skip button */}
        {currentIndex < onboardingData.length - 1 && (
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        
        {/* Slides */}
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
            );
            setCurrentIndex(index);
          }}
          scrollEventThrottle={16}
        />
        
        {/* Pagination */}
        {renderPagination()}
        
        {/* Bottom buttons */}
        <View style={styles.bottomContainer}>
          {currentIndex === onboardingData.length - 1 ? (
            <TouchableOpacity 
              style={styles.getStartedButton}
              onPress={handleGetStarted}
            >
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  skipButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    color: theme.COLORS.accent,
    fontWeight: '500',
  },
  slide: {
    width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: theme.COLORS.textMedium,
    textAlign: 'center',
    lineHeight: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.COLORS.primary,
    marginHorizontal: 5,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: theme.COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 40,
  },
  nextText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  getStartedButton: {
    backgroundColor: theme.COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 40,
  },
  getStartedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;