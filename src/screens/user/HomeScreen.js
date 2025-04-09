import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Text, Title, Button, Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Import components
import EventCard from '../../components/common/EventCard';
import CategoryItem from '../../components/common/CategoryItem';

// Import mock data
import { events, categories } from '../../data/mockData';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  // Featured events (first 3 events)
  const featuredEvents = events.slice(0, 3);
  
  // Upcoming events (all events sorted by date)
  const upcomingEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  
  const handleEventPress = (event) => {
    navigation.navigate('EventDetails', { eventId: event.id });
  };
  
  const handleCategoryPress = (category) => {
    navigation.navigate('Categories', { selectedCategory: category });
  };
  
  const handleSeeAllCategories = () => {
    navigation.navigate('Categories');
  };
  
  const handleSeeAllEvents = () => {
    navigation.navigate('Search');
  };
  
  const handleLocationPress = () => {
    navigation.navigate('Locations');
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Appbar.Header>
        <Appbar.Content title="EventHub" />
        <Appbar.Action icon="magnify" onPress={() => navigation.navigate('Search')} />
        <Appbar.Action icon="bell" onPress={() => {}} />
      </Appbar.Header>
      
      <ScrollView style={styles.scrollView}>
        {/* Location Selector */}
        <TouchableOpacity 
          style={styles.locationSelector} 
          onPress={handleLocationPress}
        >
          <MaterialCommunityIcons name="map-marker" size={24} color="#6200ee" />
          <Text style={styles.locationText}>New York, NY</Text>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#6200ee" />
        </TouchableOpacity>
        
        {/* Featured Events Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Title style={styles.sectionTitle}>Featured Events</Title>
            <Button onPress={handleSeeAllEvents}>See All</Button>
          </View>
          
          <FlatList
            data={featuredEvents}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.featuredEventContainer}>
                <EventCard event={item} onPress={handleEventPress} />
              </View>
            )}
          />
        </View>
        
        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Title style={styles.sectionTitle}>Browse Categories</Title>
            <Button onPress={handleSeeAllCategories}>See All</Button>
          </View>
          
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CategoryItem 
                category={item} 
                onPress={handleCategoryPress} 
              />
            )}
          />
        </View>
        
        {/* Upcoming Events Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Title style={styles.sectionTitle}>Upcoming Events</Title>
            <Button onPress={handleSeeAllEvents}>See All</Button>
          </View>
          
          {upcomingEvents.slice(0, 5).map((event) => (
            <EventCard 
              key={event.id.toString()} 
              event={event} 
              onPress={handleEventPress} 
            />
          ))}
        </View>
        
        {/* Buffer space at bottom */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  scrollView: {
    flex: 1,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 8,
  },
  sectionContainer: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
  },
  featuredEventContainer: {
    width: 300,
  },
});

export default HomeScreen;