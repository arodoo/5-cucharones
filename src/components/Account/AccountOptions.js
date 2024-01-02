import React, { useState } from 'react'
import { View } from 'react-native'
import { Icon, ListItem, Text } from 'react-native-elements'
import map from 'lodash/map'
import { Modal } from '../Shared/Modal/Modal'
import { ChangueDisplayNameForm } from '../Account/ChangueDisplayNameForm'

export function AccountOptions(props) {

  const { onReload } = props

  const [showModal, setShowModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)

  const onCloseOpenModal = (state) => (

    setShowModal(state),
    console.log("state", state)
  )

  const selectedComponent = (key) => {
    // Add your logic here based on the selected component key
    if (key === "displayName") {
      setRenderComponent(
        <ChangueDisplayNameForm
          onCloseOpenModal={onCloseOpenModal}
          onReload={onReload}
        />)
      onCloseOpenModal(true)
    } else if (key === "email") {
      setRenderComponent(<Text>email</Text>)
      onCloseOpenModal(true)
    } else if (key === "password") {
      setRenderComponent(<Text>password</Text>)
      onCloseOpenModal(true)
    }
  }


  const menuOptions = [
    {
      title: 'Cambiar nombre y apellidos',
      iconType: 'material',
      iconNameLeft: 'account-circle',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => selectedComponent("displayName")
    },
    {
      title: 'Cambiar email',
      iconType: 'material',
      iconNameLeft: 'email',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => selectedComponent("email")
    },
    {
      title: 'Cambiar contraseña',
      iconType: 'material',
      iconNameLeft: 'vpn-key',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => selectedComponent("password")
    }
  ]

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

      <Modal show={showModal} close={onCloseOpenModal}>
        <View>
          {renderComponent}
        </View>
      </Modal>
    </View>
  )
}

