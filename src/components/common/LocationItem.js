import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const LocationItem = ({ location, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(location)}>
      <Surface style={styles.surface}>
        <MaterialCommunityIcons name="map-marker" size={24} color="#6200ee" />
        <Text style={styles.text}>{location.name}, {location.state}</Text>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default LocationItem;
