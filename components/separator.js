import React from "react";
import { StyleSheet, Text, View, Pressable, Image, ImageBackground } from 'react-native';


export default class Separator extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {

        const produit = this.props.produit
        console.log(produit)
        return (
            <View>
                <View style={styles.separator}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
     separator: {
        borderWidth:1,
        borderColor:"#555",
     }

});