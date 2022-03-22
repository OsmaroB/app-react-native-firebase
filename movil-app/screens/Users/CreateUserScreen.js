import React, {useState} from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import firebase from '../../database/firebase';
const CreateUserScreen = (props) => {

    const [state, setstate] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChangeText = (name, value) => {
        setstate({...state, [name]: value});
    };


    const addeNewUser = async () => {
        const errors = [];
        if(state.name === '')
            errors.push('Plese provide a name');
        if(state.email === '')
            errors.push('Plese provide a email');
        if(state.phone === '')
            errors.push('Plese provide a phone'); 
        if(errors.length > 0){
            errors.map((item)=>{
                alert(item);
            })
        }else{
            try {
                const data = await firebase.db.collection('users').add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone,
                });
                props.navigation.navigate('UserList');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return(
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name User" 
                onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email User" 
                onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone User" 
                onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
            <View>
                <Button title="Save User" onPress={()=>{addeNewUser()}}/>
            </View>
        </ScrollView> 
    ); 
};


const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 35
    },  
    inputGroup:{
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    
    }
});

export default CreateUserScreen;