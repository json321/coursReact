import React from "react";
import { StyleSheet, Text, View, Pressable, Image, ImageBackground } from 'react-native';
import AchatB from "./achatB";
import { connect } from 'react-redux';


class Produit extends React.Component {
    constructor(props) {
        super(props)
    }

    onAddOressed() {
        const panier = this.props.panier
        const produit = this.props.produit
        let checkpanier = false
        if(panier.length > 0) {
            for (let i = 0; i < panier.length; i++) {
                if(panier[i].type == produit.id) {
                    checkpanier = true
                    const action = {type: "UPDATE_PANIER", value: {type: produit.id}, id:i};
                    this.props.dispatch(action)
                    break;
                } 
            }
            if (checkpanier === false) {
                const action = {type: "ADD_PANIER", value: {type: produit.id, qte: 1}};
                this.props.dispatch(action);
            }
        } else {
            const action = {type: "ADD_PANIER", value: {type: produit.id, qte: 1}};
            this.props.dispatch(action);
        }

    }

    render () {

        const produit = this.props.produit
        console.log(this.props.panier)
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri:'http://jdevalik.fr/api/'+produit.image}}
                />
                <View>
                    <View style={styles.content}>
                        <Text style={styles.title}>{produit.name}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={2} >{produit.description}</Text>
                        <Text style={styles.prix}>prix: {produit.prix} €</Text>
                        <AchatB buy={() => this.onAddOressed()} theme="white" text="Ajouter au panier"/>
                    </View>
                </View>
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
    image: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: "#666",
        marginBottom: 30

    },
    content: {
        
    },
    header: {

    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center"
    },
    prix: {
        textAlign: "center"

    },
    description_container: {
        marginBottom: 30,
        textAlign: "center"

    },
    description_text: {
        padding:10
    }

});

const mapStateProps = (state) => {
    return {
            panier: state.panierReducer.panier    
        }
}

export default connect(mapStateProps) (Produit)