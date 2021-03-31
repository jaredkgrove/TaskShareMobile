import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';

//REACT NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator<RootStackParamList>();

//Firebase
import firestore,{firebase} from '@react-native-firebase/firestore';

//AUTH
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import * as GoogleSignIn from 'expo-google-sign-in';

//TYPES
import {RootStackParamList} from '../types'

//SCREENS
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

import { authChanged } from '../redux/slices/UserSlice'
import { useReduxDispatch, useReduxSelector } from '../redux/store'

const MainScreen = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  
  const currentUser = useReduxSelector(state => state.user);
  const dispatch = useReduxDispatch()
  // const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthStateChanged = (userState:FirebaseAuthTypes.User | null) => {
  //   console.log("userState ", userState)
  //   if(userState){
  //     await firestore()
  //       .collection("users")
  //       .doc(userState.uid)
  //       .set({
  //         id: userState.uid,
  //         emailAddress: userState.email,
  //         verified: userState.emailVerified,
  //       });
  //   }
  //   setUser(userState);
  //   if(initializing) setInitializing(false)
    dispatch<any>(authChanged(userState))
    if(initializing) setInitializing(false)
  }

  useEffect(() => {
    GoogleSignInInit()
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    console.log('currentUser ', currentUser)
}, [currentUser]);

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
        const {idToken, accessToken} = user.auth;
        const credential = auth.GoogleAuthProvider.credential(
          idToken ? idToken:null,
          accessToken,
        );
        await auth().signInWithCredential(credential);
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    } 
  };


  const onPress = async () => {
    if (currentUser) {
      await signOutAsync();
    } else {
      await signInAsync();
    }
  };

  if (initializing) return null;

  if (!currentUser?.id) {      
      return (
          <View>
            <Text>Please login</Text>
            <Text onPress={onPress}>Toggle Auth</Text>
          </View>
      )
  }

  return (
    <>     
      <NavigationContainer>
          <Stack.Navigator> 
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
      </NavigationContainer>
      <Text>{currentUser.emailAddress}</Text>
      <Text onPress={onPress}>Logout</Text>
    </>
  );
}

export default MainScreen