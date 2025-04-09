import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Title, Paragraph, Button, Divider, Chip, List, Card, Portal, Modal } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { format } from 'date-fns';

// Import mock data
import { events } from '../../data/mockData';

const EventDetailsScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const event = events.find(e => e.id === eventId);
  
  const [seatingModalVisible, setSeatingModalVisible] = useState(false);
  const [selectedTicketPrice, setSelectedTicketPrice] = useState(null);
  
  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }
  
  // Format date and time
  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, 'EEEE, MMMM d, yyyy');
  const formattedTime = format(eventDate, 'h:mm a');
  
  // Example ticket tiers
  const ticketTiers = [
    { id: 1, name: 'General Admission', price: event.price.min, available: true },
    { id: 2, name: 'Premium Seating', price: (event.price.min + event.price.max) / 2, available: true },
    { id: 3, name: 'VIP Package', price: event.price.max, available: false },
  ];
  
  const handleBuyTickets = (ticketPrice) => {
    setSelectedTicketPrice(ticketPrice);
    setSeatingModalVisible(true);
  };
  
  const handleProceedToCheckout = () => {
    setSeatingModalVisible(false);
    navigation.navigate('Checkout', { 
      eventId: event.id,
      ticketPrice: selectedTicketPrice 
    });
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Event Image */}
        <Image 
          source={{ uri: event.image }}
          style={styles.image}
        />
        
        {/* Event Basic Info */}
        <View style={styles.infoContainer}>
          <Title style={styles.title}>{event.title}</Title>
          
          <View style={styles.dateTimeContainer}>
            <MaterialCommunityIcons name="calendar" size={20} color="#666" />
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          
          <View style={styles.dateTimeContainer}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#666" />
            <Text style={styles.dateText}>{formattedTime}</Text>
          </View>
          
          <View style={styles.dateTimeContainer}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
            <Text style={styles.dateText}>{event.venue}</Text>
          </View>
          
          <View style={styles.priceChipContainer}>
            <Chip icon="tag" style={styles.priceChip}>
              ${event.price.min.toFixed(2)} - ${event.price.max.toFixed(2)}
            </Chip>
          </View>
        </View>
        
        <Divider />
        
        {/* Event Description */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>About This Event</Title>
          <Paragraph style={styles.description}>{event.description}</Paragraph>
        </View>
        
        <Divider />
        
        {/* Organizer Info */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Organizer</Title>
          <View style={styles.organizerContainer}>
            <Image 
              source={{ uri: event.organizer.logo }}
              style={styles.organizerLogo}
            />
            <View style={styles.organizerInfo}>
              <Text style={styles.organizerName}>{event.organizer.name}</Text>
              <Button 
                mode="outlined" 
                compact
                onPress={() => {}}
                style={styles.followButton}
              >
                Follow
              </Button>
            </View>
          </View>
        </View>
        
        <Divider />
        
        {/* Announcements */}
        {event.announcements.length > 0 && (
          <>
            <View style={styles.section}>
              <Title style={styles.sectionTitle}>Announcements</Title>
              {event.announcements.map((announcement) => (
                <Card key={announcement.id} style={styles.announcementCard}>
                  <Card.Content>
                    <Text style={styles.announcementDate}>
                      {format(new Date(announcement.date), 'MMM d, yyyy')}
                    </Text>
                    <Paragraph>{announcement.text}</Paragraph>
                  </Card.Content>
                </Card>
              ))}
            </View>
            <Divider />
          </>
        )}
        
        {/* Ticket Information */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Tickets</Title>
          
          {ticketTiers.map((tier) => (
            <View key={tier.id} style={styles.ticketTierContainer}>
              <View style={styles.ticketTierInfo}>
                <Text style={styles.ticketTierName}>{tier.name}</Text>
                <Text style={styles.ticketTierPrice}>${tier.price.toFixed(2)}</Text>
              </View>
              <Button 
                mode="contained" 
                disabled={!tier.available}
                onPress={() => handleBuyTickets(tier.price)}
              >
                {tier.available ? 'Buy' : 'Sold Out'}
              </Button>
            </View>
          ))}
        </View>
        
        {/* Seating Chart View button */}
        <View style={styles.section}>
          <Button 
            mode="outlined" 
            icon="seat" 
            onPress={() => {}}
            style={styles.seatingChartButton}
          >
            View Seating Chart
          </Button>
        </View>
        
        {/* Similar Events (would be populated in a real app) */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Similar Events</Title>
          <Paragraph>You might also be interested in these events.</Paragraph>
          {/* Would include a horizontal ScrollView with EventCards here */}
        </View>
      </ScrollView>
      
      {/* Fixed Buy Tickets button at bottom */}
      <View style={styles.buyTicketsContainer}>
        <Button 
          mode="contained" 
          onPress={() => handleBuyTickets(event.price.min)}
          style={styles.buyTicketsButton}
          labelStyle={styles.buyTicketsLabel}
        >
          Buy Tickets
        </Button>
      </View>
      
      {/* Seating Modal */}
      <Portal>
        <Modal
          visible={seatingModalVisible}
          onDismiss={() => setSeatingModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Title style={styles.modalTitle}>Select Your Seats</Title>
            
            <Image 
              source={{ uri: event.seatingChart }}
              style={styles.seatingChart}
              resizeMode="contain"
            />
            
            <Text style={styles.seatingInstructions}>
              Tap on available seats to select them. Selected seats will be highlighted.
            </Text>
            
            <View style={styles.modalButtonContainer}>
              <Button 
                mode="outlined" 
                onPress={() => setSeatingModalVisible(false)}
                style={styles.modalButton}
              >
                Cancel
              </Button>
              <Button 
                mode="contained" 
                onPress={handleProceedToCheckout}
                style={styles.modalButton}
              >
                Proceed to Checkout
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  scrollView: {
    flex: 1,
    marginBottom: 60, // Space for the fixed button
  },
  image: {
    width: '100%',
    height: 250,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  priceChipContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  priceChip: {
    backgroundColor: '#f0f0f0',
  },
  section: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizerLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  organizerInfo: {
    marginLeft: 16,
    flex: 1,
  },
  organizerName: {
    fontSize: 18,
    marginBottom: 8,
  },
  followButton: {
    alignSelf: 'flex-start',
  },
  announcementCard: {
    marginBottom: 8,
  },
  announcementDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  ticketTierContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ticketTierInfo: {
    flex: 1,
  },
  ticketTierName: {
    fontSize: 16,
    marginBottom: 4,
  },
  ticketTierPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seatingChartButton: {
    marginTop: 8,
  },
  buyTicketsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  buyTicketsButton: {
    borderRadius: 8,
  },
  buyTicketsLabel: {
    fontSize: 16,
    padding: 4,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalTitle: {
    marginBottom: 20,
  },
  seatingChart: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  seatingInstructions: {
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default EventDetailsScreen;