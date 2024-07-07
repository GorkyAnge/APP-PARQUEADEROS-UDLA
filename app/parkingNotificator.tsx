import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const parkings = [
  { name: 'PARQUEADERO SIMÓN BOLIVAR', image: require('@/assets/images/udla-parqueadero-simon-bolivar.png') },
  { name: 'PARQUEADERO INTERNO UDLA PARK', image: require('@/assets/images/udla-parqueadero-interno.png') },
  { name: 'PARQUEADERO EXTERNO', image: require('@/assets/images/udla-parqueadero-externo.png') },
  { name: 'PARQUEADERO CAMPITO', image: require('@/assets/images/udla-parqueadero-campito.png') },
  { name: 'PARQUEADERO UDLA ARENA', image: require('@/assets/images/udla-parqueadero-udla-arena.png') },
];

const ParkingSelection = () => {
  const navigation = useNavigation();

  const handlePress = (parkingName: string) => {
    navigation.navigate('subscriptionParking', { parkingName });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {parkings.map((parking, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(parking.name)} style={styles.button}>
          <Image source={parking.image} style={styles.image} />
          <Text style={styles.buttonText}>{parking.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 259,
    height: 158,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#98002E',
  },
});

export default ParkingSelection;
