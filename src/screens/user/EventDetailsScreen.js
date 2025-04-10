// src/screens/user/EventDetailsScreen.js
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Share,
  Animated
} from 'react-native';
import theme from '../../constants/theme';

const { width } = Dimensions.get('window');
const imageHeight = 250;

const EventDetailsScreen = ({ route, navigation }) => {
  // In a real app, you would get the event ID from the route params
  // const { eventId } = route.params;
  
  // For the prototype, we'll use a mock event object
  const event = {
    id: 1,
    title: 'Taylor Swift: The Eras Tour',
    categoryId: 1,
    venue: 'Madison Square Garden',
    location: 'New York, NY',
    date: '2025-05-15T19:30:00',
    image: 'https://via.placeholder.com/800x500',
    price: { min: 89.99, max: 399.99 },
    description: "Join Taylor Swift on her record-breaking Eras Tour as she performs her biggest hits spanning her entire career. The Eras Tour is a journey through all of Taylor Swift's musical eras, from her debut album to her latest releases. Don't miss this once-in-a-lifetime concert experience!",
    organizer: {
      id: 101,
      name: 'Live Nation Entertainment',
      logo: 'https://via.placeholder.com/100x100',
    },
    announcements: [
      { id: 1001, date: '2025-03-01', text: 'Additional tickets released for the show!' },
      { id: 1002, date: '2025-03-15', text: 'Show will start at 7:30 PM sharp. Doors open at 6:00 PM.' },
    ],
    images: [
      'https://via.placeholder.com/800x500',
      'https://via.placeholder.com/800x500',
      'https://via.placeholder.com/800x500',
    ],
    ticketTiers: [
      { id: 1, name: 'General Admission', price: 89.99, available: true },
      { id: 2, name: 'Premium Seating', price: 199.99, available: true },
      { id: 3, name: 'VIP Package', price: 399.99, available: false },
    ],
    reviews: {
      average: 4.8,
      count: 246,
      items: [
        { id: 1, user: 'John D.', rating: 5, comment: 'Amazing show! Worth every penny.' },
        { id: 2, user: 'Sarah M.', rating: 4, comment: 'Great performance, but venue was crowded.' },
      ]
    },
    mapLocation: {
      latitude: 40.7505,
      longitude: -73.9934,
    }
  };

  // State for UI interactions
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const scrollY = new Animated.Value(0);
  
  // Header opacity animation based on scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, imageHeight - 60],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });
  
  // Format date and time
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Share event with others
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this event: ${event.title} at ${event.venue} on ${formattedDate} at ${formattedTime}`,
        url: 'https://ehjozli.com/events/' + event.id, // This would be your deep link in a real app
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  // Handle buying tickets
  const handleBuyTickets = () => {
    // Navigate to ticket selection screen
    // navigation.navigate('TicketSelection', { eventId: event.id });
    alert('Navigating to ticket selection...');
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Animated header for scrolling */}
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <SafeAreaView style={styles.headerSafe}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.headerButton}
            >
              <Text style={styles.headerIcon}>←</Text>
            </TouchableOpacity>
            <Text 
              style={styles.headerTitle} 
              numberOfLines={1}
            >
              {event.title}
            </Text>
            <TouchableOpacity 
              onPress={handleShare}
              style={styles.headerButton}
            >
              <Text style={styles.headerIcon}>↗</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
      
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Event Images Carousel */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: event.images[selectedImage] }} 
            style={styles.headerImage}
          />
          
          {/* Back button on image */}
          <SafeAreaView style={styles.imageHeaderContainer}>
            <View style={styles.imageHeaderContent}>
              <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={styles.imageButton}
              >
                <Text style={styles.imageButtonIcon}>←</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleShare}
                style={styles.imageButton}
              >
                <Text style={styles.imageButtonIcon}>↗</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          
          {/* Image selection dots */}
          <View style={styles.imageDots}>
            {event.images.map((_, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => setSelectedImage(index)}
              >
                <View 
                  style={[
                    styles.imageDot, 
                    selectedImage === index && styles.activeImageDot
                  ]} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Event Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingStars}>★★★★★</Text>
              <Text style={styles.ratingText}>
                {event.reviews.average} ({event.reviews.count})
              </Text>
            </View>
          </View>
          
          {/* Date, Time, Location info */}
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Text style={styles.detailIcon}>📅</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailText}>{formattedDate} • {formattedTime}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Text style={styles.detailIcon}>📍</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Venue</Text>
                <Text style={styles.detailText}>{event.venue}</Text>
                <Text style={styles.detailSubtext}>{event.location}</Text>
              </View>
              <TouchableOpacity style={styles.directionButton}>
                <Text style={styles.directionButtonText}>Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About This Event</Text>
            <Text 
              style={styles.description}
              numberOfLines={expandedDescription ? undefined : 3}
            >
              {event.description}
            </Text>
            <TouchableOpacity 
              onPress={() => setExpandedDescription(!expandedDescription)}
              style={styles.readMoreButton}
            >
              <Text style={styles.readMoreText}>
                {expandedDescription ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Ticket Tiers Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tickets</Text>
            {event.ticketTiers.map(tier => (
              <View key={tier.id} style={styles.ticketTier}>
                <View style={styles.ticketInfo}>
                  <Text style={styles.ticketName}>{tier.name}</Text>
                  <Text style={styles.ticketPrice}>${tier.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity 
                  style={[
                    styles.ticketButton,
                    !tier.available && styles.disabledButton
                  ]}
                  disabled={!tier.available}
                  onPress={handleBuyTickets}
                >
                  <Text style={styles.ticketButtonText}>
                    {tier.available ? 'Buy' : 'Sold Out'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          
          {/* Organizer Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Organizer</Text>
            <View style={styles.organizerContainer}>
              <Image 
                source={{ uri: event.organizer.logo }} 
                style={styles.organizerLogo}
              />
              <View style={styles.organizerInfo}>
                <Text style={styles.organizerName}>{event.organizer.name}</Text>
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          {/* Announcements Section */}
          {event.announcements.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Announcements</Text>
              {event.announcements.map(announcement => (
                <View key={announcement.id} style={styles.announcement}>
                  <Text style={styles.announcementDate}>
                    {new Date(announcement.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric' 
                    })}
                  </Text>
                  <Text style={styles.announcementText}>{announcement.text}</Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Reviews Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {event.reviews.items.map(review => (
              <View key={review.id} style={styles.review}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}>{review.user}</Text>
                  <Text style={styles.reviewRating}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </Text>
                </View>
                <Text style={styles.reviewText}>{review.comment}</Text>
              </View>
            ))}
          </View>
          
          {/* Location Map Placeholder */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapPlaceholderText}>Map View</Text>
            </View>
          </View>
          
          {/* Similar Events - For a real app, add this section */}
          
          {/* Bottom spacing for the fixed button */}
          <View style={{ height: 100 }} />
        </View>
      </Animated.ScrollView>
      
      {/* Fixed Buy Ticket Button */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity 
          style={styles.buyButton}
          onPress={handleBuyTickets}
        >
          <Text style={styles.buyButtonText}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.COLORS.cardBackground,
    zIndex: 999,
    ...theme.SHADOWS.medium,
  },
  headerSafe: {
    width: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    marginTop: StatusBar.currentHeight || 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
    color: theme.COLORS.textDark,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.cardBackground,
    ...theme.SHADOWS.small,
  },
  headerIcon: {
    fontSize: 20,
    color: theme.COLORS.textDark,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: imageHeight,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  imageHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: (StatusBar.currentHeight || 0) + 16,
  },
  imageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  imageButtonIcon: {
    fontSize: 20,
    color: theme.COLORS.textDark,
  },
  imageDots: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 4,
  },
  activeImageDot: {
    backgroundColor: theme.COLORS.cardBackground,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  titleSection: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    color: theme.COLORS.warning,
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
  },
  detailsCard: {
    backgroundColor: theme.COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    ...theme.SHADOWS.small,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${theme.COLORS.accent}15`, // 15% opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailIcon: {
    fontSize: 20,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.COLORS.textDark,
  },
  detailSubtext: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
    marginTop: 2,
  },
  directionButton: {
    backgroundColor: theme.COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  directionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: theme.COLORS.border,
    marginVertical: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: theme.COLORS.textMedium,
    lineHeight: 24,
  },
  readMoreButton: {
    marginTop: 8,
  },
  readMoreText: {
    color: theme.COLORS.accent,
    fontWeight: '500',
  },
  ticketTier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.COLORS.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...theme.SHADOWS.small,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketName: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.COLORS.textDark,
    marginBottom: 4,
  },
  ticketPrice: {
    fontSize: 16,
    color: theme.COLORS.primary,
    fontWeight: 'bold',
  },
  ticketButton: {
    backgroundColor: theme.COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: theme.COLORS.border,
  },
  ticketButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.COLORS.cardBackground,
    padding: 16,
    borderRadius: 12,
  },
  organizerLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.COLORS.textDark,
    marginBottom: 8,
  },
  followButton: {
    backgroundColor: 'transparent',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.COLORS.accent,
    alignSelf: 'flex-start',
  },
  followButtonText: {
    color: theme.COLORS.accent,
    fontWeight: '500',
    fontSize: 14,
  },
  announcement: {
    backgroundColor: theme.COLORS.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: theme.COLORS.primary,
  },
  announcementDate: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
    marginBottom: 8,
  },
  announcementText: {
    fontSize: 15,
    color: theme.COLORS.textDark,
  },
  review: {
    backgroundColor: theme.COLORS.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.COLORS.textDark,
  },
  reviewRating: {
    color: theme.COLORS.warning,
  },
  reviewText: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
    lineHeight: 20,
  },
  seeAllText: {
    color: theme.COLORS.accent,
    fontSize: 14,
    fontWeight: '500',
  },
  mapPlaceholder: {
    backgroundColor: '#E8E8E8',
    height: 180,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    color: theme.COLORS.textMedium,
    fontSize: 16,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.COLORS.cardBackground,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.COLORS.border,
    ...theme.SHADOWS.medium,
  },
  buyButton: {
    backgroundColor: theme.COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDetailsScreen;