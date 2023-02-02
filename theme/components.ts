import type { ComponentStyleConfig, DeepPartial } from '@chakra-ui/react';

export const Button: DeepPartial<ComponentStyleConfig> = {
  baseStyle: {
    _focusVisible: {
      boxShadow: '0 0 0 3px var(--chakra-colors-green-400)',
    },
  },
};
