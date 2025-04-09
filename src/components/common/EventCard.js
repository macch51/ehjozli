import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { format } from 'date-fns';

const EventCard = ({ event, onPress }) => {
  const formattedDate = format(new Date(event.date), 'MMM d, yyyy • h:mm a');
  
  return (
    <TouchableOpacity onPress={() => onPress(event)}>
      <Card style={styles.card}>
        <Image source={{ uri: event.image }} style={styles.image} />
        <Card.Content>
          <Title numberOfLines={1} style={styles.title}>{event.title}</Title>
          <Paragraph style={styles.venue}>{event.venue}</Paragraph>
          <Text style={styles.date}>{formattedDate}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ${event.price.min.toFixed(2)} - ${event.price.max.toFixed(2)}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  title: {
    fontSize: 18,
    marginTop: 8,
  },
  venue: {
    fontSize: 14,
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
  priceContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EventCard;
