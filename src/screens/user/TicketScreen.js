// src/screens/user/TicketScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text, Title, Chip, Surface, Divider, Button, Tabs, Tab } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { format } from 'date-fns';

// Import mock data
import { users, events, TICKET_STATUSES } from '../../data/mockData';

// For the prototype, we'll use the first user in our mock data
const currentUser = users[0];

const TicketScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Get user's tickets and corresponding events
  const userTickets = currentUser?.tickets || [];
  const ticketEvents = userTickets.map(ticket => {
    const event = events.find(e => e.id === ticket.eventId);
    return {
      ...ticket,
      event,
    };
  });
  
  // Filter tickets based on active tab (upcoming vs. past)
  const filteredTickets = ticketEvents.filter(ticket => {
    const eventDate = new Date(ticket.event.date);
    const now = new Date();
    return activeTab === 0 ? eventDate >= now : eventDate < now;
  });
  
  const handleTicketPress = (ticket) => {
    // In a real app, this would navigate to a ticket details screen
    // For the prototype, we'll just navigate to the event details
    navigation.navigate('EventDetails', { eventId: ticket.eventId });
  };
  
  const renderTicketItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleTicketPress(item)}>
      <Surface style={styles.ticketContainer}>
        {/* Event Image */}
        <Image 
          source={{ uri: item.event.image }}
          style={styles.eventImage}
        />
        
        {/* Ticket Info */}
        <View style={styles.ticketInfo}>
          <Title numberOfLines={1} style={styles.eventTitle}>
            {item.event.title}
          </Title>
          
          <View style={styles.dateTimeContainer}>
            <MaterialCommunityIcons name="calendar" size={16} color="#666" />
            <Text style={styles.dateTimeText}>
              {format(new Date(item.event.date), 'EEEE, MMMM d, yyyy')}
            </Text>
          </View>
          
          <View style={styles.dateTimeContainer}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
            <Text style={styles.dateTimeText}>
              {format(new Date(item.event.date), 'h:mm a')}
            </Text>
          </View>
          
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
            <Text style={styles.dateTimeText}>
              {item.event.venue}
            </Text>
          </View>
          
          <View style={styles.ticketDetailsContainer}>
            <Chip icon="ticket" style={styles.ticketSeat}>{item.seat}</Chip>
            <Text style={styles.ticketPrice}>${item.price.toFixed(2)}</Text>
          </View>
        </View>
        
        {/* Ticket Status Badge */}
        <View style={styles.statusBadge}>
          <MaterialCommunityIcons 
            name="ticket-confirmation" 
            size={24} 
            color="#fff" 
          />
        </View>
      </Surface>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      {/* Tabs for upcoming/past tickets */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 0 && styles.activeTab
          ]}
          onPress={() => setActiveTab(0)}
        >
          <Text style={[
            styles.tabText,
            activeTab === 0 && styles.activeTabText
          ]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 1 && styles.activeTab
          ]}
          onPress={() => setActiveTab(1)}
        >
          <Text style={[
            styles.tabText,
            activeTab === 1 && styles.activeTabText
          ]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>
      
      <Divider />
      
      {/* Tickets List */}
      <FlatList
        data={filteredTickets}
        renderItem={renderTicketItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="ticket-off" size={80} color="#ccc" />
            <Text style={styles.emptyText}>
              {activeTab === 0 
                ? "You don't have any upcoming tickets"
                : "You don't have any past tickets"
              }
            </Text>
            <Button 
              mode="contained" 
              onPress={() => navigation.navigate('Search')}
              style={styles.browseButton}
            >
              Browse Events
            </Button>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6200ee',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#6200ee',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  ticketContainer: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 120,
  },
  ticketInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateTimeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  ticketDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ticketSeat: {
    backgroundColor: '#f0f0f0',
  },
  ticketPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#6200ee',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 16,
    textAlign: 'center',
  },
  browseButton: {
    marginTop: 8,
  },
});

export default TicketScreen;