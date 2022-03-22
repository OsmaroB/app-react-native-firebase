import React, { useEffect, useState} from "react";
import { View, Button } from 'react-native';
import { ActivityIndicator, ScrollView } from "react-native-web";
import firebase from '../../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';

const UserList = (props) => {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc =>{
                const {name, email, phone} = doc.data();
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                });
            });
            setUsers(users);
            setLoading(false);
        });
    }, [])

    if(loading){
        return(
            <>
                <Button title='Loading...' color='gray' />
                <View>
                    <ActivityIndicator size='large' color="#9e9e9e" />
                </View>
            </>
        )
    }
    
    return(
        <ScrollView>
            <Button 
                title='Create User' 
                onPress={()=>{ props.navigation.navigate('CreateUserScreen');}} 
            />
            {
                users.map(user=>{
                    return(
                        <ListItem
                            key={user.id}
                            bottomDivider onPress={()=>{props.navigation.navigate('UserDetailScreen',{
                                userId: user.id
                            })}}
                        >
                            <ListItem.Chevron />
                            <Avatar source={{
                                uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg',
                            }}
                            rounded
                            />
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })
            }
        </ScrollView>
    );
};

export default UserList;