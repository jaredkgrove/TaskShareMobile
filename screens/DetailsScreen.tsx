import React from 'react';
import { View, Text } from 'react-native';

import CreateTask from '../components/CreateTask'

const DetailsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
        <CreateTask/>
    </View>
  );
}

export default DetailsScreen