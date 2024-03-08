import React from "react";
import { StyleSheet, Text, View  } from 'react-native';

export default class Title extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        var {text} = this.props
        return (
            <View style={styles.my20}>
                <Text style={styles.header}>{text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 32,
        color: "#048B9A",
        fontWeight: "bold",
    },

    my20: {
        marginVertical: 20
    }
});