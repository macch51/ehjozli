// src/components/common/EventCard.js
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import theme from '../../constants/theme';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.75;

const EventCard = ({ event, onPress, style, featured = false }) => {
  // Format date for display
  const eventDate = new Date(event.date);
  const day = eventDate.toLocaleDateString('en-US', { day: 'numeric' });
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
  const time = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  // Get category name
  const getCategoryName = (categoryId) => {
    switch (categoryId) {
      case 1: return 'Music';
      case 2: return 'Theater';
      case 3: return 'Sports';
      case 4: return 'Family';
      case 5: return 'Comedy';
      case 6: return 'Conference';
      default: return 'Event';
    }
  };
  
  return (
    <TouchableOpacity 
      onPress={() => onPress(event)} 
      style={[
        styles.container, 
        featured ? styles.featuredContainer : {},
        style
      ]}
      activeOpacity={0.9}
    >
      <Image source={{ uri: event.image }} style={styles.image} />
      
      {/* Date badge */}
      <View style={styles.dateBadge}>
        <Text style={styles.dateMonth}>{month}</Text>
        <Text style={styles.dateDay}>{day}</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.iconTextContainer}>
            <Text style={styles.iconPlaceholder}>🕒</Text>
            <Text style={styles.detailText}>{time}</Text>
          </View>
          
          <View style={styles.iconTextContainer}>
            <Text style={styles.iconPlaceholder}>📍</Text>
            <Text style={styles.detailText} numberOfLines={1}>{event.venue}</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>
              {getCategoryName(event.categoryId)}
            </Text>
          </View>
          
          <Text style={styles.price}>
            ${event.price.min.toFixed(0)} - ${event.price.max.toFixed(0)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: theme.BORDER_RADIUS.m,
    backgroundColor: theme.COLORS.cardBackground,
    marginHorizontal: 20,
    marginVertical: 10,
    overflow: 'hidden',
    ...theme.SHADOWS.medium
  },
  featuredContainer: {
    width: width * 0.9,
    marginVertical: 12,
    ...theme.SHADOWS.large
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  dateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: theme.COLORS.cardBackground,
    padding: 8,
    borderRadius: theme.BORDER_RADIUS.s,
    alignItems: 'center',
    ...theme.SHADOWS.small,
    width: 45,
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: theme.FONTS.medium,
    color: theme.COLORS.accent,
    textTransform: 'uppercase',
  },
  dateDay: {
    fontSize: 18,
    fontWeight: theme.FONTS.bold,
    color: theme.COLORS.textDark,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: theme.FONTS.bold,
    marginBottom: 12,
    color: theme.COLORS.textDark,
  },
  detailsRow: {
    marginBottom: 12,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconPlaceholder: {
    fontSize: 14,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  categoryChip: {
    backgroundColor: theme.COLORS.accent + '20', // 20% opacity
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: theme.COLORS.accent,
    fontSize: 12,
    fontWeight: theme.FONTS.semiBold,
  },
  price: {
    fontSize: 16,
    fontWeight: theme.FONTS.bold,
    color: theme.COLORS.primary,
  },
});

export default EventCard;