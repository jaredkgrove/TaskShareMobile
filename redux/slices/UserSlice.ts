import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { User } from '../../types';

const initialState: User = {emailAddress: null, emailVerified: false, displayName: null, googleUserUID:null}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, {payload}: PayloadAction<User>) => payload,
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer