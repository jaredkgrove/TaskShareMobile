import { createSlice } from '@reduxjs/toolkit'
import { ActiveList } from '../../types'



const initialState: ActiveList = {data:null, tasks:[]}

const activeListSlice = createSlice({
    name: 'activeList',
    initialState,
    reducers: {
        setActiveList: (state, {payload}) =>  {
            state.data= payload
            state.tasks = []
        },
        setTasks: (state, {payload}) => {
            console.log("tasks ", payload)
            state.tasks = payload
        },
        addTask: (state, {payload}) =>  {
            state.tasks.push(payload)
        }
    },
})

export const { setActiveList, setTasks } = activeListSlice.actions
export default activeListSlice.reducer