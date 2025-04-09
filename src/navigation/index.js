// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Import screens - We'll create these next
import HomeScreen from '../screens/user/HomeScreen';
import SearchScreen from '../screens/user/SearchScreen';
import CategoriesScreen from '../screens/user/CategoriesScreen';
import LocationsScreen from '../screens/user/LocationsScreen';
import EventDetailsScreen from '../screens/user/EventDetailsScreen';
import TicketScreen from '../screens/user/TicketScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import CheckoutScreen from '../screens/user/CheckoutScreen';
import OrganizerDashboardScreen from '../screens/organizer/DashboardScreen';
import AdminDashboardScreen from '../screens/admin/DashboardScreen';
import LoginScreen from '../screens/user/LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tab Navigator for the user-facing app
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'magnify' : 'magnify';
          } else if (route.name === 'Tickets') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#6200ee',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Tickets" component={TicketScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Main Stack Navigator with screens common to all users
const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen 
        name="Main" 
        component={MainTabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Event Details' }} />
      <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Categories' }} />
      <Stack.Screen name="Locations" component={LocationsScreen} options={{ title: 'Locations' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
    </Stack.Navigator>
  );
};

// Organizer Dashboard Stack
const OrganizerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrganizerDashboard" component={OrganizerDashboardScreen} options={{ title: 'Organizer Dashboard' }} />
      {/* Add organizer-specific screens here */}
    </Stack.Navigator>
  );
};

// Admin Dashboard Stack
const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Admin Dashboard' }} />
      {/* Add admin-specific screens here */}
    </Stack.Navigator>
  );
};

// Root Navigator that handles authentication and different user types
const RootNavigator = () => {
  // Normally, we'd check auth state here
  const isSignedIn = true; // For prototype purposes
  const userType = 'customer'; // 'customer', 'organizer', or 'admin'

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isSignedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : userType === 'customer' ? (
          <Stack.Screen name="UserMain" component={MainStack} />
        ) : userType === 'organizer' ? (
          <Stack.Screen name="OrganizerMain" component={OrganizerStack} />
        ) : (
          <Stack.Screen name="AdminMain" component={AdminStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;