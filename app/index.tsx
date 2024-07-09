import { HelloWave } from '@/components/HelloWave';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  saldo: undefined;
  consultarMultas: undefined;
  parkingNotificator: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/udla-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Bienvenido a UDLA Parqueaderos</Text>
      <HelloWave />
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('saldo')}>
        <FontAwesome5 name="dollar-sign" size={24} color="#fff" />
        <Text style={styles.buttonText}>Recargar Saldo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('consultarMultas')}>
        <FontAwesome5 name="file-invoice-dollar" size={24} color="#fff" />
        <Text style={styles.buttonText}>Ver Mis Multas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('parkingNotificator')}>
        <FontAwesome5 name="parking" size={24} color="#fff" />
        <Text style={styles.buttonText}>Notificador Parqueaderos</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/car.png')}
          style={styles.carImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  logo: {
    width: 259,
    height: 158,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#98002E',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#98002E',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  carImage: {
    width: 270,
    height: 270,
  },
});

export default HomeScreen;
