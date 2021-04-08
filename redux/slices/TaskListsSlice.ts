import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { TaskList } from '../../types'



const initialState:TaskList[] = []

const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState: initialState,
    reducers: {
        setTaskLists: (state, {payload}) => payload,
    },
})

export const { setTaskLists } = taskListsSlice.actions
export default taskListsSlice.reducer