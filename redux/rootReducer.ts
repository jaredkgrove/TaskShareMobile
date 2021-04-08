import { TaskList, ActiveList } from '../types'
import { User } from '../types'

import activeListReducer from './slices/ActiveListSlice'
import taskListsReducer from './slices/TaskListsSlice'
import userReducer from './slices/UserSlice'

//redux toolkit just needs the reducers in an object so no need for combineReducers
export interface RootState {
    activeList: ActiveList,
    taskLists: TaskList[],
    user: User
}

export const rootReducer = {
    activeList: activeListReducer,
    taskLists: taskListsReducer,
    user: userReducer,
}
