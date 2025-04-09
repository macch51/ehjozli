
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const EventListEmpty = ({ message = 'No events found', onRefresh }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="calendar-remove" size={80} color="#ccc" />
      <Text style={styles.message}>{message}</Text>
      {onRefresh && (
        <Button mode="contained" onPress={onRefresh} style={styles.button}>
          Refresh
        </Button>
      )}
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
  message: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
});

export default EventListEmpty;