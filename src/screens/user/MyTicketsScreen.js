// src/screens/user/MyTicketsScreen.js
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions
} from 'react-native';
import theme from '../../constants/theme';

// For QR code display - would use a real QR code library in production
const QRCodePlaceholder = () => (
  <View style={styles.qrCodePlaceholder}>
    <Image 
      source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EventTicketId12345' }}
      style={styles.qrCode}
    />
  </View>
);

// Mock ticket data - in a real app, this would come from your API
const mockTickets = [
  {
    id: '12345',
    eventId: 1,
    eventName: 'Taylor Swift: The Eras Tour',
    venue: 'Madison Square Garden',
    date: '2025-05-15T19:30:00',
    seat: 'Section A, Row 10, Seat 15',
    ticketType: 'VIP Package',
    price: 399.99,
    image: 'https://via.placeholder.com/300x200',
    status: 'valid', // 'valid', 'used', 'expired', 'cancelled'
    barcode: '9876543210',
  },
  {
    id: '12346',
    eventId: 2,
    eventName: 'Hamilton',
    venue: 'Richard Rodgers Theatre',
    date: '2025-05-20T19:00:00',
    seat: 'Orchestra, Row C, Seat 101',
    ticketType: 'Premium',
    price: 299.99,
    image: 'https://via.placeholder.com/300x200',
    status: 'valid',
    barcode: '1234567890',
  },
  {
    id: '12347',
    eventId: 3,
    eventName: 'Lakers vs. Knicks',
    venue: 'Madison Square Garden',
    date: '2024-12-18T20:00:00', // Past date for demo
    seat: 'Section 112, Row 15, Seat 6',
    ticketType: 'Standard',
    price: 150.00,
    image: 'https://via.placeholder.com/300x200',
    status: 'used',
    barcode: '5678901234',
  }
];

const MyTicketsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // Filter tickets based on active tab
  const filteredTickets = mockTickets.filter(ticket => {
    const ticketDate = new Date(ticket.date);
    const now = new Date();
    
    if (activeTab === 'upcoming') {
      return ticketDate >= now;
    } else {
      return ticketDate < now;
    }
  });
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'valid':
        return theme.COLORS.success;
      case 'used':
        return theme.COLORS.textMedium;
      case 'expired':
        return theme.COLORS.error;
      case 'cancelled':
        return theme.COLORS.error;
      default:
        return theme.COLORS.textMedium;
    }
  };
  
  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'valid':
        return 'Valid';
      case 'used':
        return 'Used';
      case 'expired':
        return 'Expired';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };
  
  // Handle ticket press to view details
  const handleTicketPress = (ticket) => {
    setSelectedTicket(ticket);
  };
  
  // Handle close ticket details
  const handleCloseTicketDetails = () => {
    setSelectedTicket(null);
  };
  
  // Ticket sharing
  const handleShareTicket = () => {
    alert('Ticket sharing functionality would be implemented here');
  };
  
  // Add to wallet
  const handleAddToWallet = () => {
    alert('Add to digital wallet functionality would be implemented here');
  };
  
  // Render ticket item
  const renderTicketItem = ({ item }) => {
    const isExpired = new Date(item.date) < new Date();
    
    return (
      <TouchableOpacity 
        style={styles.ticketCard} 
        onPress={() => handleTicketPress(item)}
        activeOpacity={0.8}
      >
        {/* Event Image */}
        <Image source={{ uri: item.image }} style={styles.ticketImage} />
        
        {/* Status Badge */}
        <View 
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) }
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
        
        {/* Ticket Content */}
        <View style={styles.ticketContent}>
          <Text style={styles.eventName} numberOfLines={1}>{item.eventName}</Text>
          
          <View style={styles.ticketDetail}>
            <Text style={styles.detailIcon}>📅</Text>
            <Text style={styles.detailText}>
              {formatDate(item.date)} • {formatTime(item.date)}
            </Text>
          </View>
          
          <View style={styles.ticketDetail}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailText}>{item.venue}</Text>
          </View>
          
          <View style={styles.ticketDetail}>
            <Text style={styles.detailIcon}>💺</Text>
            <Text style={styles.detailText}>{item.seat}</Text>
          </View>
          
          {/* Ticket Type and Price */}
          <View style={styles.ticketFooter}>
            <Text style={styles.ticketType}>{item.ticketType}</Text>
            <Text style={styles.ticketPrice}>${item.price.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  // Ticket Detail Modal
  const renderTicketDetail = () => {
    if (!selectedTicket) return null;
    
    return (
      <View style={styles.ticketDetailContainer}>
        <SafeAreaView style={styles.ticketDetailContent}>
          {/* Header */}
          <View style={styles.ticketDetailHeader}>
            <TouchableOpacity 
              onPress={handleCloseTicketDetails}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.ticketDetailTitle}>Ticket Details</Text>
            <TouchableOpacity 
              onPress={handleShareTicket}
              style={styles.shareButton}
            >
              <Text style={styles.shareButtonText}>↗</Text>
            </TouchableOpacity>
          </View>
          
          {/* Ticket QR Code */}
          <View style={styles.ticketDetailCard}>
            <View style={styles.ticketBarcodeSection}>
              <QRCodePlaceholder />
              <Text style={styles.barcodeText}>{selectedTicket.barcode}</Text>
              <View 
                style={[
                  styles.detailStatusBadge,
                  { backgroundColor: getStatusColor(selectedTicket.status) }
                ]}
              >
                <Text style={styles.detailStatusText}>
                  {getStatusText(selectedTicket.status)}
                </Text>
              </View>
            </View>
            
            <View style={styles.ticketDetailDivider} />
            
            {/* Event Details */}
            <View style={styles.eventDetailSection}>
              <Text style={styles.detailEventName}>{selectedTicket.eventName}</Text>
              
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Text style={styles.detailLabel}>Date & Time</Text>
                </View>
                <Text style={styles.detailValue}>
                  {formatDate(selectedTicket.date)} • {formatTime(selectedTicket.date)}
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Text style={styles.detailLabel}>Venue</Text>
                </View>
                <Text style={styles.detailValue}>{selectedTicket.venue}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Text style={styles.detailLabel}>Seat</Text>
                </View>
                <Text style={styles.detailValue}>{selectedTicket.seat}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Text style={styles.detailLabel}>Ticket Type</Text>
                </View>
                <Text style={styles.detailValue}>{selectedTicket.ticketType}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Text style={styles.detailLabel}>Ticket ID</Text>
                </View>
                <Text style={styles.detailValue}>{selectedTicket.id}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Text style={styles.detailLabel}>Purchase Price</Text>
                </View>
                <Text style={styles.detailValue}>${selectedTicket.price.toFixed(2)}</Text>
              </View>
            </View>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.ticketActions}>
            <TouchableOpacity 
              style={styles.transferButton}
              onPress={() => alert('Transfer ticket functionality would be implemented here')}
            >
              <Text style={styles.transferButtonIcon}>↪</Text>
              <Text style={styles.transferButtonText}>Transfer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.walletButton}
              onPress={handleAddToWallet}
            >
              <Text style={styles.walletButtonIcon}>📲</Text>
              <Text style={styles.walletButtonText}>Add to Wallet</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.viewEventButton}
            onPress={() => {
              handleCloseTicketDetails();
              navigation.navigate('EventDetails', { eventId: selectedTicket.eventId });
            }}
          >
            <Text style={styles.viewEventButtonText}>View Event Details</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.COLORS.cardBackground} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'upcoming' && styles.activeTabText
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'past' && styles.activeTabText
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Tickets List */}
      <FlatList
        data={filteredTickets}
        renderItem={renderTicketItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.ticketsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🎟️</Text>
            <Text style={styles.emptyTitle}>
              No {activeTab === 'upcoming' ? 'upcoming' : 'past'} tickets
            </Text>
            <Text style={styles.emptyText}>
              {activeTab === 'upcoming' 
                ? "When you purchase tickets, they'll appear here"
                : "Your past event tickets will be shown here"
              }
            </Text>
            {activeTab === 'upcoming' && (
              <TouchableOpacity 
                style={styles.browseButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.browseButtonText}>Browse Events</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
      
      {/* Ticket Detail Modal */}
      {selectedTicket && renderTicketDetail()}
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  header: {
    padding: 16,
    backgroundColor: theme.COLORS.cardBackground,
    ...theme.SHADOWS.small,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    color: theme.COLORS.textMedium,
  },
  activeTabText: {
    color: theme.COLORS.primary,
    fontWeight: '600',
  },
  ticketsList: {
    padding: 16,
    paddingBottom: 32,
  },
  ticketCard: {
    backgroundColor: theme.COLORS.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    ...theme.SHADOWS.medium,
  },
  ticketImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: theme.COLORS.success,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  ticketContent: {
    padding: 16,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginBottom: 12,
  },
  ticketDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
    flex: 1,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.COLORS.border,
  },
  ticketType: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.COLORS.accent,
  },
  ticketPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.COLORS.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: '30%',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: theme.COLORS.textMedium,
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: theme.COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  
  // Ticket Detail Modal Styles
  ticketDetailContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.COLORS.background,
    zIndex: 1000,
  },
  ticketDetailContent: {
    flex: 1,
  },
  ticketDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.COLORS.cardBackground,
    ...theme.SHADOWS.small,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: theme.COLORS.textDark,
  },
  ticketDetailTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.COLORS.textDark,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 20,
    color: theme.COLORS.textDark,
  },
  ticketDetailCard: {
    backgroundColor: theme.COLORS.cardBackground,
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
    ...theme.SHADOWS.medium,
  },
  ticketBarcodeSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: theme.COLORS.background,
  },
  qrCodePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  qrCode: {
    width: '100%',
    height: '100%',
  },
  barcodeText: {
    fontSize: 16,
    color: theme.COLORS.textDark,
    marginBottom: 16,
    letterSpacing: 2,
  },
  detailStatusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: theme.COLORS.success,
  },
  detailStatusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  ticketDetailDivider: {
    height: 1,
    backgroundColor: theme.COLORS.border,
  },
  eventDetailSection: {
    padding: 24,
  },
  detailEventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabelContainer: {
    width: 100,
  },
  detailLabel: {
    fontSize: 14,
    color: theme.COLORS.textMedium,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: theme.COLORS.textDark,
    fontWeight: '500',
  },
  ticketActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  transferButton: {
    flex: 1,
    backgroundColor: theme.COLORS.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 8,
    ...theme.SHADOWS.small,
  },
  transferButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  transferButtonText: {
    color: theme.COLORS.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  walletButton: {
    flex: 1,
    backgroundColor: theme.COLORS.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginLeft: 8,
    ...theme.SHADOWS.small,
  },
  walletButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  walletButtonText: {
    color: theme.COLORS.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  viewEventButton: {
    backgroundColor: theme.COLORS.primary,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewEventButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MyTicketsScreen;