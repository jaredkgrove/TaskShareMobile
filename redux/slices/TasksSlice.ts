import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

    export const fetchTasks = 
        createAsyncThunk(
            "fetchTasks",
            async (thunkAPI) => {
                console.log(2)
                try{
                    console.log("my ucrrent sl ",auth().currentUser)
                    let tasks:any[] = []
                    await firestore().collection(`tasks`).where("userID", "==", auth().currentUser?.uid).get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            console.log('DOC.DATA ', doc.data())
                            tasks.push(doc.data())
                        })
                    })

                    return tasks
                }catch (error){
                    console.log(error) 
                }

            }
        )

export interface Task{
    Due: string;
    Etag: string;
    ID: string;
    Kind: string;
    Position: string;
    SelfLink: string;
    Status: string;
    Title: string;
    Updated: string;
    userID: string;
}

const initialState: Task[] = [] 

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        add: (state, {payload}: PayloadAction<Task>) => {state.push(payload)},
    },
    extraReducers:{
        [fetchTasks.fulfilled.type]: (state, action) => {
            console.log('paload ', action.payload)
            state.push(action.payload[0])//differjewaofijsdo
        },
        [fetchTasks.pending.type]: (state, action) => {
            // state.num
        }
    }
    // (builder) => {
    //     builder
    //       .addCase(fetchTasks.fulfilled, (state, action) => {
    //         console.log('s ',state)
    //         console.log('a ',action)
    //       })
})

export const { add } = tasksSlice.actions
export default tasksSlice.reducer