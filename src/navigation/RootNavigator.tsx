import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import DetailsScreen from '../screens/movie-details/MovieDetails';
import SearchScreen from '../screens/movie-search/MovieSearch';

export type RootStackParamList = {
  Search: undefined;
  Details: {
    movieId: number;
  };
};

const Stack = createStackNavigator<RootStackParamList>();
export type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const options = {
  headerShown: false,
  contentStyle: {
    backgroundColor: 'black',
  },
};

const RootNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={options}>
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default RootNavigator;
