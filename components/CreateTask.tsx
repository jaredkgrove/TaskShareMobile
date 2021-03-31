import { Button, Text, TextInput } from 'react-native'
import {useState, useEffect} from 'react'
import React from 'react'

import { add, fetchTasks } from '../redux/slices/TasksSlice'
// import fetchTasks from '../redux/slices/TasksSlice'
// import fetchTasks from '../redux/slices/TasksSlice'
import { useReduxDispatch, useReduxSelector } from '../redux/store'
import {Task} from '../redux/slices/TasksSlice'

const CreateTask = (): React.ReactElement => {
    // const [value, setValue] = useState<Task>({Title:''});
    const [value, setValue] = useState<boolean>(false);
    const tasks = useReduxSelector(state => state.tasks);
    const dispatch = useReduxDispatch()

    const displayTasks = () => tasks.map(t => <Text key={t.Title}>{t.Title}</Text>)

    useEffect(() => {
        dispatch<any>(fetchTasks());//need userid here
        // setValue(true)
    }, []);

    useEffect(() => {
        console.log('sdlfjweofjewiofkxcnvosdfjspdfjasdoifjkznv ', tasks)
    }, [tasks]);
    return (
        <>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                // onChangeText={text => setValue({name: 'tom', desc:text})}
                // value={value.Title}
            />
            <Button
                title="Create"
                onPress={()=>{setValue(true)}}
                // onPress={() => {dispatch(add(value)); setValue({name:'', desc:''})}}
            />

            {displayTasks()}
        </>

    )
}
export default CreateTask