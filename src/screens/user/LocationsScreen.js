import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Title, Searchbar, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Import components
import LocationItem from '../../components/common/LocationItem';

// Import mock data
import { locations } from '../../data/mockData';

const LocationsScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(locations);
  
  // Filter locations based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredLocations(locations);
    } else {
      const filtered = locations.filter(
        location => 
          location.name.toLowerCase().includes(query.toLowerCase()) ||
          location.state.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  };
  
  const handleLocationPress = (location) => {
    // If we have an onSelect callback from the route params, use it
    if (route.params?.onSelect) {
      route.params.onSelect(location);
    } else {
      // Otherwise, navigate to the search screen with the selected location
      navigation.navigate('Search', { selectedLocation: location });
    }
  };
  
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search locations..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      
      <Title style={styles.title}>Select a Location</Title>
      
      <FlatList
        data={filteredLocations}
        renderItem={({ item }) => (
          <LocationItem 
            location={item} 
            onPress={handleLocationPress} 
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="map-search" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No locations found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  searchbar: {
    margin: 16,
    borderRadius: 10,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
    color: '#666',
  },
});

export default LocationsScreen;