// src/screens/user/CategoriesScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Title, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Import components
import EventCard from '../../components/common/EventCard';
import EventListEmpty from '../../components/common/EventListEmpty';

// Import mock data
import { events, categories } from '../../data/mockData';

const CategoriesScreen = ({ route, navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  // Check if we have a selected category passed as a param
  useEffect(() => {
    if (route.params?.selectedCategory) {
      setSelectedCategory(route.params.selectedCategory);
    }
  }, [route.params]);
  
  // Filter events whenever the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      const filtered = events.filter(event => event.categoryId === selectedCategory.id);
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents([]);
    }
  }, [selectedCategory]);
  
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };
  
  const handleEventPress = (event) => {
    navigation.navigate('EventDetails', { eventId: event.id });
  };
  
  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };
  
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)}>
      <Surface style={styles.categorySurface}>
        <MaterialCommunityIcons name={item.icon} size={48} color="#6200ee" />
        <Text style={styles.categoryName}>{item.name}</Text>
      </Surface>
    </TouchableOpacity>
  );
  
  const renderEventItem = ({ item }) => (
    <EventCard event={item} onPress={handleEventPress} />
  );
  
  // If no category is selected, show the categories grid
  if (!selectedCategory) {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Browse Event Categories</Title>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.categoriesContainer}
        />
      </View>
    );
  }
  
  // If a category is selected, show the events for that category
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackToCategories}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#6200ee" />
          <Text style={styles.backText}>All Categories</Text>
        </TouchableOpacity>
        
        <View style={styles.selectedCategoryContainer}>
          <MaterialCommunityIcons name={selectedCategory.icon} size={24} color="#6200ee" />
          <Title style={styles.selectedCategoryTitle}>{selectedCategory.name}</Title>
        </View>
      </View>
      
      <Divider />
      
      <FlatList
        data={filteredEvents}
        renderItem={renderEventItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.eventsContainer}
        ListEmptyComponent={
          <EventListEmpty 
            message={`No events found in ${selectedCategory.name} category.`}
          />
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
  title: {
    fontSize: 22,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  categoriesContainer: {
    padding: 8,
  },
  categorySurface: {
    margin: 8,
    height: 140,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 10,
  },
  categoryName: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  headerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#6200ee',
  },
  selectedCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCategoryTitle: {
    marginLeft: 12,
    fontSize: 22,
  },
  eventsContainer: {
    paddingVertical: 8,
  },
});

export default CategoriesScreen;