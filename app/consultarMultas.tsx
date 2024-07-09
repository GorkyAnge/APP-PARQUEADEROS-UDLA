import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function ConsultarMultas() {
  const [identifier, setIdentifier] = useState('');
  const [multas, setMultas] = useState<{ id: string, descripcion: string, valor: number, fecha: string, pagada: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchMultas = async () => {
    if (identifier.trim() === '') {
      return; // No hacer nada si el identificador está vacío
    }

    setIsLoading(true); // Mostrar indicador de carga
    try {
      const response = await axios.get(`https://api-gateway-tq6a.onrender.com/shak-multas/multas/${identifier}`);
      const sortedMultas = response.data.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      setMultas(sortedMultas);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron obtener las multas.');
    } finally {
      setIsLoading(false); // Ocultar indicador de carga
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchMultas();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/shakira-policia.png')} style={styles.image} />
      <Text style={styles.title}>Consultar Multas</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu placa"
        value={identifier}
        onChangeText={setIdentifier}
      />
      <Button title="Buscar Multas" onPress={fetchMultas} color="#98002E" />

      {isLoading ? (
        <ActivityIndicator size="large" color="#98002E" style={styles.loadingIndicator} />
      ) : (
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
                  onPress={() => navigation.navigate('pagarMulta', { multa: item, onPaymentSuccess: fetchMultas })}
                  color="#98002E"
                />
              )}
            </View>
          )}
        />
      )}
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
    textAlign: 'center',
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  }
});
