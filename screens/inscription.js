import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import Title from '../components/title';
import React from 'react';
import Bouton from '../components/bouton';
import Lien from '../components/lien';
import { nameValidator, emailValidator, passwordValidator } from '../untils/untils';
import { connect } from 'react-redux';


class Inscription extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            nom: "",
            email: "",
            password: ""
        }
    }

    onSignUpPressed () {
        const formData = new FormData();
        const nameError = nameValidator(this.state.nom)
        const emailError = emailValidator(this.state.email)
        const passwordError = passwordValidator(this.state.password)
        if (!nameError || !emailError || !passwordError) {
            Alert.alert("Un des champs est invalid")
            return;
        } else {
        
            formData.append("name", this.state.nom)
            formData.append("mail", this.state.email)
            formData.append("password", this.state.password)

            fetch('http://jdevalik.fr/api/j-lo_brutto/insertuser.php', {
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
                            'L\'e_mail saisi éxiste déjà. Veuillez saisir une autre adresse mail ou recupérer votre la votre',
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            {cancelable: false},
                        );
                    } else {
                        this.props.navigation.navigate('Connexion', {username: this.state.nom});
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
                <View>
                    <Title text="Inscription"/>
                </View>

                <TextInput
                    label="Nom"
                    style={styles.input}
                    placeholder='  Nom'
                    onChangeText={text => this.setState({nom: text})}
                    value={this.state.nom}
                    returnKeyType='next'
                />

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

                />

                <Bouton nav={() => this.onSignUpPressed()} theme="violet" text="INSCRIPTION" />
                <View style={styles.inline}>
                    <Text>Déjà inscrit ? </Text>
                    <Lien nav={() => navigate("Connexion")} text="Connectez-vous"/>
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
    return state
}

export default connect(mapStateProps) (Inscription)