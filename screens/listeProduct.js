import { StyleSheet, View, Text, TextInput, Alert, FlatList } from 'react-native';
import Title from '../components/title';
import React from 'react';
import Bouton from '../components/bouton';
import { connect } from 'react-redux';
import Produit from '../components/Produit';
import Separator from '../components/separator';

class ListeProduct extends React.Component{
    constructor(props) {
        super(props)
        const profil = this.props.users
        this.state ={
            userId: profil.id,
            userName: profil.nom,
        }
    }

    componentDidMount(){
        const formData = new FormData();
        formData.append("type",1)
        fetch('http://jdevalik.fr/api/j-lo_brutto/getProducts.php', {
            method: 'post',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }).then((response) => response.json())
            .then((json) =>  {
                if(json == false) {
                    Alert.alert(
                        'Erreur',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                    );
                } else {
                    const action = {type: "ADD_PRODUCT", value:json}
                    this.props.dispatch(action)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onDecoPressed() {
        const action = {type: "DELETE_C_USER"}
        this.props.dispatch(action)
        this.props.navigation.navigate("Homescreen")
      }

    
    render () {
        const {navigate} = this.props.navigation
        // console.log(this.props.products)
        return (
            <View style= {styles.container}>
                <View >
                    <Title text={"Produit de " + this.state.userName}/>
                </View>
                
                <FlatList
                    data={this.props.products}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Produit produit={item} />}
                    ItemSeparatorComponent={<Separator/>}
                />
                <Bouton nav={() => navigate("Profil")} theme="violet" text="Mon profil ->"/>  
                <Bouton nav={() => this.onDecoPressed()} theme="violet" text="DECONNECTION"/>

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

    input: {
        height: 35,
        width: 200,
        borderRadius:5, 
        borderColor: "gray",
        borderWidth: 1, 
        margin: 10
    },

    m10: {
        margin: 10
    },

    inline: {
        flexDirection: "row"
    }

});

const mapStateProps = (state) => {
    return {products: state.productsReducer.product,
            users: state.userReducer.currentU,
            panier: state.panierReducer.panier    
        }
}


export default connect(mapStateProps) (ListeProduct)