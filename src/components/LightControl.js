import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function LightControl({ lightOn, toggleLight }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle da Luz</Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: lightOn ? '#FFD700' : '#333' },
        ]}
        onPress={toggleLight}
      >
        <Text style={styles.buttonText}>
          {lightOn ? 'LIGADA' : 'DESLIGADA'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    padding: 20,
    borderRadius: 12,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
})