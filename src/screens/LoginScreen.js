// src/screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const LoginScreen = () => {
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  
  const handleLogin = () => {
    if (login(inputPassword)) {
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Examen CISA</Text>
      <Text style={styles.subtitle}>Acceso privado</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={inputPassword}
        onChangeText={setInputPassword}
      />
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Acceder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 15,
  },
});

export default LoginScreen;
