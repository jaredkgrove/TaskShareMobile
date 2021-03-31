import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import {rootReducer, RootState} from './rootReducer'


const store = configureStore({
    reducer: rootReducer,
    // middleware: getDefaultMiddleware =>
    // getDefaultMiddleware({
    // //   serializableCheck: {
    // //     ignoredActions: [
    // //       // just ignore every redux-firebase and react-redux-firebase action type
    // //       ...Object.keys(rfConstants.actionTypes).map(
    // //         type => `${rfConstants.actionsPrefix}/${type}`
    // //       ),
    // //       ...Object.keys(rrfActionTypes).map(
    // //         type => `@@reactReduxFirebase/${type}`
    // //       )
    // //     ],
    // //     ignoredPaths: ['firebase', 'firestore']
    // //   },
    //   thunk: {
    //     extraArgument: {
    //       firestore
    //     }
    //   }
    // }),
})

export type AppDispatch = typeof store.dispatch
// export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useReduxDispatch = () => useDispatch<AppDispatch>()
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector
export default store