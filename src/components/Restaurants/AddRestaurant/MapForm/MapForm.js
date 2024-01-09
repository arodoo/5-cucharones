import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import Toast from 'react-native-toast-message'
import { Modal } from '../../../Shared'
import { styles } from './MapForm.styles'

export function MapForm(props) {

  const { show, close } = props
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001
  })
  const [permissionStatus, setPermissionStatus] = useState(null)

  useEffect(() => {
    (async () => {
      if (permissionStatus === null) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status)
      }
      if (permissionStatus === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        })
      } else {
        Toast.show({
          text1: 'Permisos de localización',
          text2: 'Es necesario aceptar los permisos de localización para usar esta función',
          type: 'error'
        })
      }
    }
    )()
  }, [permissionStatus])

  const CustomMarker = ({ coordinate, title, description }) => {
    return (
      <Marker
        coordinate={coordinate}
        draggable
        onDragEnd={(e) => setLocation({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        })}
      >
        <View style={styles.markerContainer}>
          <View style={styles.markerIcon} />
          <View style={styles.markerText}>
            <Text style={styles.markerTitle}>{title}</Text>
            <Text style={styles.markerDescription}>{description}</Text>
          </View>
        </View>
      </Marker>
    )
  }

  return (
    <Modal show={show} close={close}>
      <View>
        <MapView
          initialRegion={location}
          showsUserLocation={true}
          style={styles.mapStyle}
          onRegionChangeComplete={(region) => setLocation(region)}
        >
          <CustomMarker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            title="Mi ubicación"
            description="Aquí estoy"
          />
        </MapView>
      </View>
    </Modal>
  )
}
