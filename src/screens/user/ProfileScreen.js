import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Title, Subheading, Surface, Divider, Switch, Button, Avatar, List } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Import mock data
import { users, events } from '../../data/mockData';

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // For the prototype, we'll use the first user in our mock data
  const currentUser = users[0];
  
  // Get saved events
  const savedEvents = currentUser.savedEvents.map(eventId => 
    events.find(e => e.id === eventId)
  ).filter(Boolean); // Filter out any undefined values
  
  // Get payment methods
  const paymentMethods = currentUser.paymentMethods || [];
  
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };
  
  const handleLogout = () => {
    // In a real app, this would handle logging out
    // For the prototype, we'll just show a message
    alert('Logout functionality would be implemented here');
  };
  
  const handleEditProfile = () => {
    // This would navigate to an edit profile screen in a real app
    alert('Edit Profile functionality would be implemented here');
  };
  
  const handleSavedEventPress = (event) => {
    navigation.navigate('EventDetails', { eventId: event.id });
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <Surface style={styles.profileHeader}>
        <Avatar.Text 
          size={80} 
          label={currentUser.name.split(' ').map(n => n[0]).join('')}
          color="#fff"
          style={styles.avatar}
        />
        
        <View style={styles.profileInfo}>
          <Title style={styles.name}>{currentUser.name}</Title>
          <Subheading style={styles.email}>{currentUser.email}</Subheading>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </Surface>
      
      {/* Account Settings */}
      <List.Section>
        <List.Subheader>Account Settings</List.Subheader>
        
        <List.Item
          title="Personal Information"
          left={props => <List.Icon {...props} icon="account-outline" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
        />
        
        <List.Item
          title="Notifications"
          left={props => <List.Icon {...props} icon="bell-outline" />}
          right={() => (
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              color="#6200ee"
            />
          )}
        />
        
        <List.Item
          title="Payment Methods"
          description={`${paymentMethods.length} saved`}
          left={props => <List.Icon {...props} icon="credit-card" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
        />
        
        <List.Item
          title="Purchase History"
          left={props => <List.Icon {...props} icon="history" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
        />
      </List.Section>
      
      <Divider />
      
      {/* Saved Events */}
      <List.Section>
        <List.Subheader>Saved Events</List.Subheader>
        
        {savedEvents.length > 0 ? (
          savedEvents.map(event => (
            <List.Item
              key={event.id}
              title={event.title}
              description={event.venue}
              left={() => (
                <Image 
                  source={{ uri: event.image }}
                  style={styles.savedEventImage}
                />
              )}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleSavedEventPress(event)}
              style={styles.savedEventItem}
            />
          ))
        ) : (
          <View style={styles.emptyEventsContainer}>
            <MaterialCommunityIcons name="bookmark-off" size={60} color="#ccc" />
            <Text style={styles.emptyEventsText}>No saved events</Text>
            <Button 
              mode="contained" 
              onPress={() => navigation.navigate('Search')}
              style={styles.browseButton}
            >
              Browse Events
            </Button>
          </View>
        )}
      </List.Section>
      
      <Divider />
      
      {/* App Settings and Help */}
      <List.Section>
        <List.Subheader>App Settings</List.Subheader>
        
        <List.Item
          title="Help & Support"
          left={props => <List.Icon {...props} icon="help-circle-outline" />}
          onPress={() => {}}
        />
        
        <List.Item
          title="Privacy Policy"
          left={props => <List.Icon {...props} icon="shield-account" />}
          onPress={() => {}}
        />
        
        <List.Item
          title="Terms of Service"
          left={props => <List.Icon {...props} icon="file-document-outline" />}
          onPress={() => {}}
        />
        
        <List.Item
          title="About"
          left={props => <List.Icon {...props} icon="information-outline" />}
          onPress={() => {}}
        />
      </List.Section>
      
      {/* Logout Button */}
      <Button 
        mode="outlined" 
        icon="logout" 
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Log Out
      </Button>
      
      {/* Version Info */}
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  avatar: {
    backgroundColor: '#6200ee',
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  name: {
    fontSize: 22,
  },
  email: {
    color: '#666',
  },
  editButton: {
    marginTop: 8,
  },
  editButtonText: {
    color: '#6200ee',
    fontWeight: '500',
  },
  savedEventImage: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 4,
  },
  savedEventItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  emptyEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyEventsText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 12,
    textAlign: 'center',
  },
  browseButton: {
    marginTop: 8,
  },
  logoutButton: {
    margin: 16,
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 20,
  },
});

export default ProfileScreen;