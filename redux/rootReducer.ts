import { Task } from './slices/TasksSlice'
import { User } from './slices/UserSlice'
import tasksReducer from './slices/TasksSlice'
import userReducer from './slices/UserSlice'

//redux toolkit just needs the reducers in an object so no need for combineReducers
export interface RootState {
    tasks: Task[],
    user: User
}

export const rootReducer = {
    tasks: tasksReducer,
    user: userReducer
}
