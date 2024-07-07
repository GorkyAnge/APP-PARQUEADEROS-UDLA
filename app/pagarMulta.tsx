import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Define the type 'MultaType'
type MultaType = {
  id: number;
  descripcion: string;
  valor: number;
};

export default function PagarMulta() {
  const route = useRoute();
  const navigation = useNavigation();
  const { multa } = route.params as { multa: MultaType };

  const [customerEmail, setCustomerEmail] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = async () => {
    if (!customerEmail || !cardType || !cardHolderName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const paymentDetails = {
      app_name: 'Parqueaderos UDLA',
      service: 'Pago de multas',
      customer_email: customerEmail,
      card_type: cardType,
      card_holder_name: cardHolderName,
      card_number: cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      amount: multa.valor.toString(),
      currency: 'USD',
    };

    try {
      const response = await axios.post('https://shak-multas.onrender.com/multas/pagar', {
        multaId: multa.id,
        paymentDetails,
      });

      if (response.status === 200) {
        Alert.alert('Pago Exitoso', 'La multa ha sido pagada exitosamente.');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.data.message || 'Ocurrió un error durante el pago.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagar Multa</Text>
      <Text>Descripción: {multa.descripcion}</Text>
      <Text>Valor: {multa.valor}</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={customerEmail}
        onChangeText={setCustomerEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de tarjeta"
        value={cardType}
        onChangeText={setCardType}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del titular"
        value={cardHolderName}
        onChangeText={setCardHolderName}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de tarjeta"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <View style={styles.expiryContainer}>
        <TextInput
          style={[styles.input, { width: '45%' }]}
          placeholder="Mes de expiración"
          value={expiryMonth}
          onChangeText={setExpiryMonth}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { width: '45%' }]}
          placeholder="Año de expiración"
          value={expiryYear}
          onChangeText={setExpiryYear}
          keyboardType="numeric"
        />
      </View>
      <TextInput
        style={[styles.input, { width: '45%' }]}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        keyboardType="numeric"
      />
      <Button title="Pagar" onPress={handlePayment} color="#98002E" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#98002E',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  expiryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
});
