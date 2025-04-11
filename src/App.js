// App.js - Direct integration of FooterNavigation for testing
import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet,
  ScrollView 
} from 'react-native';
import FooterNavigation from './src/components/common/FooterNavigation';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  
  // Simple navigation object to pass to FooterNavigation
  const mockNavigation = {
    navigate: (screenName) => {
      console.log(`Navigation requested to: ${screenName}`);
      // Update the current screen for demonstration
      setCurrentScreen(screenName.toLowerCase());
    }
  };
  
  // Simple screens to display based on current selection
  const renderScreen = () => {
    switch(currentScreen) {
      case 'home':
        return (
          <View style={styles.screenContent}>
            <Text style={styles.heading}>Home Screen</Text>
            <Text style={styles.paragraph}>
              This is the home screen content. Try clicking different tabs in the footer.
            </Text>
          </View>
        );
      case 'explore':
        return (
          <View style={styles.screenContent}>
            <Text style={styles.heading}>Explore Screen</Text>
            <Text style={styles.paragraph}>
              This is the explore/search screen content. Try clicking different tabs in the footer.
            </Text>
          </View>
        );
      case 'tickets':
        return (
          <View style={styles.screenContent}>
            <Text style={styles.heading}>Tickets Screen</Text>
            <Text style={styles.paragraph}>
              This is the tickets screen content. Try clicking different tabs in the footer.
            </Text>
          </View>
        );
      case 'saved':
        return (
          <View style={styles.screenContent}>
            <Text style={styles.heading}>Saved Screen</Text>
            <Text style={styles.paragraph}>
              This is the saved items screen content. Try clicking different tabs in the footer.
            </Text>
          </View>
        );
      case 'profile':
        return (
          <View style={styles.screenContent}>
            <Text style={styles.heading}>Profile Screen</Text>
            <Text style={styles.paragraph}>
              This is the profile screen content. Try clicking different tabs in the footer.
            </Text>
          </View>
        );
      default:
        return (
          <View style={styles.screenContent}>
            <Text style={styles.heading}>Navigation Test</Text>
            <Text style={styles.paragraph}>
              Please select a tab from the footer below.
            </Text>
          </View>
        );
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.navInfo}>
          Current Screen: <Text style={styles.screenName}>{currentScreen}</Text>
        </Text>
        {renderScreen()}
        <Text style={styles.instructions}>
          This is a direct implementation test. The FooterNavigation component is 
          receiving a mock navigation object with a navigate function that updates 
          the current screen state.
        </Text>
      </ScrollView>
      
      {/* Footer */}
      <FooterNavigation 
        navigation={mockNavigation} 
        activeTab={currentScreen} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100, // Ensure content doesn't get hidden behind footer
  },
  navInfo: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
  },
  screenName: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  screenContent: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
  instructions: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666666',
    lineHeight: 20,
  }
});

export default App;