import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';

export default function Saldo() {
  const [customerEmail, setCustomerEmail] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [identifier, setIdentifier] = useState('');
  const currency = 'USD'; // Default currency

  const checkIdentifier = async () => {
    try {
      const response = await axios.post('https://shak-tarjetas.onrender.com/checkIdentifier', { identifier });

      if (response.status === 200 && response.data.identifier) {
        return true;
      } else {
        Alert.alert('Error', 'Identificador no encontrado.');
        return false;
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo verificar el identificador.');
      return false;
    }
  };

  const handleRecharge = async () => {
    // Validar que todos los campos estén llenos
    if (!customerEmail || !cardType || !cardHolderName || !cardNumber || !expiryMonth || !expiryYear || !cvv || !amount || !identifier) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    // Verificar el identificador antes de proceder
    const isIdentifierValid = await checkIdentifier();
    if (!isIdentifierValid) {
      return;
    }

    try {
      const response = await axios.post('https://shak-tarjetas.onrender.com/api/recharge', {
        app_name: 'Parqueaderos UDLA',
        service: 'Recarga de Identificador',
        customer_email: customerEmail,
        card_type: cardType,
        card_holder_name: cardHolderName,
        card_number: cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
        amount,
        currency,
        identifier,
      });

      if (response.status === 200) {
        Alert.alert('Recarga Exitosa', `Recarga de ${amount} ${currency} realizada exitosamente.`);
        // Restablecer los campos después de una recarga exitosa
        setCustomerEmail('');
        setCardType('');
        setCardHolderName('');
        setCardNumber('');
        setExpiryMonth('');
        setExpiryYear('');
        setCvv('');
        setAmount('');
        setIdentifier('');
      } else {
        Alert.alert('Error', response.data.message || 'Ocurrió un error durante la recarga.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Recarga de Saldo</Text>
          <Text style={styles.label}>Ingresa tu placa:</Text>
          <TextInput
            style={styles.input}
            placeholder="PBO-1234"
            value={identifier}
            onChangeText={setIdentifier}
          />
          <Text style={styles.label}>Ingresa tu correo:</Text>
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
          <Text style={styles.label}>Ingresa el saldo a recargar:</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <Button title="Recargar" onPress={handleRecharge} color="#98002E" />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#98002E',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  expiryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
});
