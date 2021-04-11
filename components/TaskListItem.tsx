import { Button, Text, TextInput, View, StyleSheet } from 'react-native'
import {useState, useEffect} from 'react'
import React from 'react'
import {RootStackParamList, RouteParamProps, TaskList} from '../types'

import { Animated } from 'react-native';
import { Neomorph  } from 'react-native-neomorph-shadows';

import { useReduxDispatch, useReduxSelector } from '../redux/store'
import { setActiveList } from '../redux/slices/ActiveListSlice'
import { StackNavigationProp } from '@react-navigation/stack'


interface TasksListProps {
    taskList: TaskList,
    onPress: (taskList:TaskList)=>void
}

const TaskListItem = ({taskList, onPress}: TasksListProps) => {
    const [margin, setMargin] = useState(10)
    const AnimatedNeomorph = Animated.createAnimatedComponent(Neomorph);
    return (
        <>
        {/* <AnimatedNeomorph 
         inner// <- enable inner shadow
        
        swapShadows 

        lightShadowColor='white'
        darkShadowColor='black'
       style={{
          shadowOpacity:0.6,
  
          shadowRadius: 2,
          borderRadius: 8,
          backgroundColor: '#ECF0F3',
          width: 300,
          height: 25,
           
        }}
      > */}

       <Text key={taskList.firestoreId} style={styles.textShadow} onPress={() => onPress(taskList)}>{taskList.title.toUpperCase()}</Text>


</>

    )
}
export default TaskListItem

// const styles = StyleSheet.create({
//     item: {
        
//         padding: 1,
//         margin: 50,
//         borderWidth: 1,
//         borderColor:'#FFFFFF',
//         borderRadius: 7,
//         elevation: 2,
//     },

//   });
  
  const styles = StyleSheet.create({

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
      color: 'rgb(168, 167, 167)'
    },
    textShadow2: {
        opacity:1,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        color: '#07d100',
        textShadowColor: 'rgba(7, 209, 0,1)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 2
      },
  
  });