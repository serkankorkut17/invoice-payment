import BottomNav from '../components/BottomNav';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { Appbar } from 'react-native-paper';
const TopBar = () => (
  <Appbar.Header>
      <Appbar.Action icon="account" onPress={() => {}} />
      <Appbar.Content title="Admin Invoice Registration" />
      <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
);


const AdminScreen = ({navigation}) => {
  return (
    <>
      <TopBar />
      <Text>Admin Screen</Text>
      <BottomNav navigation={navigation}/>
    </>
  );
};

export default AdminScreen;
