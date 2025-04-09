
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const CategoryItem = ({ category, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(category)}>
      <Surface style={styles.surface}>
        <MaterialCommunityIcons name={category.icon} size={32} color="#6200ee" />
        <Text style={styles.text}>{category.name}</Text>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 16,
    height: 100,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 12,
  },
  text: {
    marginTop: 8,
    textAlign: 'center',
  },
});

export default CategoryItem;