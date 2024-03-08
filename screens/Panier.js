import { StyleSheet, View, Text, TextInput, Alert, FlatList, Image } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Title from '../components/title';
import Lien from '../components/lien';
import React from 'react';
import Bouton from '../components/bouton';
import { connect } from 'react-redux';


class ListeProduct extends React.Component{
    constructor(props) {
        super(props)
        const profil = this.props.users
        this.state ={
            userId: profil.id,
            userName: profil.nom,
            total: 0,
        }
    }

    componentDidMount(){
        const panier = this.props.panier;
        let toto = 0
        for (let i = 0; i < panier.length; i++) {
            toto += panier[i].prix
            // console.log(this.state.total)
        }
        this.setState({total: toto})
    }
    
    componentDidUpdate(){
        const panier = this.props.panier;
        let toto = 0
        for (let i = 0; i < panier.length; i++) {
            toto += panier[i].prix
            console.log(this.state.total)
        }
        if (toto != this.state.total) {
            this.setState({total: toto})
        }
    }

    commander(){
        const formData = new FormData();
        const profil = this.props.users
        const panier =this.props.panier
        for (let i = 0; i < panier.length; i++) {
            // console.log(panier[i])

            formData.append("nom", profil.nom)
            formData.append("email", profil.email)
            formData.append("produit", panier[i].type)
            formData.append("qte", panier[i].qte)
            formData.append("prix", panier[i].prix)
            formData.append("prixU", panier[i].prixU)
            formData.append("total", this.state.total)
            
            fetch('http://jdevalik.fr/api/j-lo_brutto/addPanier.php', {
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
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }        
    }


    onDecoPressed() {
        const action = {type: "DELETE_C_USER"}
        this.props.dispatch(action)
        this.props.navigation.navigate("Homescreen")
      }

    
    render () {
        const {navigate} = this.props.navigation
        const panier = this.props.panier
        // console.log(this.props.users)
        // console.log(this.props.products)
        return (
            <View style= {styles.container}>
                <View >
                    <Title text={"Panier de " + this.state.userName}/>
                </View>
                {panier.map((p,i) => (                       
                    <View key={i} style={styles.inline}>
                        <Image
                            style={styles.image}
                            source={{uri:'http://jdevalik.fr/api/'+p.photo}}
                        />
                        <Text>{p.nom}  Qte= {p.qte} p.  Prix={p.prixU} €</Text>
                        
                    </View>   
                ))}
                <View>
                    <Text>Total à payer = {this.state.total}</Text>
                </View>
                
                <Bouton nav={() => this.commander()} theme="violet" text="Commander"/>
                <Lien nav={() => navigate("Profil")} text="Mon profil"/>  
                <Lien nav={() => this.onDecoPressed()}  text="Deconnection"/>
            </View>     
        )   
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      alignContent: 'space-between',
      width: 100+"vw"
    },

    
    m10: {
        margin: 10
    },

    inline: {
        // flex:1,
        alignItems:"center",
        alignContent: "space-between",
        flexDirection: "row"
    },
    image: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#666",
        margin: 10
    },
    header: {
         height: 50,
          backgroundColor: '#537791' 
    },
    text: {
        textAlign: 'center',
        fontWeight: '100' 
    },
    row: {
        height: 40,
        backgroundColor: '#E7E6E1' 
    }
    


});

const mapStateProps = (state) => {
    return {products: state.productsReducer.products,
            users: state.userReducer.currentU,
            panier: state.panierReducer.panier    
        }
}


export default connect(mapStateProps) (ListeProduct)