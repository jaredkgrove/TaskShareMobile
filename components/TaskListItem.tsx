import { Button, Text, TextInput, View, StyleSheet } from 'react-native'
import {useState, useEffect} from 'react'
import React from 'react'
import {RootStackParamList, RouteParamProps, TaskList} from '../types'

import { useReduxDispatch, useReduxSelector } from '../redux/store'
import { setActiveList } from '../redux/slices/ActiveListSlice'
import { StackNavigationProp } from '@react-navigation/stack'


interface TasksListProps {
    taskList: TaskList,
    onPress: (taskList:TaskList)=>void
}

const TaskListItem = ({taskList, onPress}: TasksListProps) => {
    return (

            <Text key={taskList.firestoreId} style={styles.item} onPress={() => onPress(taskList)}>sdf{taskList.title}

            </Text>


    )
}
export default TaskListItem

const styles = StyleSheet.create({
    item: {
        
        padding: 1,
        margin: 50,
        borderWidth: 1,
        borderColor:'#FFFFFF',
        borderRadius: 7,
        elevation: 2,
    },

  });
  