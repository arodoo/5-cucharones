import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import * as Location from 'expo-location'
import MapView, {Marker} from 'react-native-maps'
import Toast from 'react-native-toast-message'
import { Modal } from '../../../Shared'
import { styles } from './MapForm.styles'

export function MapForm(props) {

  const { show, close } = props
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

  return (
    <Modal show={show} close={close}>
      <View>
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
      </View>
    </Modal>
  )
}