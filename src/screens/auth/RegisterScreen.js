import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert
} from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../../constants/theme';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleRegister = async () => {
    // Basic validation
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      Alert.alert('Error', 'You must agree to the terms and conditions');
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // In a real app, you would make an API call to register
      // For this prototype, we'll simulate a successful registration after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store auth token
      await AsyncStorage.setItem('authToken', 'dummy-auth-token');
      
      // Navigate to main app
      setLoading(false);
      
      // Alert for demonstration
      Alert.alert(
        'Success',
        'Registration successful!',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }],
            })
          }
        ]
      );
    } catch (error) {
      console.error('Registration error:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color={theme.COLORS.textDark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Account</Text>
            <View style={styles.headerRight} />
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
          <Image
          source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}
          style={styles.logo}
          resizeMode="contain"
          />
          </View>

          {/* Registration Form */}
          <View style={styles.formContainer}>
            <TextInput
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="account" />}
              outlineColor={theme.COLORS.border}
              activeOutlineColor={theme.COLORS.primary}
            />

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

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
              secureTextEntry={!passwordVisible}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={passwordVisible ? "eye-off" : "eye"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              outlineColor={theme.COLORS.border}
              activeOutlineColor={theme.COLORS.primary}
            />

            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              style={styles.input}
              secureTextEntry={!confirmPasswordVisible}
              left={<TextInput.Icon icon="lock-check" />}
              right={
                <TextInput.Icon
                  icon={confirmPasswordVisible ? "eye-off" : "eye"}
                  onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                />
              }
              outlineColor={theme.COLORS.border}
              activeOutlineColor={theme.COLORS.primary}
            />

            <View style={styles.termsContainer}>
              <Checkbox.Android
                status={agreeToTerms ? 'checked' : 'unchecked'}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
                color={theme.COLORS.primary}
              />
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.termsLink}>Terms and Conditions</Text> and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.registerButton}
              labelStyle={styles.registerButtonLabel}
              color={theme.COLORS.primary}
            >
              Create Account
            </Button>
          </View>

          {/* Social Registration */}
          <View style={styles.socialRegistrationContainer}>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or sign up with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtonsRow}>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons name="google" size={24} color="#DB4437" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons name="facebook" size={24} color="#4267B2" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons name="apple" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  formContainer: {
    marginBottom: 30,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  termsText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: theme.COLORS.textMedium,
  },
  termsLink: {
    color: theme.COLORS.primary,
    fontWeight: '500',
  },
  registerButton: {
    paddingVertical: 8,
    borderRadius: 12,
  },
  registerButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
  },
  socialRegistrationContainer: {
    marginBottom: 30,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.COLORS.border,
  },
  dividerText: {
    marginHorizontal: 10,
    color: theme.COLORS.textMedium,
    fontSize: 14,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    ...theme.SHADOWS.small,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: theme.COLORS.textMedium,
    fontSize: 14,
  },
  loginLink: {
    color: theme.COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default RegisterScreen;