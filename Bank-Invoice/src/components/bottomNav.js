import * as React from 'react';
import { BottomNavigation, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const BottomNav = () => {
  const navigation = useNavigation();
  console.log(navigation.getState());

  // Define the routes for the bottom navigation
  const HomeRoute = () => <Text>Home</Text>;
  const HistoryRoute = () => <Text>History</Text>;
  const RecentsRoute = () => <Text>Recents</Text>;
  const AccountRoute = () => <Text>Account</Text>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'history',
      title: 'History',
      focusedIcon: 'album',
      unfocusedIcon: 'album',
    },
    {
      key: 'recents',
      title: 'Recents',
      focusedIcon: 'history',
      unfocusedIcon: 'history',
    },
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

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    // Navigate to the corresponding screen when a route is selected
    if (newIndex === 0) {
      navigation.navigate('Home');
    } else if (newIndex === 1) {
      navigation.navigate('PaymentHistory');
    } else if (newIndex === 2) {
      navigation.navigate('Admin');
    }
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
    />
  );
};

export default BottomNav;
