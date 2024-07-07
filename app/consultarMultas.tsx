import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function ConsultarMultas() {
  const [identifier, setIdentifier] = useState('');
  const [multas, setMultas] = useState<{ id: string, descripcion: string, valor: number, fecha: string, pagada: boolean }[]>([]);
  const navigation = useNavigation();

  const fetchMultas = async () => {
    try {
      const response = await axios.get(`https://shak-multas.onrender.com/multas/${identifier}`);
      setMultas(response.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron obtener las multas.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultar Multas</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu placa"
        value={identifier}
        onChangeText={setIdentifier}
      />
      <Button title="Buscar Multas" onPress={fetchMultas} color="#98002E" />

      <FlatList
        data={multas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.multaItem}>
            <Text>Descripción: {item.descripcion}</Text>
            <Text>Valor: {item.valor}</Text>
            <Text>Fecha: {item.fecha}</Text>
            <Text>Pagada: {item.pagada ? 'Sí' : 'No'}</Text>
            {!item.pagada && (
              <Button
                title="Pagar Multa"
                onPress={() => navigation.navigate('pagarMulta', { multa: item })}
                color="#98002E"
              />
            )}
          </View>
        )}
      />
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
  multaItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
});