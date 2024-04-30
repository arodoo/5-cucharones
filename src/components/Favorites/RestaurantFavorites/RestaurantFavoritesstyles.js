import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content:{
        marginVertical: 10,
        marginHorizontal: 15,
    },
    imageContainer:{
        width: '100%',
        height: 150,
        overflow: 'hidden',
        borderRadius: 10
    },
    image:{
        width: '100%',
        height: 150
    },
    info:{
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: 35,
        borderEndEndRadius: 100,
        borderBottomStartRadius: 10,
    },
    name:{
        fontWeight: 'bold'
    
    },
    iconContainer:{
        position: 'absolute',
        top: -30,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 100,
        padding: 5
    }
});