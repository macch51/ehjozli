// src/screens/user/CategoryEventsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import theme from '../../constants/theme';
import EventCard from '../../components/common/EventCard';

// Import mock data - in a real app, you would fetch this from an API
import { events, categories } from '../../data/mockData';

const CategoryEventsScreen = ({ route, navigation }) => {
  // Get the category ID from route params
  const { categoryId } = route.params || { categoryId: 1 }; // Default to first category if not provided
  
  // State
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [categoryEvents, setCategoryEvents] = useState([]);
  const [sortOption, setSortOption] = useState('date'); // 'date', 'price', 'popular'
  const [viewLayout, setViewLayout] = useState('list'); // 'list' or 'grid'
  
  // Get category and events on mount
  useEffect(() => {
    // Simulate API request
    setTimeout(() => {
      // Find the selected category
      const selectedCategory = categories.find(cat => cat.id === categoryId);
      setCategory(selectedCategory);
      
      // Filter events by the selected category
      const filteredEvents = events.filter(event => event.categoryId === categoryId);
      
      // Sort events based on the selected option
      sortEvents(filteredEvents, sortOption);
      
      setLoading(false);
    }, 500);
  }, [categoryId]);
  
  // Sort events when sort option changes
  useEffect(() => {
    if (categoryEvents.length > 0) {
      sortEvents([...categoryEvents], sortOption);
    }
  }, [sortOption]);
  
  // Function to sort events
  const sortEvents = (eventsToSort, option) => {
    let sortedEvents = [...eventsToSort];
    
    switch (option) {
      case 'date':
        sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'price':
        sortedEvents.sort((a, b) => a.price.min - b.price.min);
        break;
      case 'popular':
        // In a real app, this would sort by popularity metrics
        // For now, let's just randomize the order as an example
        sortedEvents.sort(() => Math.random() - 0.5);
        break;
    }
    
    setCategoryEvents(sortedEvents);
  };
  
  // Handle event press
  const handleEventPress = (event) => {
    navigation.navigate('EventDetails', { eventId: event.id });
  };
  
  // Render an event item in grid layout
  const renderGridItem = ({ item }) => {
    const eventDate = new Date(item.date);
    
    return (
      <TouchableOpacity 
        style={styles.gridItem}
        onPress={() => handleEventPress(item)}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.image }} style={styles.gridImage} />
        <View style={styles.gridContent}>
          <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.gridDate} numberOfLines={1}>
            {eventDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </Text>
          <Text style={styles.gridVenue} numberOfLines={1}>{item.venue}</Text>
          <Text style={styles.gridPrice}>${item.price.min.toFixed(0)} - ${item.price.max.toFixed(0)}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  // Get an icon for the category
  const getCategoryIcon = () => {
    switch (categoryId) {
      case 1: return '🎵'; // Concerts
      case 2: return '🎭'; // Theater & Arts
      case 3: return '🏀'; // Sports
      case 4: return '👪'; // Family
      case 5: return '😂'; // Comedy
      case 6: return '💼'; // Conferences
      default: return '🎟️';
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.COLORS.cardBackground} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.categoryIcon}>{getCategoryIcon()}</Text>
          <Text style={styles.headerTitle}>{category?.name || 'Category'}</Text>
        </View>
        
        <View style={styles.placeholderButton} />
      </View>
      
      {/* Filter and Sort Options */}
      <View style={styles.optionsBar}>
        <View style={styles.sortOptions}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          
          <TouchableOpacity 
            style={[
              styles.sortButton,
              sortOption === 'date' && styles.activeSortButton
            ]}
            onPress={() => setSortOption('date')}
          >
            <Text 
              style={[
                styles.sortButtonText,
                sortOption === 'date' && styles.activeSortText
              ]}
            >
              Date
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.sortButton,
              sortOption === 'price' && styles.activeSortButton
            ]}
            onPress={() => setSortOption('price')}
          >
            <Text 
              style={[
                styles.sortButtonText,
                sortOption === 'price' && styles.activeSortText
              ]}
            >
              Price
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.sortButton,
              sortOption === 'popular' && styles.activeSortButton
            ]}
            onPress={() => setSortOption('popular')}
          >
            <Text 
              style={[
                styles.sortButtonText,
                sortOption === 'popular' && styles.activeSortText
              ]}
            >
              Popular
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.viewOptions}>
          <TouchableOpacity 
            style={[
              styles.viewButton,
              viewLayout === 'list' && styles.activeViewButton
            ]}
            onPress={() => setViewLayout('list')}
          >
            <Text style={styles.viewButtonIcon}>☰</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.viewButton,
              viewLayout === 'grid' && styles.activeViewButton
            ]}
            onPress={() => setViewLayout('grid')}
          >
            <Text style={styles.viewButtonIcon}>▦</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Event Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {loading ? 'Loading events...' : `${categoryEvents.length} events found`}
        </Text>
      </View>
      
      {/* Loading State */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.COLORS.primary} />
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      ) : (
        // Events List/Grid
        viewLayout === 'list' ? (
          // List View
          <FlatList
            data={categoryEvents}
            renderItem={({ item }) => (
              <EventCard 
                event={item} 
                onPress={handleEventPress}
                style={styles.listEventCard}
              />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.eventsList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No events found in this category.
                </Text>
              </View>
            }
          />
        ) : (
          // Grid View
          <FlatList
            data={categoryEvents}
            renderItem={renderGridItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.eventsGrid}
            columnWrapperStyle={styles.gridRow}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No events found in this category.
                </Text>
              </View>
            }
          />
        )
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.COLORS.cardBackground,
    ...theme.SHADOWS.small,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.background,
  },
  backButtonText: {
    fontSize: 20,
    color: theme.COLORS.textDark,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
  },
  placeholderButton: {
    width: 40,
    height: 40,
  },
  optionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  sortOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
    marginRight: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activeSortButton: {
    backgroundColor: theme.COLORS.accent + '20', // 20% opacity
  },
  sortButtonText: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
  },
  activeSortText: {
    color: theme.COLORS.accent,
    fontWeight: '600',
  },
  viewOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.background,
    marginLeft: 8,
  },
  activeViewButton: {
    backgroundColor: theme.COLORS.accent + '20', // 20% opacity
  },
  viewButtonIcon: {
    fontSize: 18,
    color: theme.COLORS.textDark,
  },
  countContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  countText: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: theme.COLORS.textMedium,
  },
  eventsList: {
    padding: 16,
  },
  listEventCard: {
    width: '100%',
    marginVertical: 8,
    marginHorizontal: 0,
  },
  eventsGrid: {
    padding: 8,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    backgroundColor: theme.COLORS.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    ...theme.SHADOWS.small,
  },
  gridImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  gridContent: {
    padding: 12,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginBottom: 6,
    height: 40, // Fixed height for two lines
  },
  gridDate: {
    fontSize: 12,
    color: theme.COLORS.textMedium,
    marginBottom: 2,
  },
  gridVenue: {
    fontSize: 12,
    color: theme.COLORS.textMedium,
    marginBottom: 6,
  },
  gridPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.COLORS.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: theme.COLORS.textMedium,
    textAlign: 'center',
  },
});

export default CategoryEventsScreen;