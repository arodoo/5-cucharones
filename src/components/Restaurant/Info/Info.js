import React from 'react'
import { View } from 'react-native'
import { Text, ListItem, Icon } from 'react-native-elements'
import { map } from 'lodash'

import { styles } from './Info.styles'

export function Info(props) {

    const { restaurant } = props

    const listInfo = [
        {
            text: restaurant.address,
            iconType: 'material',
            iconName: 'location-on',
            action: null
        },
        {
            text: restaurant.phone,
            iconType: 'material',
            iconName: 'phone',
            action: null
        },
        {
            text: restaurant.description,
            iconType: 'material',
            iconName: 'description',
            action: null
        }
    ];
    return (
        <View style={styles.content}>
            <Text style={styles.title}>Información sobre el restaurante</Text>
            <View>
                {
                    map(listInfo, (item, index) => (
                        <ListItem key={index} style={styles.listItem}>
                            <Icon
                                style={styles.listIcon}
                                type={item.iconType}
                                name={item.iconName}
                            />
                            <ListItem.Content>
                                <ListItem.Title>{item.text}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
        </View>
    )
}