import React from 'react';
import {useState, useEffect} from 'react'

import { Button, Text, TextInput, FlatList, View, StyleSheet } from 'react-native';

import firestore from '@react-native-firebase/firestore';


import { useReduxDispatch, useReduxSelector } from '../redux/store'
 
import { RouteParamProps, TaskList} from '../types'
import { StackNavigationProp } from '@react-navigation/stack';
import { setActiveList } from '../redux/slices/ActiveListSlice'
import { CreateTaskList, createTaskList } from '../api/firebase/FirestoreAPI';

import {subscribeToUserLists} from '../api/firebase/FirestoreAPI'
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

  // const listTaskLists = () => taskLists.map(tl => <Text key={tl.firestoreId} onPress={() => goToTaskList(tl)}>{tl.title}</Text>)
  const renderItem = ({item}:{item: TaskList}) => <TaskListItem taskList={item} onPress={goToTaskList}/>//<Text key={item.firestoreId} onPress={() => goToTaskList(item)}>{item.title}</Text>

  useEffect(() => {
    const subscriber = subscribeToUserLists(dispatch)
    return subscriber
  }, []);

  useEffect(() => {
    console.log("taskLists ",taskLists)
  }, [taskLists]);

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
    // style={styles.container}
    data={taskLists}
    renderItem={renderItem}
    keyExtractor={item => item.firestoreId}
    />
    </>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  }
});
