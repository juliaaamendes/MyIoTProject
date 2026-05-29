import MQTT from 'react_native_mqtt'
import AsyncStorage from '@react-native-async-storage/async-storage'

global.localStorage = AsyncStorage

MQTT.setStorage(AsyncStorage)

let client = null

export const connectMQTT = ({
  host,
  user,
  pass,
  onMessage,
  onConnect,
  onError,
}) => {
  client = MQTT.createClient({
    uri: `wss://${host}:8884/mqtt`,
    clientId: `client_${Math.random().toString(16).slice(2)}`,
    user,
    pass,
    clean: true,
    reconnect: true,
  })

  client.on('closed', () => {
    console.log('MQTT desconectado')
  })

  client.on('error', (msg) => {
    console.log('Erro MQTT:', msg)
    onError && onError(msg)
  })

  client.on('message', (msg) => {
    onMessage && onMessage(msg)
  })

  client.on('connect', () => {
    console.log('MQTT conectado')

    client.subscribe('casa/luz', 0)
    client.subscribe('casa/temperatura', 0)
    client.subscribe('casa/umidade', 0)

    onConnect && onConnect()
  })

  client.connect()

  return client
}

export const publishMessage = (topic, message) => {
  if (!client) return

  client.publish(topic, message, 0, false)
}

export const disconnectMQTT = () => {
  if (client) {
    client.disconnect()
  }
}