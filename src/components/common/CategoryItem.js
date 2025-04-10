// src/components/common/CategoryItem.js
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import theme from '../../constants/theme';

const { width } = Dimensions.get('window');
const categoryWidth = width / 4 - 16;

const CategoryItem = ({ category, onPress }) => {
  // Get icon emoji based on category name
  const getIcon = () => {
    switch (category.id) {
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
    <TouchableOpacity 
      onPress={() => onPress(category)}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{getIcon()}</Text>
      </View>
      <Text style={styles.text} numberOfLines={1}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: categoryWidth,
    alignItems: 'center',
    marginHorizontal: theme.SPACING.s,
    marginVertical: theme.SPACING.m,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.SPACING.s,
    ...theme.SHADOWS.small
  },
  icon: {
    fontSize: 28,
  },
  text: {
    fontSize: 12,
    fontWeight: theme.FONTS.medium,
    textAlign: 'center',
    color: theme.COLORS.textDark,
  },
});

export default CategoryItem;