import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Subscription = () => {
  const route = useRoute();
  const { parkingName } = route.params as { parkingName: string };
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    try {
      const response = await fetch('https://api-gateway-tq6a.onrender.com/notification/consume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exchange: parkingName,
          email: email,
        }),
      });

      if (response.ok) {
        Alert.alert('Suscripción exitosa', `Te has suscrito a las notificaciones del ${parkingName}`);
      } else {
        Alert.alert('Error', 'No se pudo realizar la suscripción.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo realizar la suscripción.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suscripción a Notificaciones</Text>
      <Text style={styles.subtitle}>Te vas a suscribir a las notificaciones del {parkingName}</Text>
      <TextInput
        style={styles.input}
        placeholder="example@udla.edu.ec"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Suscribirse" onPress={handleSubscribe} color="#98002E" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#98002E',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    
  },
});

export default Subscription;
