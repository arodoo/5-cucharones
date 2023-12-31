import React from 'react'
import { View } from 'react-native'
import { Icon, ListItem, Text } from 'react-native-elements'
import map from 'lodash/map'

export function AccountOptions() {

  return (
    <View>
        {map(menuOptions, (menu, index) => (
          <ListItem key={index}
          bottomDivider
          onPress={menu.onPress}
          >
            <Icon name={menu.iconNameLeft} color={menu.iconColorLeft} />
            <ListItem.Content>
              <ListItem.Title>{menu.title}</ListItem.Title>
            </ListItem.Content>
            <Icon type={menu.iconType} name={menu.iconNameRight} color={menu.iconColorRight} />
          </ListItem>
        ))}
    </View>
  )
}

const menuOptions = [
    {
      title: 'Cambiar nombre y apellidos',
      iconType: 'material',
       iconNameLeft: 'account-circle',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc', 
      onPress: () => console.log("smthng")
    },
    {
      title: 'Cambiar email',
      iconType: 'material',
      iconNameLeft: 'email',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => console.log("smthng")
    },
    {
      title: 'Cambiar contraseña',
      iconType: 'material',
      iconNameLeft: 'vpn-key',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => console.log("smthng")
    }
  ]