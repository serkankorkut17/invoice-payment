import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';

const StyledView = styled(View);
const StyledText = styled(Text);

const HomeScreen = () => {
  return (
    <StyledView className="h-full flex justify-center items-center">
      {/* <TopNav /> */}
      <StyledText className="text-xl text-red-600">Open up App.js to start working on your app!</StyledText>
      <BottomNav />
    </StyledView>
  );
}

export default withExpoSnack(HomeScreen);