// src/screens/user/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Switch,
  Alert
} from 'react-native';
import theme from '../../constants/theme';

// Mock user data - in a real app, this would come from your authentication system
const mockUser = {
  id: 'user123',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '(555) 123-4567',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  paymentMethods: [
    { id: 'pm1', type: 'visa', last4: '4242', expiryMonth: 12, expiryYear: 25 },
    { id: 'pm2', type: 'mastercard', last4: '5555', expiryMonth: 3, expiryYear: 26 }
  ],
  preferences: {
    notifications: {
      eventReminders: true,
      priceAlerts: true,
      promotions: false,
    },
    interests: ['Concerts', 'Sports', 'Theater'],
    preferredLocation: 'New York, NY'
  }
};

// Mock purchase history
const mockPurchaseHistory = [
  { 
    id: 'order123',
    date: '2025-02-15',
    event: 'Taylor Swift: The Eras Tour',
    tickets: 2,
    total: 599.98,
  },
  { 
    id: 'order124',
    date: '2025-01-20',
    event: 'Lakers vs. Knicks',
    tickets: 3,
    total: 450.00,
  }
];

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(mockUser);
  
  // Toggle notification settings
  const toggleNotification = (type) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        notifications: {
          ...user.preferences.notifications,
          [type]: !user.preferences.notifications[type]
        }
      }
    });
  };
  
  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            // In a real app, this would clear auth tokens and navigate to login
            alert('Logging out...');
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  // Function to render a payment method card
  const renderPaymentMethod = (method) => {
    const getCardIcon = (type) => {
      switch (type) {
        case 'visa':
          return '💳'; // In a real app, use proper images for card types
        case 'mastercard':
          return '💳';
        case 'amex':
          return '💳';
        default:
          return '💳';
      }
    };
    
    return (
      <View key={method.id} style={styles.paymentCard}>
        <Text style={styles.cardIcon}>{getCardIcon(method.type)}</Text>
        <View style={styles.cardDetails}>
          <Text style={styles.cardType}>
            {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
          </Text>
          <Text style={styles.cardNumber}>•••• {method.last4}</Text>
          <Text style={styles.cardExpiry}>
            Expires {method.expiryMonth}/{method.expiryYear}
          </Text>
        </View>
        <TouchableOpacity style={styles.cardAction}>
          <Text style={styles.cardActionIcon}>⋮</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.COLORS.cardBackground} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.container}>
        {/* Profile Summary */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.avatar }} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
              <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>👤</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Personal Information</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>🔐</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Security</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>🌎</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Language</Text>
              <Text style={styles.menuDetail}>English</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
        </View>
        
        {/* Payment Methods */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>
          
          {user.paymentMethods.map(method => renderPaymentMethod(method))}
        </View>
        
        {/* Purchase History */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Purchase History</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {mockPurchaseHistory.map(purchase => (
            <TouchableOpacity key={purchase.id} style={styles.purchaseItem}>
              <View>
                <Text style={styles.purchaseEvent}>{purchase.event}</Text>
                <Text style={styles.purchaseDate}>
                  {new Date(purchase.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </Text>
                <Text style={styles.purchaseTickets}>{purchase.tickets} tickets</Text>
              </View>
              <Text style={styles.purchaseAmount}>${purchase.total.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.toggleItem}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleText}>Event Reminders</Text>
              <Text style={styles.toggleDescription}>Get reminders before your events</Text>
            </View>
            <Switch
              value={user.preferences.notifications.eventReminders}
              onValueChange={() => toggleNotification('eventReminders')}
              trackColor={{ false: "#d1d5db", true: theme.COLORS.primary }}
              thumbColor={'#fff'}
            />
          </View>
          
          <View style={styles.toggleItem}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleText}>Price Alerts</Text>
              <Text style={styles.toggleDescription}>Get notified about price changes</Text>
            </View>
            <Switch
              value={user.preferences.notifications.priceAlerts}
              onValueChange={() => toggleNotification('priceAlerts')}
              trackColor={{ false: "#d1d5db", true: theme.COLORS.primary }}
              thumbColor={'#fff'}
            />
          </View>
          
          <View style={styles.toggleItem}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleText}>Promotions</Text>
              <Text style={styles.toggleDescription}>Get special offers and promotions</Text>
            </View>
            <Switch
              value={user.preferences.notifications.promotions}
              onValueChange={() => toggleNotification('promotions')}
              trackColor={{ false: "#d1d5db", true: theme.COLORS.primary }}
              thumbColor={'#fff'}
            />
          </View>
        </View>
        
        {/* Help & Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>📚</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>FAQs</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>💬</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Contact Support</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>📝</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Terms of Service</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>🔒</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Privacy Policy</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.COLORS.cardBackground,
    ...theme.SHADOWS.small,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.background,
  },
  headerButtonIcon: {
    fontSize: 20,
  },
  profileSection: {
    backgroundColor: theme.COLORS.cardBackground,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
    ...theme.SHADOWS.small,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
    marginBottom: 12,
  },
  editProfileButton: {
    alignSelf: 'flex-start',
  },
  editProfileText: {
    color: theme.COLORS.primary,
    fontWeight: '600',
  },
  section: {
    backgroundColor: theme.COLORS.cardBackground,
    padding: 16,
    marginBottom: 16,
    ...theme.SHADOWS.small,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: theme.COLORS.primary + '20', // 20% opacity
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addButtonText: {
    color: theme.COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  viewAllText: {
    color: theme.COLORS.accent,
    fontSize: 14,
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.COLORS.accent + '15', // 15% opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 18,
  },
  menuContent: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: theme.COLORS.textDark,
  },
  menuDetail: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
    marginTop: 2,
  },
  menuChevron: {
    fontSize: 18,
    color: theme.COLORS.textLight,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.COLORS.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  cardDetails: {
    flex: 1,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.COLORS.textDark,
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 12,
    color: theme.COLORS.textLight,
  },
  cardAction: {
    padding: 8,
  },
  cardActionIcon: {
    fontSize: 18,
    color: theme.COLORS.textMedium,
  },
  purchaseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  purchaseEvent: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.COLORS.textDark,
    marginBottom: 4,
  },
  purchaseDate: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
    marginBottom: 4,
  },
  purchaseTickets: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
  },
  purchaseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  toggleInfo: {
    flex: 1,
    paddingRight: 16,
  },
  toggleText: {
    fontSize: 16,
    color: theme.COLORS.textDark,
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
  },
  logoutButton: {
    backgroundColor: '#f8e0e0', // Light red
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.COLORS.error,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    color: theme.COLORS.textLight,
    marginBottom: 32,
  },
});

export default ProfileScreen;