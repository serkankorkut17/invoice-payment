import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { withExpoSnack } from 'nativewind';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const HomeScreen = () => {
  return (
    <StyledView className="h-full flex justify-center items-center bg-orange-300">
      <StyledText className="text-xl text-red-600">Open up App.js to start working on your app!</StyledText>
      <StatusBar />
    </StyledView>
  );
}

export default withExpoSnack(HomeScreen);