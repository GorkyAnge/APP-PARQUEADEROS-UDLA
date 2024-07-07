import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Subscription = () => {
  const route = useRoute();
  const { parkingName } = route.params as { parkingName: string };
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    try {
      // Aquí puedes realizar la lógica para suscribirse a las notificaciones
      Alert.alert('Suscripción exitosa', `Te has suscrito a las notificaciones del ${parkingName}`);
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
        placeholder="Ingresa tu correo"
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
