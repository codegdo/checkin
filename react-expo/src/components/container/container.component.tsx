import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useStyle } from '../../hooks';

type ContainerProps = {
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ className = 'container', children }) => {
  const [wrapper] = useStyle('wrapper');
  const [container] = useStyle(className);

  return <SafeAreaView style={wrapper}>
    <View style={container}>
      <>{children}</>
    </View>
  </SafeAreaView>
}