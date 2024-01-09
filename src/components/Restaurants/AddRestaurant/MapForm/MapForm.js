import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import Toast from 'react-native-toast-message'
import { Modal } from '../../../Shared'
import { styles } from './MapForm.styles'

export function MapForm(props) {

  const { show, close, formik } = props
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  })

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          text1: 'Permisos de localización',
          text2: 'Es necesario aceptar los permisos de localización para usar esta función',
          type: 'error'
        })
        return
      } else {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        })
      }
    }
    )()
  }, [])

  const saveLocation = () => {
    formik.setFieldValue('location', location)
    close()
  }

  return (
    <Modal show={show} close={close}>
      <MapView
        initialRegion={location}
        showsUserLocation={true}
        style={styles.mapStyle}
        onRegionChange={(region) => setLocation(region)}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
          draggable
          onDragEnd={(e) => setLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          })}
        />
      </MapView>
      <View style={styles.mapActions}>
        <Button
          title="Guardar"
           onPress={() => {
            saveLocation()
          }} 

          containerStyle={styles.btnMapContainerSave}
          buttonStyle={styles.btnMapSave}
        />
        <Button
          title="Cerrar"
          onPress={() => {
            props.close()
          }}
          containerStyle={styles.btnMapContainerCancel}
          buttonStyle={styles.btnMapCancel}
        />
      </View>
    </Modal>
  )
}