// src/screens/user/SearchResultsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  StatusBar,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import theme from '../../constants/theme';
import EventCard from '../../components/common/EventCard';

// Import mock data - in a real app, you would fetch this from an API
import { events, categories } from '../../data/mockData';

const SearchResultsScreen = ({ route, navigation }) => {
  // Get any params passed to this screen
  const { searchQuery: initialQuery, categoryId } = route.params || {};
  
  // State
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: categoryId || null,
    dateRange: null,
    priceRange: null,
  });
  const [sortOption, setSortOption] = useState('relevance'); // 'relevance', 'date', 'price'
  const [showFilters, setShowFilters] = useState(false);
  const filterHeight = new Animated.Value(0);
  
  // Filter options
  const dateRanges = [
    { id: 'today', name: 'Today' },
    { id: 'tomorrow', name: 'Tomorrow' },
    { id: 'weekend', name: 'This Weekend' },
    { id: 'month', name: 'This Month' },
  ];
  
  const priceRanges = [
    { id: 'free', name: 'Free' },
    { id: 'under50', name: 'Under $50' },
    { id: '50to100', name: '$50 - $100' },
    { id: 'over100', name: 'Over $100' },
  ];
  
  // Search and filter logic
  useEffect(() => {
    performSearch();
  }, [selectedFilters, sortOption, initialQuery]);
  
  const performSearch = () => {
    setLoading(true);
    
    // Simulate network request delay
    setTimeout(() => {
      let filteredResults = [...events];
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredResults = filteredResults.filter(
          event => 
            event.title.toLowerCase().includes(query) || 
            event.description.toLowerCase().includes(query) ||
            event.venue.toLowerCase().includes(query)
        );
      }
      
      // Filter by category
      if (selectedFilters.category) {
        filteredResults = filteredResults.filter(
          event => event.categoryId === selectedFilters.category
        );
      }
      
      // Filter by price range
      if (selectedFilters.priceRange) {
        switch (selectedFilters.priceRange) {
          case 'free':
            filteredResults = filteredResults.filter(
              event => event.price.min === 0
            );
            break;
          case 'under50':
            filteredResults = filteredResults.filter(
              event => event.price.min < 50
            );
            break;
          case '50to100':
            filteredResults = filteredResults.filter(
              event => event.price.min >= 50 && event.price.min <= 100
            );
            break;
          case 'over100':
            filteredResults = filteredResults.filter(
              event => event.price.min > 100
            );
            break;
        }
      }
      
      // Filter by date range
      if (selectedFilters.dateRange) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        switch (selectedFilters.dateRange) {
          case 'today':
            filteredResults = filteredResults.filter(event => {
              const eventDate = new Date(event.date);
              return eventDate.toDateString() === today.toDateString();
            });
            break;
          case 'tomorrow':
            filteredResults = filteredResults.filter(event => {
              const eventDate = new Date(event.date);
              return eventDate.toDateString() === tomorrow.toDateString();
            });
            break;
          case 'weekend':
            // Get next weekend (Friday, Saturday, Sunday)
            const friday = new Date(today);
            const daysUntilFriday = (5 + 7 - today.getDay()) % 7;
            friday.setDate(today.getDate() + daysUntilFriday);
            
            const sunday = new Date(friday);
            sunday.setDate(friday.getDate() + 2);
            
            filteredResults = filteredResults.filter(event => {
              const eventDate = new Date(event.date);
              return eventDate >= friday && eventDate <= sunday;
            });
            break;
          case 'month':
            const nextMonth = new Date(today);
            nextMonth.setMonth(today.getMonth() + 1);
            
            filteredResults = filteredResults.filter(event => {
              const eventDate = new Date(event.date);
              return eventDate >= today && eventDate <= nextMonth;
            });
            break;
        }
      }
      
      // Sort results
      switch (sortOption) {
        case 'date':
          filteredResults.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case 'price':
          filteredResults.sort((a, b) => a.price.min - b.price.min);
          break;
        case 'relevance':
        default:
          // In a real app, you would have a more complex relevance algorithm
          // For now, we'll keep the original order
          break;
      }
      
      setResults(filteredResults);
      setLoading(false);
    }, 500); // Simulate network delay
  };
  
  // Toggle filter panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    Animated.timing(filterHeight, {
      toValue: showFilters ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  
  // Handle filter selections
  const handleCategoryFilter = (categoryId) => {
    setSelectedFilters(prev => ({
      ...prev,
      category: prev.category === categoryId ? null : categoryId
    }));
  };
  
  const handleDateRangeFilter = (dateRangeId) => {
    setSelectedFilters(prev => ({
      ...prev,
      dateRange: prev.dateRange === dateRangeId ? null : dateRangeId
    }));
  };
  
  const handlePriceRangeFilter = (priceRangeId) => {
    setSelectedFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === priceRangeId ? null : priceRangeId
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      category: null,
      dateRange: null,
      priceRange: null,
    });
  };
  
  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedFilters.category) count++;
    if (selectedFilters.dateRange) count++;
    if (selectedFilters.priceRange) count++;
    return count;
  };
  
  // Render filter panel height based on animation
  const filterMaxHeight = filterHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 350], // Adjust based on your filter panel content
  });
  
  // Handle event press
  const handleEventPress = (event) => {
    navigation.navigate('EventDetails', { eventId: event.id });
  };
  
  // Submit search
  const handleSearch = () => {
    performSearch();
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
        
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, venues, artists..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
      </View>
      
      {/* Filter and Sort Options */}
      <View style={styles.filterBar}>
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            getActiveFilterCount() > 0 && styles.activeFilterButton
          ]}
          onPress={toggleFilters}
        >
          <Text style={styles.filterButtonIcon}>🔍</Text>
          <Text style={styles.filterButtonText}>
            Filters {getActiveFilterCount() > 0 ? `(${getActiveFilterCount()})` : ''}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <TouchableOpacity 
            style={styles.sortButton}
            onPress={() => {
              // Simple rotation through sort options
              if (sortOption === 'relevance') setSortOption('date');
              else if (sortOption === 'date') setSortOption('price');
              else setSortOption('relevance');
            }}
          >
            <Text style={styles.sortButtonText}>
              {sortOption === 'relevance' ? 'Relevance' : 
               sortOption === 'date' ? 'Date' : 'Price'}
            </Text>
            <Text style={styles.sortButtonIcon}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Animated Filter Panel */}
      <Animated.View style={[styles.filtersPanel, { maxHeight: filterMaxHeight }]}>
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Categories</Text>
          <View style={styles.filterOptionsRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map(category => (
                <TouchableOpacity 
                  key={category.id}
                  style={[
                    styles.filterChip,
                    selectedFilters.category === category.id && styles.activeFilterChip
                  ]}
                  onPress={() => handleCategoryFilter(category.id)}
                >
                  <Text 
                    style={[
                      styles.filterChipText,
                      selectedFilters.category === category.id && styles.activeFilterChipText
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Date</Text>
          <View style={styles.filterOptionsRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dateRanges.map(dateRange => (
                <TouchableOpacity 
                  key={dateRange.id}
                  style={[
                    styles.filterChip,
                    selectedFilters.dateRange === dateRange.id && styles.activeFilterChip
                  ]}
                  onPress={() => handleDateRangeFilter(dateRange.id)}
                >
                  <Text 
                    style={[
                      styles.filterChipText,
                      selectedFilters.dateRange === dateRange.id && styles.activeFilterChipText
                    ]}
                  >
                    {dateRange.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Price</Text>
          <View style={styles.filterOptionsRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {priceRanges.map(priceRange => (
                <TouchableOpacity 
                  key={priceRange.id}
                  style={[
                    styles.filterChip,
                    selectedFilters.priceRange === priceRange.id && styles.activeFilterChip
                  ]}
                  onPress={() => handlePriceRangeFilter(priceRange.id)}
                >
                  <Text 
                    style={[
                      styles.filterChipText,
                      selectedFilters.priceRange === priceRange.id && styles.activeFilterChipText
                    ]}
                  >
                    {priceRange.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        
        <View style={styles.filterActions}>
          <TouchableOpacity 
            style={styles.clearFiltersButton}
            onPress={clearFilters}
          >
            <Text style={styles.clearFiltersText}>Clear All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.applyFiltersButton}
            onPress={() => {
              toggleFilters();
              performSearch();
            }}
          >
            <Text style={styles.applyFiltersText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      {/* Results Count */}
      <View style={styles.resultsCountContainer}>
        <Text style={styles.resultsCount}>
          {loading ? 'Searching...' : `${results.length} ${results.length === 1 ? 'result' : 'results'} found`}
        </Text>
      </View>
      
      {/* Results List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.COLORS.primary} />
          <Text style={styles.loadingText}>Searching for events...</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EventCard 
              event={item} 
              onPress={() => handleEventPress(item)}
              style={styles.resultCard}
            />
          )}
          contentContainerStyle={styles.resultsList}
          ListEmptyComponent={
            <View style={styles.emptyResultsContainer}>
              <Text style={styles.emptyResultsIcon}>🔍</Text>
              <Text style={styles.emptyResultsTitle}>No results found</Text>
              <Text style={styles.emptyResultsText}>
                Try adjusting your search criteria or filters
              </Text>
              <TouchableOpacity 
                style={styles.resetSearchButton}
                onPress={() => {
                  setSearchQuery('');
                  clearFilters();
                  performSearch();
                }}
              >
                <Text style={styles.resetSearchText}>Reset Search</Text>
              </TouchableOpacity>
            </View>
          }
        />
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
    alignItems: 'center',
    padding: 16,
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
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 20,
    color: theme.COLORS.textDark,
  },
  searchInputContainer: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.COLORS.background,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: 16,
    color: theme.COLORS.textDark,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  activeFilterButton: {
    backgroundColor: `${theme.COLORS.accent}15`, // 15% opacity
  },
  filterButtonIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  filterButtonText: {
    fontSize: 14,
    color: theme.COLORS.textDark,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  sortLabel: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
    marginRight: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButtonText: {
    fontSize: 14,
    color: theme.COLORS.accent,
    fontWeight: '500',
    marginRight: 4,
  },
  sortButtonIcon: {
    fontSize: 10,
    color: theme.COLORS.accent,
  },
  filtersPanel: {
    backgroundColor: theme.COLORS.cardBackground,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  filterSection: {
    padding: 16,
    paddingBottom: 8,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.COLORS.textDark,
    marginBottom: 12,
  },
  filterOptionsRow: {
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.COLORS.background,
    marginRight: 8,
    borderWidth: 1,
    borderColor: theme.COLORS.border,
  },
  activeFilterChip: {
    backgroundColor: theme.COLORS.accent,
    borderColor: theme.COLORS.accent,
  },
  filterChipText: {
    fontSize: 14,
    color: theme.COLORS.textDark,
  },
  activeFilterChipText: {
    color: 'white',
    fontWeight: '500',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: theme.COLORS.border,
  },
  clearFiltersButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  clearFiltersText: {
    color: theme.COLORS.textMedium,
    fontSize: 14,
    fontWeight: '500',
  },
  applyFiltersButton: {
    backgroundColor: theme.COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  applyFiltersText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  resultsCountContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  resultsCount: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
  },
  resultsList: {
    padding: 16,
  },
  resultCard: {
    width: '100%',
    marginVertical: 8,
    marginHorizontal: 0,
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
  emptyResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginBottom: 8,
  },
  emptyResultsText: {
    fontSize: 16,
    color: theme.COLORS.textMedium,
    textAlign: 'center',
    marginBottom: 24,
  },
  resetSearchButton: {
    backgroundColor: theme.COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  resetSearchText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SearchResultsScreen;