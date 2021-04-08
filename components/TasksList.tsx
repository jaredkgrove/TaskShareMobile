import { Button, Text, TextInput } from 'react-native'
import {useState, useEffect} from 'react'
import React from 'react'
import {Task} from '../types'

interface TasksListProps {
    tasks: Task[]
}

const TasksList = ({tasks}: TasksListProps): React.ReactElement => {
    
    const displayTasks = () => tasks.map(t => <Text key={t.firestoreId}>{t.title}</Text>)

    return (
        <>
            {displayTasks()}
        </>

    )
}
export default TasksList