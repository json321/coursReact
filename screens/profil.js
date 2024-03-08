import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import Title from '../components/title';
import React from 'react';
import Bouton from '../components/bouton';
import { connect } from 'react-redux';
import { nameValidator, emailValidator } from '../untils/untils';



class Profil extends React.Component{
    constructor(props) {
        super(props)
        const profil = this.props.currentU
        this.state ={
            id: profil.id,
            nom: profil.nom,
            email: profil.email,
        }
    }

    onUpdate () {
        const formData = new FormData();
        const emailError = emailValidator(this.state.email)
        const nameError = nameValidator(this.state.nom)


        if (!emailError || !nameError) {
            Alert.alert("Un des champs est invalide")
            return;
        } else {
            // reducer
            const action = {type: "CURRENT_USER", value:{id: this.state.id, nom: this.state.nom, email: this.state.email, password: this.props.currentU.password}}
            this.props.dispatch(action)
            // bdd
            formData.append("id", this.state.id)
            formData.append("name", this.state.nom)
            formData.append("mail", this.state.email)

            fetch('http://jdevalik.fr/api/j-lo_brutto/userinfo.php', {
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
                        // Alert.alert(" Les données ont été modifier avec succès")
                        console.log(this.props.currentU)
                        this.props.navigation.navigate('Loginsucces',{profil: json});
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        
        }
    }
    
    onDelete () {
        const formData = new FormData();
        
        formData.append("id", this.state.id)

        fetch('http://jdevalik.fr/api/j-lo_brutto/deleteuser.php', {
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
                        'L\'id n\'est pas correct',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                    );
                } else {
                    const action = {type: "DELETE"}
                    this.props.dispatch(action)
                    this.props.navigation.navigate('Homescreen');
                }
            })
            .catch((error) => {
                console.error(error);
            });
        
    }


    render () {

        const {navigate} = this.props.navigation

        return (
            <View style= {styles.container}>
                <View >
                    <Title text="Profil"/>
                </View>

                <TextInput
                    label="Name"
                    style={styles.input}
                    placeholder='  Name'
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
                <Bouton nav={() => this.onUpdate()}  theme="white" text="MODIFIER" />
                <Bouton nav={() => this.onDelete()}  theme="violet" text="SUPPRESSION" />
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

export default connect(mapStateProps) (Profil)