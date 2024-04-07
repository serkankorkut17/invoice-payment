import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import {Svg, Rect, Path } from "react-native-svg";
import { withExpoSnack, styled } from "nativewind";

const StyledView = styled(View);
const StyledButton = styled(TouchableOpacity);
const StyledSvg = styled(Svg);

const StyledRect = styled(Rect, { classProps: ["fill", "stroke"] });


const BottomNav = () => {
  return (
    <StyledView className="absolute bottom-0 right-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <StyledView className="flex flex-row flex-wrap h-full max-w-lg mx-auto font-medium">
        <StyledButton
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onPress={() => Alert.alert("Simple Button pressed")}
        >
          {/* <StyledSvg
            className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <Path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </StyledSvg> */}
          <Svg height="20" width="20" viewBox="0 0 20 20" fill="currentColor">
            <Path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </Svg>

        </StyledButton>
        <StyledButton
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onPress={() => Alert.alert("Simple Button pressed")}
        >
          <StyledSvg
            //className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <Path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
            <Path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
          </StyledSvg>
        </StyledButton>
        <StyledButton
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onPress={() => Alert.alert("Simple Button pressed")}
        >
          <StyledSvg
            //className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <Path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
            />
          </StyledSvg>
        </StyledButton>
        <StyledButton
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onPress={() => Alert.alert("Simple Button pressed")}
        >
          <StyledSvg
            //className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <Path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </StyledSvg>
        </StyledButton>
      </StyledView>
    </StyledView>
  );
};

export default withExpoSnack(BottomNav);
