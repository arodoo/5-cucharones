import React from 'react'
import { View, Text } from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import openMap from 'react-native-open-maps'
import { styles } from './Map.styles'

export function Map(props) {

  const { location, name } = props;

  const openAppMap = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
      query: name
    })
  }
  
  return (
    <MapView
      style={styles.mapStyle}
      initialRegion={location}
      onPress={openAppMap}
    >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude
        }}
      />
    </MapView>
  )
}