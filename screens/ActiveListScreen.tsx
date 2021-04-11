import React from 'react';
import {useState, useEffect} from 'react'

import { View, Text, Button, TextInput } from 'react-native';

import TasksList from '../components/TasksList'
import { useReduxDispatch, useReduxSelector } from '../redux/store'
import { setTasks } from '../redux/slices/ActiveListSlice'

import firestore from '@react-native-firebase/firestore';
import { createTask } from '../api/firebase/FirestoreAPI';
import { CreateTask, TaskStatus } from '../types'
const ActiveListScreen = () => {
  const [newTask, setNewTask] = useState<CreateTask>({title: ''})

  const listData = useReduxSelector(state => state.activeList.data);
  const tasks = useReduxSelector(state => state.activeList.tasks);
  const currentUser = useReduxSelector(state => state.user);
  const dispatch = useReduxDispatch()


  useEffect(() => {
    let subscriber;
    if(listData && tasks.length === 0){
        subscriber = firestore().collection("taskLists").doc(listData.firestoreId?.toString()).collection('tasks').onSnapshot((querySnapshot) => {
          let tasks:any[] = []
          querySnapshot.forEach((doc) => {                        
            tasks.push({firestoreId: doc.id, ...doc.data()})
          })
          dispatch(setTasks(tasks))
        });

    }
    return subscriber
  }, [listData]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Task List Name: {listData?.title}</Text>
      <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setNewTask({title: text})}
                value={newTask.title}
          />
          <Button
            title="New"
            onPress={() => createTask(listData, newTask)}
          />
        <TasksList tasks={tasks}/>
        
    </View>
  );
}

export default ActiveListScreen