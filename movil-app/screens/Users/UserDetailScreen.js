import React,{useEffect, useState} from "react";
import { View, Button, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { ActivityIndicator } from "react-native-web";
import firebase from '../../database/firebase'; 

const UserDetailScreen = (props) => {

    const initialUser = {
        id: '',
        name: '',
        email: '',
        phone: ''
    }
    const [user, setUser] = useState(initialUser);

    const [loading, setLoading] = useState(true);

    const handleChangeText = (name, value) => {
        setUser({...user, [name]: value});
    };

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id,
        });
        setLoading(false);
    };

    const updateUserById = async () => {
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.set({
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
        setUser(initialUser);
        props.navigation.navigate('UserList');
    };

    const deleteUserById = async () => {
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.delete();
        props.navigation.navigate('UserList');
    };

    const confirmDelete = () => {
        Alert.alert('Remove the user', 'Are you sure ?', [
            {text: 'Yes', onPress: ()=>{deleteUserById()}},
            {text: 'No', onPress: ()=>{console.log(false)}},
        ]);
    };

    useEffect(() => {
      getUserById(props.route.params.userId);
    }, [])


    if(loading){
        return(
            <View>
                <ActivityIndicator size='large' color="#9e9e9e" />
            </View>
        )
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name User" 
                value={user.name}
                onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email User" 
                value={user.email}
                onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone User" 
                value={user.phone}
                onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
            <View>
                <Button color="#19AC52" style={styles.ButtonGroup} title="Update User" onPress={()=>{updateUserById()}}/>
            </View>
            <View>
                <Button color='#E37399' style={styles.ButtonGroup} title="Delete User" onPress={()=>{confirmDelete()}}/>
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
    
    },
    ButtonGroup:{
        margin: 2,
        padding: 2,
    }
});

export default UserDetailScreen;