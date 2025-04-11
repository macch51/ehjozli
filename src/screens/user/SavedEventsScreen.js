import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../constants/theme';
import EventCard from '../../components/common/EventCard';

// Import mock data - in a real app, this would come from your Redux store or API
import { events } from '../../data/mockData';

const SavedEventsScreen = ({ navigation }) => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching saved events
  useEffect(() => {
    // In a real app, you would fetch this from your API or local storage
    setTimeout(() => {
      // Randomly select 3 events as "saved" for demo purposes
      const randomEvents = events
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      setSavedEvents(randomEvents);
      setLoading(false);
    }, 500);
  }, []);

  const handleEventPress = (event) => {
    navigation.navigate('EventDetails', { eventId: event.id });
  };

  const handleRemoveEvent = (eventId) => {
    setSavedEvents(savedEvents.filter(event => event.id !== eventId));
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItemContainer}>
      <EventCard 
        event={item} 
        onPress={() => handleEventPress(item)}
        style={styles.eventCard}
      />
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveEvent(item.id)}
      >
        <MaterialCommunityIcons name="heart" size={24} color={theme.COLORS.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.COLORS.cardBackground} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Events</Text>
      </View>
      
      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <MaterialCommunityIcons 
            name="heart-pulse" 
            size={50} 
            color={theme.COLORS.primary} 
          />
          <Text style={styles.loadingText}>Loading your saved events...</Text>
        </View>
      ) : savedEvents.length > 0 ? (
        <FlatList
          data={savedEvents}
          renderItem={renderEventItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons 
            name="heart-outline" 
            size={80} 
            color={theme.COLORS.border} 
          />
          <Text style={styles.emptyTitle}>No saved events</Text>
          <Text style={styles.emptyText}>
            Events you save will appear here. Tap the heart icon on any event to save it for later.
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseButtonText}>Browse Events</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  header: {
    padding: 16,
    backgroundColor: theme.COLORS.cardBackground,
    ...theme.SHADOWS.small,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80, // Extra padding for tab bar
  },
  eventItemContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  eventCard: {
    width: '100%',
    marginHorizontal: 0,
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.SHADOWS.small,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: theme.COLORS.textMedium,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: theme.COLORS.textMedium,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  browseButton: {
    backgroundColor: theme.COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SavedEventsScreen;