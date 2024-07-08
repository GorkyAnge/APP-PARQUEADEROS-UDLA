import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
  const { multa, onPaymentSuccess } = route.params as { multa: MultaType, onPaymentSuccess: () => void };

  const [customerEmail, setCustomerEmail] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handlePayment = async () => {
    if (!customerEmail || !cardType || !cardHolderName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
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
      setLoading(true);
      const response = await axios.post('https://api-gateway-tq6a.onrender.com/shak-multas/multas/pagar', {
        multaId: multa.id,
        paymentDetails,
      });
      setLoading(false);

      if (response.status === 200) {
        Alert.alert('Pago Exitoso', 'La multa ha sido pagada exitosamente.');
        onPaymentSuccess();
        navigation.goBack();
      } else {
        Alert.alert('Error', response.data.message || 'Ocurrió un error durante el pago.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('@/assets/images/tarjeta-shakira.png')} style={styles.image} />
        <Text style={styles.title}>Pagar Multa</Text>
        <Text>Descripción: {multa.descripcion}</Text>
        <Text>Valor: {multa.valor}$</Text>

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
        {loading ? (
          <ActivityIndicator size="large" color="#98002E" />
        ) : (
          <Button title="Pagar" onPress={handlePayment} color="#98002E" />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
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
  picker: {
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
