import React from 'react';
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { Svg, Rect, Path } from 'react-native-svg';
import { withExpoSnack, styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(TouchableOpacity);
const StyledSvg = styled(Svg);
const StyledRect = styled(Rect, { classProps: ['fill', 'stroke'] });
const StyledImage = styled(Image);

const TopNav = () => {
  return (
    <StyledView className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <StyledView className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <StyledSvg
          //className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <Path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
        </StyledSvg>
        <StyledText className="text-lg font-semibold text-gray-700 dark:text-gray-300">Bank Invoice</StyledText>
        <StyledSvg
          //className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <Path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
        </StyledSvg>
      </StyledView>
    </StyledView>
  );
};

export default withExpoSnack(TopNav);
