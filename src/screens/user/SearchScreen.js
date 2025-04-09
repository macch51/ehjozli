import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Chip, Button, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Import components
import SearchBar from '../../components/common/SearchBar';
import EventCard from '../../components/common/EventCard';
import EventListEmpty from '../../components/common/EventListEmpty';

// Import mock data
import { events, categories, locations } from '../../data/mockData';

const SearchScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Check if we have any params passed from other screens
  useEffect(() => {
    if (route.params?.selectedCategory) {
      setSelectedCategory(route.params.selectedCategory);
    }
    
    if (route.params?.selectedLocation) {
      setSelectedLocation(route.params.selectedLocation);
    }
  }, [route.params]);
  
  // Filter events whenever search criteria change
  useEffect(() => {
    setLoading(true);
    
    // Simulate network delay
    const timer = setTimeout(() => {
      let filtered = [...events];
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(event => 
          event.title.toLowerCase().includes(query) || 
          event.description.toLowerCase().includes(query) ||
          event.venue.toLowerCase().includes(query)
        );
      }
      
      // Filter by category
      if (selectedCategory) {
        filtered = filtered.filter(event => event.categoryId === selectedCategory.id);
      }
      
      // Filter by location
      if (selectedLocation) {
        filtered = filtered.filter(event => event.locationId === selectedLocation.id);
      }
      
      setFilteredEvents(filtered);
      setLoading(false);
    }, 500); // Simulated delay
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedLocation]);
  
  const handleEventPress = (event) => {
    navigation.navigate('EventDetails', { eventId: event.id });
  };
  
  const handleCategoryPress = (category) => {
    if (selectedCategory && selectedCategory.id === category.id) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(category);
    }
  };
  
  const handleLocationPress = () => {
    navigation.navigate('Locations', { 
      onSelect: (location) => {
        setSelectedLocation(location);
        navigation.goBack();
      }
    });
  };
  
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedLocation(null);
  };
  
  const renderItem = ({ item }) => (
    <EventCard event={item} onPress={handleEventPress} />
  );
  
  return (
    <View style={styles.container}>
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search events, venues, artists..."
      />
      
      {/* Filters Section */}
      <View style={styles.filtersContainer}>
        {/* Categories Filter */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Chip
                mode="outlined"
                selected={selectedCategory?.id === item.id}
                style={styles.categoryChip}
                onPress={() => handleCategoryPress(item)}
                icon={() => (
                  <MaterialCommunityIcons 
                    name={item.icon} 
                    size={16} 
                    color={selectedCategory?.id === item.id ? '#6200ee' : '#666'} 
                  />
                )}
              >
                {item.name}
              </Chip>
            )}
          />
        </View>
        
        {/* Location Filter */}
        <TouchableOpacity 
          style={styles.locationFilter}
          onPress={handleLocationPress}
        >
          <MaterialCommunityIcons name="map-marker" size={18} color="#6200ee" />
          <Text style={styles.locationText}>
            {selectedLocation ? `${selectedLocation.name}, ${selectedLocation.state}` : 'Any Location'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={18} color="#6200ee" />
        </TouchableOpacity>
        
        {/* Clear Filters Button */}
        {(selectedCategory || selectedLocation || searchQuery) && (
          <Button 
            mode="text" 
            compact
            onPress={handleClearFilters}
            style={styles.clearButton}
          >
            Clear All
          </Button>
        )}
      </View>
      
      {/* Results Count */}
      <View style={styles.resultsCountContainer}>
        <Text style={styles.resultsCount}>
          {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
        </Text>
      </View>
      
      {/* Events List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Text style={styles.loadingText}>Searching events...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EventListEmpty 
              message="No events found. Try adjusting your filters."
              onRefresh={handleClearFilters}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingBottom: 12,
  },
  categoriesContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  categoryChip: {
    marginRight: 8,
    marginBottom: 4,
  },
  locationFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 4,
  },
  locationText: {
    marginHorizontal: 8,
    flex: 1,
    fontSize: 14,
  },
  clearButton: {
    alignSelf: 'flex-end',
    marginRight: 16,
    marginTop: 8,
  },
  resultsCountContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f6f6f6',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default SearchScreen;