import React from 'react'
import { View} from 'react-native'
import { Icon} from 'react-native-elements';
import { styles } from './BtnFavorite.styles'

export function BtnFavorite(props) {
  const { idRestaurant } = props;

  const addFavorite = () => {
    console.log('Añadir a favoritos')
  }
  return (
    <View style = {styles.content}>
      <Icon
        type='material'
        name='favorite'
        color='#DCDCDC'
        size={40}
        
        onPress={() => addFavorite()}
      />
    </View>
  )
}