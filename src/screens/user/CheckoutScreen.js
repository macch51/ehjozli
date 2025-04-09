import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Title, Paragraph, Card, Button, Divider, TextInput, RadioButton, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { format } from 'date-fns';

// Import mock data
import { events, users } from '../../data/mockData';

// For the prototype, we'll use the first user in our mock data
const currentUser = users[0];

const CheckoutScreen = ({ route, navigation }) => {
  const { eventId, ticketPrice } = route.params;
  const event = events.find(e => e.id === eventId);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    currentUser.paymentMethods[0]?.id
  );
  const [loading, setLoading] = useState(false);
  
  // Calculate total cost
  const ticketSubtotal = ticketPrice * quantity;
  const fees = ticketPrice * 0.15 * quantity; // 15% fees
  const total = ticketSubtotal + fees;
  
  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleIncrementQuantity = () => {
    // In a real app, we'd check against available inventory
    setQuantity(quantity + 1);
  };
  
  const handleCompletePurchase = () => {
    setLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      // Navigate to a confirmation screen or back to tickets in a real app
      // For the prototype, we'll just go to the tickets screen
      navigation.replace('Main', { screen: 'Tickets' });
    }, 1500);
  };
  
  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Event Summary */}
        <Card style={styles.eventSummary}>
          <Card.Content>
            <View style={styles.eventHeaderRow}>
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={styles.eventInfo}>
                <Title numberOfLines={2} style={styles.eventTitle}>{event.title}</Title>
                <Paragraph style={styles.eventDetails}>
                  {format(new Date(event.date), 'EEE, MMM d • h:mm a')}
                </Paragraph>
                <Paragraph style={styles.eventDetails}>{event.venue}</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>
        
        {/* Ticket Quantity */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Tickets</Title>
            <View style={styles.quantityContainer}>
              <View>
                <Text style={styles.ticketTypeText}>General Admission</Text>
                <Text style={styles.ticketPriceText}>${ticketPrice.toFixed(2)} each</Text>
              </View>
              
              <View style={styles.quantityControls}>
                <TouchableOpacity 
                  style={[
                    styles.quantityButton, 
                    quantity <= 1 && styles.quantityButtonDisabled
                  ]}
                  onPress={handleDecrementQuantity}
                  disabled={quantity <= 1}
                >
                  <MaterialCommunityIcons 
                    name="minus" 
                    size={20} 
                    color={quantity <= 1 ? '#ccc' : '#6200ee'} 
                  />
                </TouchableOpacity>
                
                <Text style={styles.quantityText}>{quantity}</Text>
                
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={handleIncrementQuantity}
                >
                  <MaterialCommunityIcons name="plus" size={20} color="#6200ee" />
                </TouchableOpacity>
              </View>
            </View>
          </Card.Content>
        </Card>
        
        {/* Payment Method */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Payment Method</Title>
            <RadioButton.Group
              onValueChange={value => setSelectedPaymentMethod(value)}
              value={selectedPaymentMethod}
            >
              {currentUser.paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={styles.paymentMethod}
                  onPress={() => setSelectedPaymentMethod(method.id)}
                >
                  <View style={styles.paymentMethodInfo}>
                    <MaterialCommunityIcons 
                      name={method.type === 'credit' ? 'credit-card' : 'paypal'} 
                      size={24} 
                      color="#6200ee" 
                    />
                    <Text style={styles.paymentMethodText}>
                      {method.type === 'credit' 
                        ? `•••• ${method.last4} (expires ${method.expiry})` 
                        : 'PayPal'
                      }
                    </Text>
                  </View>
                  <RadioButton value={method.id} />
                </TouchableOpacity>
              ))}
            </RadioButton.Group>
            
            <Button 
              mode="outlined" 
              icon="plus" 
              style={styles.addPaymentButton}
              onPress={() => {}}
            >
              Add Payment Method
            </Button>
          </Card.Content>
        </Card>
        
        {/* Billing Summary */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Order Summary</Title>
            
            <View style={styles.summaryRow}>
              <Text>Tickets ({quantity})</Text>
              <Text>${ticketSubtotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text>Service Fees</Text>
              <Text>${fees.toFixed(2)}</Text>
            </View>
            
            <Divider style={styles.summaryDivider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
            </View>
          </Card.Content>
        </Card>
        
        {/* Terms & Conditions */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By completing this purchase, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Purchase Policy</Text>.
          </Text>
        </View>
      </ScrollView>
      
      {/* Purchase Button */}
      <View style={styles.purchaseButtonContainer}>
        <Button 
          mode="contained" 
          loading={loading}
          disabled={loading}
          onPress={handleCompletePurchase}
          style={styles.purchaseButton}
          labelStyle={styles.purchaseButtonLabel}
        >
          Complete Purchase
        </Button>
      </View>
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
    paddingBottom: 80, // Space for the purchase button
  },
  eventSummary: {
    margin: 16,
    marginBottom: 8,
  },
  eventHeaderRow: {
    flexDirection: 'row',
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  eventInfo: {
    marginLeft: 12,
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
  },
  eventDetails: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  sectionCard: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketTypeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  ticketPriceText: {
    color: '#666',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    borderColor: '#ccc',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    marginLeft: 12,
    fontSize: 16,
  },
  addPaymentButton: {
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryDivider: {
    marginVertical: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsContainer: {
    margin: 16,
    marginTop: 8,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  termsLink: {
    color: '#6200ee',
  },
  purchaseButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  purchaseButton: {
    borderRadius: 8,
  },
  purchaseButtonLabel: {
    fontSize: 16,
    padding: 4,
  },
});

export default CheckoutScreen;