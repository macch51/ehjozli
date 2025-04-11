import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../constants/theme';

const CategoryItem = ({ category, onPress }) => {
  // Map category names to professional icons
  const getIconName = (categoryName) => {
    const iconMap = {
      'Music': 'music',
      'Sports': 'basketball',
      'Arts': 'palette',
      'Nightlife': 'glass-cocktail',
      'Business': 'briefcase',
      'Education': 'school',
      'Theater': 'theater',
      'Technology': 'laptop',
      'Food': 'food-fork-drink',

    };
    
    return iconMap[categoryName] || 'tag'; // Fallback icon
  };

  return (
    <TouchableOpacity 
      style={styles.categoryItem} 
      onPress={() => onPress(category)}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons 
          name={getIconName(category.name)} 
          size={24} 
          color={theme.COLORS.primary} 
        />
      </View>
      <Text style={styles.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 8,
    width: 80,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: theme.COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.COLORS.textDark,
    textAlign: 'center',
  },
});

export default CategoryItem;