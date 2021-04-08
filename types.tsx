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
  etag?: string;
  id: string;
  kind: string;
  selfLink: string;
  title: string;
  updated: string;
  userId: string;
}

export interface Task{
  firestoreId: string|null;
  due: string|null;
  etag: string;
  id: string;
  kind: string;
  position: string;
  selfLink: string;
  status: string;
  title: string;
  updated: string;
}

export interface ActiveList {
  data:TaskList|null;
  tasks:Task[];
}