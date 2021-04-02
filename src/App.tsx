import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PracticeComponent } from './app/practice/PracticeComponent';
import { HomeComponent } from './app/home/HomeComponent';
import { BreathingComponent } from './app/session/BreathingComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PracticeStack = createStackNavigator();

const PracticeStackScreen = () => (
  <PracticeStack.Navigator>
    <PracticeStack.Screen
      name="Practice"
      component={PracticeComponent}
      options={{
        headerStyle: {
          backgroundColor: '#1976D2',
        },
        title: 'Practice',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
    <PracticeStack.Screen name="Breathing" component={BreathingComponent} />
  </PracticeStack.Navigator>
);

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeComponent}
      options={{
        headerStyle: {
          backgroundColor: '#1976D2',
        },
        title: 'Home',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  </HomeStack.Navigator>
);

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route: { name } }) => ({
          tabBarIcon: ({ focused, color, size = 25 }) => {
            let iconName = 'browsers';

            if (name === 'Home') {
              iconName = 'ios-clock-outline';
            } else if (name === 'Practice') {
              iconName = `ios-stopwatch${focused ? '' : '-outline'}`;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Practice" component={PracticeStackScreen} />
        <Tab.Screen name="Statistics" component={PracticeComponent} />
        <Tab.Screen name="Community" component={PracticeComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
