import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

    export const authChanged = 
        createAsyncThunk(
            "authChanged",
            async (userState:FirebaseAuthTypes.User | null, thunkAPI) => {
                try{
                    let user:any
                    if(userState){
                        // await firestore()
                        //   .collection("users")
                        //   .doc(userState.uid)
                        //   .set({
                        //     id: userState.uid,
                        //     emailAddress: userState.email,
                        //     verified: userState.emailVerified,
                        //   });
                        await firestore()
                          .collection("users")
                          .doc(userState.uid).get().then((doc) => {
                            if(doc.exists){
                                user=doc.data()
                            }else{
                                console.log("User does not exist")
                            }
                          })
                      }
                    return user
                }catch (error){
                    console.log(error) 
                }

            }
        )

export interface User{
    emailAddress:string|null,
    id:string|null,
    verified:boolean
}

const initialState: User = {emailAddress: null, id: null, verified:false}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add: (state, {payload}: PayloadAction<User>) => {payload},
    },
    extraReducers:{
        [authChanged.fulfilled.type]: (state, action) => {
            console.log('my new user is ', action.payload)
            return action.payload//differjewaofijsdo
        },
        [authChanged.pending.type]: (state, action) => {
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

export const { add } = userSlice.actions
export default userSlice.reducer