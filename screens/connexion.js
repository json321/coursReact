import { StyleSheet, View, TextInput, Alert } from 'react-native';
import Title from '../components/title';
import React from 'react';
import Bouton from '../components/bouton';
import Lien from '../components/lien';
import { connect } from 'react-redux';
import { emailValidator, passwordValidator } from '../untils/untils';
// import * as SQLite from 'expo-sqlite'


class Connexion extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            email: "",
            password: ""
        }

    }

    onLoginPressed () {
        const formData = new FormData();
        const emailError = emailValidator(this.state.email)
        const passwordError = passwordValidator(this.state.password)
        if (!emailError || !passwordError) {
            Alert.alert("Un des champs est invalide")
            return;
        } else {
            formData.append("mail", this.state.email)
            formData.append("password", this.state.password)

            fetch('http://jdevalik.fr/api/j-lo_brutto/getuser.php', {
                method: 'post',
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }).then((response) => response.json())
                .then((json) =>  {
                    if(json != false) {
                        const action = {type: "CURRENT_USER", value:{id: json['id'], nom: json['name'], email: json['pseudo'], password: json['password']}}
                        this.props.dispatch(action)
                        this.props.navigation.navigate('Loginsucces');
                    } else {
                        Alert.alert(
                            'Erreur',
                            'L\'e-mail ou le mot de passe est incorrect',
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

    render () {

        const {navigate} = this.props.navigation
        return (
            <View style= {styles.container}>
                <View >
                    <Title text="Connexion"/>
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
                    label="Password"
                    style={styles.input}
                    placeholder='  Password'
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                    returnKeyType='done'
                    secureTextEntry={true}
                    />
                <Lien style={styles.mb40} nav={() => navigate("Resetpass")} text="Mot de passe oublier" />
                <Bouton nav={() => this.onLoginPressed()}  theme="violet" text="CONNEXION" />
                <Lien nav={() => navigate("Inscription")} text="S'inscrire" />
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
    return {users: state.userReducer.currentU}
}

export default connect(mapStateProps) (Connexion)