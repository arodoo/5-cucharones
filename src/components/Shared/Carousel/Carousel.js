import React, {useState} from 'react'
import { View } from 'react-native'
import { Image } from 'react-native-elements'
import CarouselSnap, {Pagination} from 'react-native-snap-carousel'
import { size } from 'lodash'
import { styles } from './Carousel.styles'

export function Carousel(props) {

    const {arrayImages, height, width, hideDots} = props
    const [activeDotIndex, setActiveDotIndex] = useState(0)

    const renderItem = ({item}) => {
        return (
            <Image
                style={{width, height}}
                source={{uri: item}}
            />
        )
    }

    const pagination = () => {
        return (
            <Pagination
                dotsLength={size(arrayImages)}
                activeDotIndex={activeDotIndex}
                containerStyle={styles.containerPagination}
                dotStyle={styles.dotStyle}
                inactiveDotOpacity={0.35}
                inactiveDotScale={0.35}
            />
        )
    }

  return (
    <View style={styles.content}>
        <CarouselSnap
            layout={'default'}
            data={arrayImages}
            sliderWidth={width}
            itemWidth={width}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveDotIndex(index)}
        />

        {!hideDots && pagination()}
    </View>
  )
}