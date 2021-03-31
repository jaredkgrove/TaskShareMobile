import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
import { RouteParamProps} from '../types'
import { StackNavigationProp } from '@react-navigation/stack';

const HomeScreen = (props:RouteParamProps<'Home'>) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate('Details')}
      />
    </View>
  );
}

export default HomeScreen