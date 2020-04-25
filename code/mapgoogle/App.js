import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screen/Home';
import Date from './screen/Date';
import Initial from './screen/Initial';
import Search from './screen/Search';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
<NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen options={{headerShown: false}} name="Date" component={Date} />
	<Stack.Screen options={{headerShown: false}} name="Initial" component={Initial} />
	<Stack.Screen options={{headerShown: false}} name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}