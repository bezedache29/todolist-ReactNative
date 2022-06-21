import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';

import TodoListStack from './TodoListStack';
import AuthStack from './AuthStack';

const Tabs = createBottomTabNavigator()

const iconList = require('../assets/icons/tabs/list.png')
const iconProfil = require('../assets/icons/tabs/user.png')

export default function AppRouter() {

  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
        <Tabs.Screen 
          name="tab-todolist"
          component={TodoListStack}
          options={{ 
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={iconList}
                  resizeMode='contain'
                  style={{ width: 25, height: 25, tintColor: focused ? '#028302' : '#748c94' }}
                />
                <Text style={{ color: focused ? '#028302' : '#748c94', fontSize: 12 }}>TODO-LIST</Text>
              </View>
            )
          }}
        />
        
        <Tabs.Screen 
            name="tab-profil"
            component={AuthStack}
            options={{ 
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={iconProfil}
                    resizeMode='contain'
                    style={{ width: 25, height: 25, tintColor: focused ? '#028302' : '#748c94' }}
                  />
                  <Text style={{ color: focused ? '#028302' : '#748c94', fontSize: 12 }}>PROFILE</Text>
                </View>
              )
            }}
          />
      </Tabs.Navigator>
    </NavigationContainer>
  )
}