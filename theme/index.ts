import { extendTheme, type ThemeOverride } from '@chakra-ui/react';

import color from './color';
import { Button } from './components';

const theme: ThemeOverride = {
  color,
  components: {
    Button,
  },
};

export default extendTheme(theme);
