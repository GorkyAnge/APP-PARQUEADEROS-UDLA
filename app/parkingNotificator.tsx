import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Necesitarás instalar @expo/vector-icons

const parkings = [
  { name: 'PARQUEADERO SIMÓN BOLIVAR', image: require('@/assets/images/udla-parqueadero-simon-bolivar.png'), icon: 'building' },
  { name: 'PARQUEADERO INTERNO', image: require('@/assets/images/udla-parqueadero-interno.png'), icon: 'parking' },
  { name: 'PARQUEADERO EXTERNO', image: require('@/assets/images/udla-parqueadero-externo.png'), icon: 'car' },
  { name: 'PARQUEADERO CAMPITO', image: require('@/assets/images/udla-parqueadero-campito.png'), icon: 'tree' },
  { name: 'PARQUEADERO UDLA ARENA', image: require('@/assets/images/udla-parqueadero-udla-arena.png'), icon: 'basketball-ball' },
];

const ParkingSelection = () => {
  const navigation = useNavigation();

  const handlePress = (parkingName: string) => {
    navigation.navigate('subscriptionParking', { parkingName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un Parqueadero</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {parkings.map((parking, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(parking.name)} style={styles.button}>
            <Image source={parking.image} style={styles.image} />
            <View style={styles.textContainer}>
              <FontAwesome5 name={parking.icon} size={24} color="#98002E" />
              <Text style={styles.buttonText}>{parking.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#98002E',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#fff',
    borderWidth: 1,
  },
  image: {
    width: 259,
    height: 158,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
    color: '#98002E',
  },
});

export default ParkingSelection;
