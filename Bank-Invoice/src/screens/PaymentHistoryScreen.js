import BottomNav from '../components/BottomNav';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { Appbar } from 'react-native-paper';
const TopBar = () => (
  <Appbar.Header>
      <Appbar.Action icon="arrow-left" onPress={() => {}} />
      <Appbar.Content title="Payment History" />
      <Appbar.Action icon="menu" onPress={() => {}} />
  </Appbar.Header>
);


const PaymentHistoryScreen = () => {
  return (
    <>
      <TopBar />
      <Text>Payment History Screen</Text>
      <BottomNav />
    </>
  );
};

export default PaymentHistoryScreen;
