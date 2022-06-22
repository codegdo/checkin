import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useStyle } from '../../hooks';
import { StyledStatusBar } from '../element/status-bar.component';

type ContainerProps = {
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ className = 'container', children }) => {
  const [wrapper] = useStyle('wrapper');
  const [container] = useStyle(className);

  return <>
    <StyledStatusBar />
    <SafeAreaView style={wrapper}>
      <View style={container}>
        <>{children}</>
      </View>
    </SafeAreaView>
  </>
}