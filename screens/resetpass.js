import { StyleSheet, View, TextInput, Alert } from 'react-native';
import Title from '../components/title';
import React from 'react';
import Bouton from '../components/bouton';
import Lien from '../components/lien';
import { connect } from 'react-redux';
import { emailValidator, passwordValidator } from '../untils/untils';
// import * as SQLite from 'expo-sqlite'


class Resetpass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            newPassword: "",
            newPassword2: "",
        }

    }

    onLoginPressed () {
        const formData = new FormData();
        const emailError = emailValidator(this.state.email)
        const passwordError = passwordValidator(this.state.newPassword)
        const passwordError2 = passwordValidator(this.state.newPassword2)


        if (!emailError || !passwordError || !passwordError2 ) {
            Alert.alert("Un des champs est invalide")
            return;
        } else {
            if (this.state.newPassword == this.state.newPassword2) {
                formData.append("mail", this.state.email)
                formData.append("password", this.state.newPassword)
                
                fetch('http://jdevalik.fr/api/j-lo_brutto/updateuser.php', {
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
                                'L\'e_mail saisi existe pas',
                                [
                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                ],
                                {cancelable: false},
                            );
                        } else {
                            this.props.navigation.navigate('Connexion');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            // if (this.state.newPassword == this.state.newPassword2) {
            //     db.transaction( tx => {
            //         tx.executeSql("update user set mdp = ? where mail = ?", [this.state.newPassword, this.state.email]
            //         ,(txObj, success) => Alert.alert("Le mot de passe a été réinitialisé"),
            //         (txObj, error) => console.log('Failed', error))

            //     });
            // } else {
            //     Alert.alert("Les deux mots de passe doivent etre identiques")
            // }
        }
    }

    render () {

        const {navigate} = this.props.navigation
        
        // var email = this.state.email
        // var password = this.state.newPassword

        return (
            <View style= {styles.container}>
                <View >
                    <Title text="Nouveau mot de passe"/>
                </View>

                <TextInput
                    label="Email"
                    style={styles.input}
                    placeholder='  Email'
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                    returnKeyType='next'
                    />
                <TextInput
                    label="NewPassword1"
                    style={styles.input}
                    placeholder=' Nouveau mot de passe'
                    onChangeText={text => this.setState({newPassword: text})}
                    value={this.state.newPassword}
                    returnKeyType='next'
                    secureTextEntry={true}
                    />
                <TextInput
                    label="NewPassword2"
                    style={styles.input}
                    placeholder=' Nouveau mot de passe'
                    onChangeText={text => this.setState({newPassword2: text})}
                    value={this.state.newPassword2}
                    returnKeyType='done'
                    secureTextEntry={true}
                />
                <Bouton nav={() => this.onLoginPressed()}  theme="violet" text="MODIFIER" />
                <Lien nav={() => navigate("Connexion")} text="Se connecter" />
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

    mb40: {
        marginBottom: 40
    }

});

const mapStateProps = (state) => {
    return state
}

export default connect(mapStateProps) (Resetpass)