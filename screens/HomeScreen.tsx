import React from 'react';
import {useState, useEffect} from 'react'

import { Button, Text, TextInput, FlatList, View, StyleSheet } from 'react-native';

import firestore from '@react-native-firebase/firestore';


import { useReduxDispatch, useReduxSelector } from '../redux/store'
 
import { RouteParamProps, TaskList} from '../types'
import { StackNavigationProp } from '@react-navigation/stack';
import { setActiveList } from '../redux/slices/ActiveListSlice'
import { CreateTaskList } from '../types';
import {createTaskList, subscribeToUserLists} from '../api/firebase/FirestoreAPI'
import TaskListItem from '../components/TaskListItem';

const HomeScreen = ({navigation}:RouteParamProps<'Home'>) => {
  const [newList, setNewList] = useState<CreateTaskList>({title: ''})

  //APP STATE
  const taskLists = useReduxSelector(state => state.taskLists);
  const dispatch = useReduxDispatch()

  const goToTaskList = (list:TaskList) => {
    dispatch(setActiveList(list))
    navigation.navigate('ActiveList')
  }

  const renderItem = ({item}:{item: TaskList}) => <TaskListItem taskList={item} onPress={goToTaskList}/>

  useEffect(() => {
    const subscriber = subscribeToUserLists(dispatch)
    return subscriber
  }, []);

  return (
    <>
      <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setNewList({title: text})}
          value={newList.title}
      />
      <Button
        title="New"
        onPress={() => createTaskList(newList)}
      />
   
      <FlatList 
        style={styles.container}
        data={taskLists}
        renderItem={renderItem}
        keyExtractor={item => item.firestoreId}
      />
    </>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#ECF0F3'
  },
  shadowStyle: { 
    shadowOpacity: 1,
    backgroundColor: '#ECF0F3',
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textShadow: {
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },

});