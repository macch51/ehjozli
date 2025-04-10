import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';

// Import your screens
import HomeScreen from './src/screens/user/HomeScreen';

// Use React.FC type instead of JSX.Element
const App: React.FC = () => {
  // Create a mock navigation object
  const mockNavigation = {
    navigate: (screenName: string, params?: any) => {
      console.log(`Navigating to ${screenName}`, params);
    },
    goBack: () => {
      console.log('Going back');
    }
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <HomeScreen navigation={mockNavigation} />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;