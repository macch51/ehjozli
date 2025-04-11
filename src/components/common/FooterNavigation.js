// src/components/common/FooterNavigation.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../constants/theme';

const FooterNavigation = ({ navigation, activeTab }) => {
  // Define our tabs with updated route configuration
  const tabs = [
    { 
      key: 'home', 
      label: 'Home', 
      iconName: 'home',
      // Define multiple possible route configurations to try
      routes: ['Home', 'HomeScreen', 'HomeStack', 'Main', 'HomeTab'] 
    },
    { 
      key: 'explore', 
      label: 'Explore', 
      iconName: 'magnify',
      routes: ['Explore', 'SearchScreen', 'ExploreStack', 'Search', 'ExploreTab'] 
    },
    { 
      key: 'tickets', 
      label: 'Tickets', 
      iconName: 'ticket',
      routes: ['Tickets', 'MyTicketsScreen', 'TicketsStack', 'MyTickets', 'TicketsTab'] 
    },
    { 
      key: 'saved', 
      label: 'Saved', 
      iconName: 'heart',
      routes: ['Saved', 'SavedEventsScreen', 'SavedStack', 'SavedEvents', 'SavedTab'] 
    },
    { 
      key: 'profile', 
      label: 'Profile', 
      iconName: 'account',
      routes: ['Profile', 'ProfileScreen', 'ProfileStack', 'UserProfile', 'ProfileTab'] 
    }
  ];
  
  const tryNavigation = (tab) => {
    if (!navigation || typeof navigation.navigate !== 'function') {
      Alert.alert('Navigation Error', 'No valid navigation function available');
      return;
    }
    
    // Try different route name variations to see if any works
    const attemptNavigate = (routeIndex = 0) => {
      if (routeIndex >= tab.routes.length) {
        Alert.alert(
          'Navigation Failed', 
          `Could not navigate to ${tab.label} with any of the route names.`
        );
        return;
      }
      
      const routeName = tab.routes[routeIndex];
      try {
        console.log(`Attempting to navigate to: ${routeName}`);
        
        // Show which route we're trying
        Alert.alert(
          'Navigating', 
          `Trying to navigate to route: ${routeName}`,
          [
            { 
              text: 'OK', 
              // Try the next route name if this one doesn't work
              onPress: () => {
                navigation.navigate(routeName);
                console.log(`Navigation.navigate("${routeName}") called`);
                
                // Give a moment to see if navigation happened
                setTimeout(() => {
                  Alert.alert(
                    'Navigation Result',
                    `Did the screen change to ${tab.label}?`,
                    [
                      {
                        text: 'No, try next route',
                        onPress: () => attemptNavigate(routeIndex + 1)
                      },
                      {
                        text: 'Yes, it worked!',
                        style: 'default'
                      }
                    ]
                  );
                }, 500);
              }
            }
          ]
        );
      } catch (error) {
        console.error(`Error navigating to ${routeName}:`, error);
        // Try the next route name if this one fails
        attemptNavigate(routeIndex + 1);
      }
    };
    
    // Start trying route names
    attemptNavigate();
  };
  
  return (
    <View style={styles.footer}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.key;
        // Use outline icons when not active
        const iconName = isActive ? tab.iconName : `${tab.iconName}-outline`;
        
        return (
          <TouchableOpacity 
            key={tab.key}
            style={styles.footerTab}
            onPress={() => {
              Alert.alert(
                `${tab.label} Tab Pressed`, 
                `Would you like to try navigating to ${tab.label}?`,
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Try Navigation', onPress: () => tryNavigation(tab) }
                ]
              );
            }}
          >
            <MaterialCommunityIcons 
              name={iconName}
              size={24} 
              color={isActive ? theme.COLORS.primary : theme.COLORS.textLight} 
            />
            <Text 
              style={[
                styles.footerText, 
                isActive && styles.activeFooterText
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: theme.COLORS.cardBackground,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.COLORS.border,
    paddingBottom: 4,
  },
  footerTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: theme.COLORS.textLight,
    marginTop: 2,
  },
  activeFooterText: {
    color: theme.COLORS.primary,
    fontWeight: '600',
  },
});

export default FooterNavigation;