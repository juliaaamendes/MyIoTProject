import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import {
  MQTT_HOST,
  MQTT_USER,
  MQTT_PASS,
} from '@env'

import { SafeAreaView } from 'react-native-safe-area-context'

import LightControl from './src/components/LightControl'
import Gauges from './src/components/Gauges'
import StatusModal from './src/components/StatusModal'

import {
  connectMQTT,
  publishMessage,
} from './src/services/mqttService'

export default function App() {
  const [lightOn, setLightOn] = useState(false)
  const [temperature, setTemperature] = useState(0)
  const [humidity, setHumidity] = useState(0)

  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  useEffect(() => {
    connectMQTT({
      host: MQTT_HOST,
      user: MQTT_USER,
      pass: MQTT_PASS,

      onConnect: () => {
        console.log('Conectado ao broker')
      },

      onError: (err) => {
        setModalMessage('Erro ao conectar MQTT')
        setModalVisible(true)
      },

      onMessage: (msg) => {
        const topic = msg.topic
        const payload = msg.data

        console.log(topic, payload)

        if (topic === 'casa/luz') {
          setLightOn(payload === '1')
        }

        if (topic === 'casa/temperatura') {
          setTemperature(parseFloat(payload))
        }

        if (topic === 'casa/umidade') {
          setHumidity(parseFloat(payload))
        }
      },
    })
  }, [])

  const toggleLight = () => {
    const newState = !lightOn

    setLightOn(newState)

    publishMessage('casa/luz', newState ? '1' : '0')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dashboard IoT</Text>

      <LightControl
        lightOn={lightOn}
        toggleLight={toggleLight}
      />

      <Gauges
        temperature={temperature}
        humidity={humidity}
      />

      <StatusModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
})
