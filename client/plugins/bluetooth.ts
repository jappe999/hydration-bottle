window.server = null

declare global {
  interface Window {
    server: any
  }
}

export const connect = async (code: string) => {
  //@ts-ignore
  return navigator.bluetooth
    .requestDevice({
      filters: [{ namePrefix: code }],
      optionalServices: [0x180f, 0x181d],
    })
    .then(device => device.gatt.connect())
    .then(server => {
      window.server = server
      return server
    })
}

export const watch = (serviceUUID = 0x181d, characteristicUUID = 0x2a98, callback = (event) => null) => {
  return window.server.getPrimaryService(serviceUUID)
    .then(service => {
      return service.getCharacteristic(characteristicUUID)
    })
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => {
      characteristic.addEventListener(
        'characteristicvaluechanged',
        callback,
      )
      return characteristic
    })
}

export const unwatch = (characteristic) => {
  return characteristic.stopNotifications()
}
