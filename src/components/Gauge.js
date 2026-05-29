import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'

export default function Gauges({ temperature, humidity }) {
  return (
    <View style={styles.container}>
      <View style={styles.gaugeContainer}>
        <Text style={styles.label}>Temperatura</Text>

        <CircularProgress
          value={temperature}
          radius={70}
          duration={1000}
          valueSuffix={'°C'}
        />
      </View>

      <View style={styles.gaugeContainer}>
        <Text style={styles.label}>Umidade</Text>

        <CircularProgress
          value={humidity}
          radius={70}
          duration={1000}
          valueSuffix={'%'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  gaugeContainer: {
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
})