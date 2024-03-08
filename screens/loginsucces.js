import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import Title from "../components/title";
import Bouton from "../components/bouton";
import Lien from "../components/lien";
import { connect } from 'react-redux';

class Loginsucces extends React.Component{
  constructor(props) {
    super(props)
    const profil = this.props.users
    this.state ={
        nom: profil.nom ?? ""
    }
  }

  onDecoPressed() {
    const action = {type: "DELETE_C_USER"}
    this.props.dispatch(action)
    this.props.navigation.navigate("Homescreen")
  }

  render () {
    const {navigate} = this.props.navigation
    return (
      <View style= {styles.container}>
        <View>
            <Title text="Vous etes connecté"/>
        </View>
        <View style={[styles.texte, styles.m10]}>
          <Text>Bonjour {this.state.nom}  bienvenue sur notre application d'inscription connexion</Text>
        </View> 
        <Bouton nav={() => navigate("ListeProduct")} theme="violet" text="Liste des produits"/>     
        <Lien nav={() => navigate("Profil")}  text="profil"/>  
        <Lien nav={() => this.onDecoPressed()}text="Deconnexion"/>
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

    m10: {
      margin: 10
    },

    texte: {
      maxWidth: 60+'%',
      textAlign: "center"
    }
  });

  const mapStateProps = (state) => {
    return {users: state.userReducer.currentU}
}

export default connect(mapStateProps) (Loginsucces)