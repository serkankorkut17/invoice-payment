import BottomNav from '../components/BottomNav';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { Appbar } from 'react-native-paper';
const TopBar = () => (
  <Appbar.Header>
      <Appbar.Action icon="account" onPress={() => {}} />
      <Appbar.Content title="Invoice Manager" />
      <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
);


const HomeScreen = () => {
  return (
    <>
      <TopBar />
      <Text>Home Screen</Text>
      <BottomNav />
    </>
  );
};

export default HomeScreen;
