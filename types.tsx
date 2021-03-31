import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export type RootStackParamList = {
    Home: undefined;
    Profile: { userId: string };
    Details: undefined;
  };

export type RouteParamProps<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList,T>;
    route: RouteProp<RootStackParamList, T>;
}