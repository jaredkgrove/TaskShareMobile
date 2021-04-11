import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export type RootStackParamList = {
    Home: undefined;
    Profile: { userId: string };
    ActiveList: undefined;
  };

export type RouteParamProps<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList,T>;
    route: RouteProp<RootStackParamList, T>;
}

export interface User{
  displayName:string|null
  emailAddress:string|null,
  emailVerified:boolean,
  googleUserUID:string|null,
}

export interface TaskList{
  firestoreId: string;
  title: string;
  userId: string;
  etag?: string;
  googleTaskLink?: string;
  googleId?: string;
  // updated: string;
}

export interface Task{
  firestoreId: string|null;
  status: TaskStatus;
  title: string;
  // updated: string;
  due?: string;
  etag?: string;
  kind?: string;
  position?: string;
  googleTaskLink?: string;
  googleId?: string;
}

export enum TaskStatus {
  needsAction = "needsAction",
  completed = "completed",
}

export interface ActiveList {
  data:TaskList|null;
  tasks:Task[];
}

export interface CreateTaskList {
  title: string
}

export interface CreateTask {
  // status: string,
  title: string,
  // completedDate: null
}