import {
  DeepPartial,
  extendTheme,
  ThemeConfig,
  type ThemeOverride,
} from '@chakra-ui/react';

import color from './color';
import { Button } from './components';

// all use dark mode
const config: DeepPartial<ThemeConfig> = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme: ThemeOverride = {
  color,
  config,
  components: {
    Button,
  },
};

export default extendTheme(theme);
