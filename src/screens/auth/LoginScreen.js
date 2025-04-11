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
import { TextInput, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../../constants/theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    // Basic validation
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // In a real app, you would make an API call to authenticate
      // For this prototype, we'll simulate a successful login after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store auth token
      await AsyncStorage.setItem('authToken', 'dummy-auth-token');
      
      // Navigate to main app
      // In a real app, the navigation would be handled by the auth state change
      setLoading(false);
      
      // Alert for demonstration
      Alert.alert(
        'Success',
        'Login successful!',
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
      console.error('Login error:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to log in. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleCreateAccount = () => {
    navigation.navigate('Register');
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
          {/* Logo and Header */}
          <View style={styles.headerContainer}>
          <Image
            source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}
            style={styles.logo}
            resizeMode="contain"
          />
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.subtitle}>Log in to your account</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
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

            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
              labelStyle={styles.loginButtonLabel}
              color={theme.COLORS.primary}
            >
              Log In
            </Button>
          </View>

          {/* Social Login */}
          <View style={styles.socialLoginContainer}>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or continue with</Text>
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

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.signUpLink}>Sign up</Text>
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
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.COLORS.textDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.COLORS.textMedium,
  },
  formContainer: {
    marginBottom: 30,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: theme.COLORS.primary,
    fontSize: 14,
  },
  loginButton: {
    paddingVertical: 8,
    borderRadius: 12,
  },
  loginButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
  },
  socialLoginContainer: {
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: theme.COLORS.textMedium,
    fontSize: 14,
  },
  signUpLink: {
    color: theme.COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default LoginScreen;