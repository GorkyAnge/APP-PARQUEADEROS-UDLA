import { HelloWave } from '@/components/HelloWave';
import React from 'react';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/udla-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Bienvenido a UDLA Parqueaderos</Text>
      <HelloWave />
      <TouchableOpacity style={styles.button}>
        <Link style={styles.buttonText} href="../saldo">Recargar Saldo</Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
      <Link style={styles.buttonText} href="../consultarMultas">Ver Mis Multas</Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Disponibilidad Parqueaderos</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/car.png')}
          style={styles.carImage}
        />
      </View>
      <Text style={styles.findSpotText}>FIND ME A SPOT NOW!</Text>
    </View>
  );
}

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
    backgroundColor: '#98002E',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    marginTop: 10,
  },
  loginButtonText: {
    color: '#98002E',
    textDecorationLine: 'underline',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  carImage: {
    width: 270,
    height: 270,
  },
  findSpotText: {
    color: '#98002E',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
