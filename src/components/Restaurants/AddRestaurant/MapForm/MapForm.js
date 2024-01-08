import React from 'react'
import { Text } from 'react-native'
import { Modal } from '../../../Shared'

export function MapForm(props) {

    const {show, close} = props
  return (
    <Modal show={show} close={close}>
        <Text>Mapa</Text>
    </Modal>
  )
}