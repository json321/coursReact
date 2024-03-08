import React from "react";
import { StyleSheet, Text, View, Pressable } from 'react-native';


export default class Lien extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        var {text} = this.props
        return (
            <View style={styles.mb20}>
                <Pressable onPress={this.props.nav}>
                    <Text style={styles.lien}>{text}</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    lien: {
        color:"#048B9A",
        fontWeight: "bold"
    },
    mb20: {
        marginBottom: 10
    }
});