import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { CreateTask, CreateTaskList, TaskList, TaskStatus, User } from '../../types';
import * as GoogleSignIn from 'expo-google-sign-in';
import { setTaskLists } from '../../redux/slices/TaskListsSlice'
import {AppDispatch} from '../../redux/store'

//CREATE ACTIONS

export const createTaskList = (list: CreateTaskList) => {
    firestore().collection('taskLists').add({userId:currentUserId(), ...list})
}

export const createTask = (list: TaskList|null, task: CreateTask) => {
    if(list){
        firestore().collection('taskLists').doc(list.firestoreId).collection('tasks').add({userId: currentUserId(), status: TaskStatus.needsAction, completedDate: null, ...task})
    }
}

export const createUser = async (userState:FirebaseAuthTypes.User, googleUser:GoogleSignIn.GoogleUser|null) => {
    await firestore().collection('users').doc(userState.uid).set({emailAddress: userState.email, displayName: userState.displayName, emailVerified: userState.emailVerified, googleUserUID: userState.providerData[0].uid})//maybe bad? sorry future self
    console.log("gu ",googleUser)
    if(googleUser){
        await firestore().collection('users').doc(userState.uid).collection('googleUsers').doc(googleUser.uid).set({
            displayName: googleUser.displayName,
            tasksAccessToken: googleUser.auth?.accessToken,
            tasksRefreshToken: googleUser.auth?.refreshToken,//I don't think this is used
            email: googleUser.email
        })
    }
}

//HELPERS
export const currentUserId = () => {
    let id = auth().currentUser?.uid//Does this work offline?
    if(!id){
        //TODO: logout
    }
    return id
}


//SUBSCRIPTIONS
export const subscribeToUserLists = (dispatch:AppDispatch) => firestore().collection(`taskLists`).where("userId", "==", currentUserId()).onSnapshot((querySnapshot) => {
    let lists:any[] = []
    querySnapshot.forEach((doc) => {                        
      lists.push({firestoreId: doc.id, ...doc.data()})
    })
    dispatch(setTaskLists(lists))
  });