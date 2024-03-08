import React from "react";
import { StyleSheet, View  } from 'react-native';
import Title from "../components/title";
import Bouton from "../components/bouton";
import { connect } from 'react-redux';

// import * as SQLite from 'expo-sqlite'

class Homescreen extends React.Component {
    // componentDidMount() {
    //     const db = SQLite.openDatabase("database.db");

    //     db.transaction(tx => {
    //         tx.executeSql("create table if not exists user (id integer primary key not null, name text, mail text, mdp text);", [],
    //         (txObj, success) => console.log('Success', success),
    //         (txObj, failed) => console.log('Failed', failed)
    //         ) 
    //         // tx.executeSql("drop table user;") 
    //     });
    // }
    render () {
        const {navigate} = this.props.navigation
        return(
            <View style= {styles.container}>
                <View >
                    <Title text="Connexion/Inscription"/>
                </View>
                <Bouton nav={() => navigate("Connexion")} theme="violet" text="CONNEXION"/>
                <Bouton nav={() => navigate("Inscription")} theme="white" text="INSCRIPTION"/>
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

        m40: {
            margin: 40
        }


  });

  const mapStateProps = (state) => {
    return state
  }

  export default connect(mapStateProps) (Homescreen)