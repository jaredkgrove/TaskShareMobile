import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';

//REACT NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator<RootStackParamList>();


//AUTH
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import * as GoogleSignIn from 'expo-google-sign-in';

//TYPES
import {RootStackParamList} from '../types'

//SCREENS
import HomeScreen from '../screens/HomeScreen';
import ActiveListScreen from './ActiveListScreen';

import firestore from '@react-native-firebase/firestore';


import { useReduxDispatch, useReduxSelector } from '../redux/store'
import { setUser } from '../redux/slices/UserSlice';
import { createUser } from '../api/firebase/FirestoreAPI';

const MainScreen = () => {
  //LOCAL STATE
  const [initializing, setInitializing] = useState<boolean>(true);
  const [googleUser, setGoogleUser] = useState<GoogleSignIn.GoogleUser|null>(null)
  //APP STATE
  const currentUser = useReduxSelector(state => state.user);
  const dispatch = useReduxDispatch()
  let subscriber2:() => void;
  // let thing:() => void
  
  //FIRESTORE LISTENERS
  const onAuthStateChanged = (userState:FirebaseAuthTypes.User|null) => {
    if(subscriber2){subscriber2()}   
    if(userState){
      subscriber2 = firestore().collection("users").doc(userState?.uid).onSnapshot((doc) => {
        if(!doc.exists){
          createUser(userState, googleUser)
        }else{
         
          let user:any = doc.data()
          dispatch(setUser(user))
        }
      });
    }else{
      dispatch(setUser({emailAddress: null, emailVerified: false, displayName: null, googleUserUID:null}))
    }
    if(initializing) setInitializing(false)
  }

  useEffect(() => {
    GoogleSignInInit()
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {subscriber();if(subscriber2){subscriber2()};} // unsubscribe on unmount
  }, []);

  const GoogleSignInInit = async () => {
      try {
        await GoogleSignIn.initAsync({
            scopes: [GoogleSignIn.SCOPES.PROFILE, GoogleSignIn.SCOPES.EMAIL, "https://www.googleapis.com/auth/tasks"],
        });
      } catch ({ message }) {
        alert('GoogleSignIn.initAsync(): ' + message);
      }
  }

  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    await auth().signOut()
  };

  const signInAsync = async () => {
    try {

      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user }:GoogleSignIn.GoogleSignInAuthResult = await GoogleSignIn.signInAsync();
      if(user?.auth){
        setGoogleUser(user)
        const {idToken, accessToken, refreshToken} = user.auth;
        const credential = auth.GoogleAuthProvider.credential(
          idToken ? idToken:null,
          accessToken,
        );
        
        await auth().signInWithCredential(credential)
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    } 
  };


  const onPress = async () => {
    if (currentUser?.emailAddress) {
      await signOutAsync();
    } else {
      await signInAsync();
    }
  };

  if (initializing) return null;

  if (!currentUser?.emailAddress) {      
      return (
          <View>
            <Text>Please login</Text>
            <Text onPress={onPress}>Toggle Auth</Text>
            <Text onPress={onPress}>Logout</Text>

          </View>
      )
  }

  return (
    <>     
      <NavigationContainer>
          <Stack.Navigator> 
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ActiveList" component={ActiveListScreen} />
          </Stack.Navigator>
      </NavigationContainer>
      <Text onPress={onPress}>Logout</Text>

    </>
  );
}

export default MainScreen