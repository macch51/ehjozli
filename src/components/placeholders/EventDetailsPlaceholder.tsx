// src/components/placeholders/EventDetailsPlaceholder.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventDetailsPlaceholder = ({ route }: any) => {
  const { eventId } = route.params || {};
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Event Details Placeholder</Text>
      <Text>Event ID: {eventId || 'Not provided'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default EventDetailsPlaceholder;