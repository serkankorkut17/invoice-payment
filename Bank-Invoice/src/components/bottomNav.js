import * as React from 'react';
import { BottomNavigation, Text, useTheme } from 'react-native-paper';

const BottomNav = ({ navigation }) => {
  const HomeRoute = () => <Text> Home </Text>;
  const HistoryRoute = () => <Text>History</Text>;
  const RecentsRoute = () => <Text>Recents</Text>;
  const AccountRoute = () => <Text>Account</Text>;

  // const HomeRoute = () => navigation.navigate('Home');
  // const HistoryRoute = () => navigation.navigate('PaymentHistory');
  // const RecentsRoute = () => navigation.navigate('Home');
  // const AccountRoute = () => navigation.navigate('Admin');

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    { key: 'history', title: 'History', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    {
      key: 'account',
      title: 'Account',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    history: HistoryRoute,
    recents: RecentsRoute,
    account: AccountRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNav;
