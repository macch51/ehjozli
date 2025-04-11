import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../constants/theme';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async () => {
    // Basic validation
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // In a real app, you would make an API call to request password reset
      // For this prototype, we'll simulate a successful request after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoading(false);
      setResetSent(true);
    } catch (error) {
      console.error('Reset password error:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to send reset instructions. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={theme.COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Forgot Password</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {resetSent ? (
            // Success State
            <View style={styles.successContainer}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="email-check" size={60} color={theme.COLORS.primary} />
              </View>
              <Text style={styles.successTitle}>Check your email</Text>
              <Text style={styles.successText}>
                We have sent password recovery instructions to your email address.
              </Text>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Login')}
                style={styles.backToLoginButton}
                labelStyle={styles.buttonLabel}
                color={theme.COLORS.primary}
              >
                Back to Login
              </Button>
              <TouchableOpacity 
                style={styles.resendLink}
                onPress={() => {
                  setResetSent(false);
                  handleResetPassword();
                }}
              >
                <Text style={styles.resendText}>Didn't receive the email? Resend</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Form State
            <View style={styles.formContainer}>
            <Image
              source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}
              style={styles.logo}
              resizeMode="contain"
            />
              <Text style={styles.instructionText}>
                Enter your email address and we'll send you instructions to reset your password.
              </Text>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email" />}
                outlineColor={theme.COLORS.border}
                activeOutlineColor={theme.COLORS.primary}
              />
              <Button
                mode="contained"
                onPress={handleResetPassword}
                loading={loading}
                disabled={loading}
                style={styles.resetButton}
                labelStyle={styles.buttonLabel}
                color={theme.COLORS.primary}
              >
                Reset Password
              </Button>
              <TouchableOpacity 
                style={styles.cancelLink}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.cancelText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
  },
  headerRight: {
    width: 40,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  formContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  instructionText: {
    fontSize: 16,
    color: theme.COLORS.textMedium,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  input: {
    marginBottom: 24,
    backgroundColor: 'white',
    width: '100%',
  },
  resetButton: {
    width: '100%',
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
  },
  cancelLink: {
    marginTop: 8,
  },
  cancelText: {
    color: theme.COLORS.textMedium,
    fontSize: 14,
  },
  successContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${theme.COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginBottom: 16,
  },
  successText: {
    fontSize: 16,
    color: theme.COLORS.textMedium,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  backToLoginButton: {
    width: '100%',
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 16,
  },
  resendLink: {
    marginTop: 24,
  },
  resendText: {
    color: theme.COLORS.primary,
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;