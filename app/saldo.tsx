import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
  const [loading, setLoading] = useState(false);
  const currency = 'USD'; // Default currency

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateCardNumber = (number: string) => {
    const re = /^\d{16}$/;
    return re.test(number);
  };

  const validateExpiryMonth = (month: string) => {
    const re = /^(0[1-9]|1[0-2])$/;
    return re.test(month);
  };

  const validateExpiryYear = (year: string) => {
    const re = /^\d{2}$/;
    return re.test(year);
  };

  const validateCvv = (cvv: string) => {
    const re = /^\d{3}$/;
    return re.test(cvv);
  };

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
    if (!customerEmail || !cardType || !cardHolderName || !cardNumber || !expiryMonth || !expiryYear || !cvv || !amount || !identifier) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (!validateEmail(customerEmail)) {
      Alert.alert('Error', 'Correo electrónico no es válido.');
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      Alert.alert('Error', 'Número de tarjeta no es válido. Debe contener 16 dígitos.');
      return;
    }

    if (!validateExpiryMonth(expiryMonth)) {
      Alert.alert('Error', 'Mes de expiración no es válido.');
      return;
    }

    if (!validateExpiryYear(expiryYear)) {
      Alert.alert('Error', 'Año de expiración no es válido.');
      return;
    }

    if (!validateCvv(cvv)) {
      Alert.alert('Error', 'CVV no es válido. Debe contener 3 dígitos.');
      return;
    }

    const isIdentifierValid = await checkIdentifier();
    if (!isIdentifierValid) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('https://api-gateway-tq6a.onrender.com/shak-tarjetas/recharge', {
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
      setLoading(false);

      if (response.status === 200) {
        Alert.alert('Recarga Exitosa', `Recarga de ${amount} ${currency} realizada exitosamente.`);
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
      setLoading(false);
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
          <Image source={require('@/assets/images/tarjeta-shakira.png')} style={styles.image} />
          <Text style={styles.title}>Recarga de Saldo</Text>
          <Text style={styles.label}>Ingresa tu placa:</Text>
          <TextInput
            style={styles.input}
            placeholder="PDF1234"
            value={identifier}
            onChangeText={setIdentifier}
          />
          <Text style={styles.label}>Ingresa tu correo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={customerEmail}
            onChangeText={setCustomerEmail}
            keyboardType="email-address"
          />

          <Picker
            selectedValue={cardType}
            style={styles.picker}
            onValueChange={(itemValue) => setCardType(itemValue)}
          >
            <Picker.Item label="Selecciona tipo de tarjeta" value="" />
            <Picker.Item label="VISA" value="VISA" />
            <Picker.Item label="MASTERCARD" value="MASTERCARD" />
            <Picker.Item label="DISCOVER" value="DISCOVER" />
          </Picker>

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
          {loading ? (
            <ActivityIndicator size="large" color="#98002E" />
          ) : (
            <Button title="Recargar" onPress={handleRecharge} color="#98002E" />
          )}
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
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
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
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  expiryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  }
});
