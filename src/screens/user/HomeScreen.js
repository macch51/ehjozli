// src/screens/user/HomeScreen.js
import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  FlatList, 
  TouchableOpacity, 
  Text, 
  Image, 
  StatusBar,
  Dimensions,
  SafeAreaView,
  Platform
} from 'react-native';
import theme from '../../constants/theme';
import EventCard from '../../components/common/EventCard';
import CategoryItem from '../../components/common/CategoryItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Import mock data
import { events, categories, categoriestab } from '../../data/mockData';
import FooterNavigation from '../../components/common/FooterNavigation';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;
const HomeScreen = ({ navigation }) => {
  const statusBarHeight = Platform.OS === 'ios' ? 
  StatusBar.currentHeight || 0 : 
  StatusBar.currentHeight;

  const [activeCategory, setActiveCategory] = useState(0);
  const [location, setLocation] = useState('New York, NY');
  
  // Featured events (first 3 events)
  const featuredEvents = events.slice(0, 3);
  
  // Upcoming events (all events sorted by date)
  const upcomingEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  


  // Nearby events (for demo purposes, just using some events)
  const nearbyEvents = events.slice(2, 5);
  
  // Trending events (for demo purposes, just using some events)
  const trendingEvents = events.slice(1, 4);
  
  // Today's date for the date selector
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });
  
  const handleEventPress = (event) => {
    // In a real app, this would navigate to the event details screen
     navigation.navigate('EventDetails', { eventId: event.id });
  };
  
  const handleCategoryPress = (category) => {
    console.log('Category pressed:', category.name);
    // In a real app, this would navigate to the categories screen or filter events
     navigation.navigate('Categories', { selectedCategory: category });
  };
  
  const handleLocationPress = () => {
    console.log('Location pressed');
  };
  
  const renderDateItem = ({ item, index }) => {
    const day = item.toLocaleDateString('en-US', { day: 'numeric' });
    const dayName = item.toLocaleDateString('en-US', { weekday: 'short' });
    const isToday = index === 0;
    
    return (
      <TouchableOpacity 
        style={[
          styles.dateItem, 
          isToday && styles.activeDateItem
        ]}
      >
        <Text style={[styles.dayName, isToday && styles.activeDateText]}>{dayName}</Text>
        <Text style={[styles.dayNumber, isToday && styles.activeDateText]}>{day}</Text>
      </TouchableOpacity>
    );
  };
  
  const renderEventAnnouncement = ({ item }) => {
    return (
      <View style={styles.announcementCard}>
        <View style={styles.announcementHeader}>
          <Image 
            source={{ uri: 'https://dummyimage.com/40x40/27a7b8/ffffff' }} 
            style={styles.organizerLogo} 
          />
          <View>
            <Text style={styles.organizerName}>Event Organizer</Text>
            <Text style={styles.announcementTime}>2 hours ago</Text>
          </View>
        </View>
        <Text style={styles.announcementText}>
          🎉 Additional tickets just released for the upcoming concert! Get them while they last!
        </Text>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor= {theme.COLORS.primary} />
      
      {/* Top Bar */}
      <View style={styles.topBar}>
      <View style={styles.appLogoContainer}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      </View>

        <View style={styles.locationButtonContainer}>
          <TouchableOpacity 
            style={styles.locationButton}
            onPress={handleLocationPress}
          >
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{location}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileButtonContainer}>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitial}>J</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search events, artists, venues...</Text>
        </TouchableOpacity>
        
        {/* Main Navigation Categories */}
        <View style={styles.mainCategories}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mainCategoriesContent}
          >
            <TouchableOpacity 
              style={[styles.mainCategoryTab, activeCategory === 0 && styles.activeTab]}
              onPress={() => setActiveCategory(0)}
            >
              <Text style={[styles.mainCategoryText, activeCategory === 0 && styles.activeTabText]}>
                All
              </Text>
            </TouchableOpacity>
            {categoriestab.map((category, index) => (
              <TouchableOpacity 
                key={category.id}
                style={[styles.mainCategoryTab, activeCategory === index + 1 && styles.activeTab]}
                onPress={() => setActiveCategory(index + 1)}
              >
                <Text style={[styles.mainCategoryText, activeCategory === index + 1 && styles.activeTabText]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}

          </ScrollView>
        </View>
        
        {/* Hero Carousel / Featured Events */}
        <View style={styles.featuredSection}>
          <FlatList
            data={featuredEvents}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.centeredList}
            renderItem={({ item }) => (
              <EventCard 
                event={item} 
                onPress={handleEventPress} 
                featured={true}
              />
            )}
          />
          
          {/* Carousel Indicators */}
          <View style={styles.carouselIndicators}>
            {featuredEvents.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.indicator, 
                  index === 0 && styles.activeIndicator
                ]} 
              />
            ))}
          </View>
        </View>
        
        {/* Organizer Announcements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Announcements</Text>
          </View>
          
          <FlatList
            data={[1, 2, 3]} // Mock announcements - now showing 3
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.toString()}
            renderItem={renderEventAnnouncement}
            contentContainerStyle={styles.centeredList}
          />
        </View>
        
        {/* Nearby Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Happening Today</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={nearbyEvents.slice(0, 3)} // Ensure we show exactly 3
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.centeredList}
            renderItem={({ item }) => (
              <EventCard 
                event={item} 
                onPress={handleEventPress} 
                style={{ width: width * 0.75 }}
              />
            )}
          />
        </View>
        
        {/* Browse by Category */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse by Category</Text>
          </View>
          
          <View style={styles.categoriesGrid}>
            {categories.map(category => (
              <CategoryItem 
                key={category.id.toString()}
                category={category} 
                onPress={handleCategoryPress} 
              />
            ))}
          </View>
        </View>
        
        {/* Date Selector */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
          </View>
          
          <FlatList
            data={dates}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderDateItem}
            contentContainerStyle={styles.centeredList}
          />
          
          {/* Upcoming Events List */}
          <View style={styles.eventsListContainer}>
            {upcomingEvents.slice(0, 3).map((event) => (
              <EventCard 
                key={event.id.toString()} 
                event={event} 
                onPress={handleEventPress} 
                style={{ width: '100%', marginHorizontal: 0 }}
              />
            ))}
          </View>
          
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View More Events</Text>
          </TouchableOpacity>
        </View>
        
        {/* Trending Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Near You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={trendingEvents.slice(0, 3)} // Ensure we show exactly 3
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.centeredList}
            renderItem={({ item }) => (
              <EventCard 
                event={item} 
                onPress={handleEventPress}
                style={{ width: width * 0.75 }}
              />
            )}
          />
        </View>
        
        {/* Buffer space at bottom */}
        <View style={{ height: 80 }} />
      </ScrollView>
      
          
    {/* Footer Navigation */}
    <FooterNavigation
        navigation={navigation} 
        activeTab="home" 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  topBar: {
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight || 0,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logoImage: {
    width: 80, // Adjust based on your logo size
    height: 40, // Adjust based on your logo size
  },
  appLogoContainer: {
    flex: 1, // Takes up 1/3 of the space
    alignItems: 'flex-start',
  },
  locationButtonContainer: {
    flex: 2, // Takes up 1/3 of the space
    alignItems: 'center', // Center alignment
  },
  profileButtonContainer: {
    flex: 1, // Takes up 1/3 of the space
    alignItems: 'flex-end',
  },
  appLogo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  dropdownIcon: {
    fontSize: 10,
    marginLeft: 4,
    color: '#666',
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  profileAvatar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 24,
    margin: 16,
    marginTop: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#666',
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  mainCategories: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    marginBottom: 12,
  },
  mainCategoriesContent: {
    paddingHorizontal: 12,
  },
  mainCategoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: theme.COLORS.pnormal,
  },
  mainCategoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
  featuredSection: {
    paddingVertical: 12,
  },
  centeredList: {
    paddingHorizontal: 10, 
    paddingVertical: 8,
  },
  carouselIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#6200ee',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  section: {
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6200ee',
  },
  announcementCard: {
    width: width - 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  organizerLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  organizerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  announcementTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  announcementText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  datesContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 72,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  activeDateItem: {
    backgroundColor: '#6200ee',
  },
  dayName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  activeDateText: {
    color: '#fff',
  },
  eventsListContainer: {
    paddingHorizontal: 16,
  },
  viewMoreButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6200ee',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  viewMoreText: {
    color: theme.COLORS.pnormal,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  footerTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
  activeFooterText: {
    color: '#6200ee',
    fontWeight: '600',
  },
});

export default HomeScreen;