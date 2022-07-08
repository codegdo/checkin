import React, { useContext } from 'react';
import { View } from 'react-native';

import { ThemeContext } from '../../contexts';
import { cssStyle } from '../../utils';
import { FormRender } from './form.render';
import { BlockProps } from './form.type';

export const Block: React.FC<BlockProps> = ({ className = 'block', children, ...props }) => {
  const { styles } = useContext(ThemeContext);
  const block = cssStyle(className, styles);

  return <View style={block}>
    <>
      {
        children ? children : <FormRender data={props} />
      }
    </>
  </View>
}