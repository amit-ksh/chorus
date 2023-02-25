import type { ComponentStyleConfig, DeepPartial } from '@chakra-ui/react';

export const Button: DeepPartial<ComponentStyleConfig> = {
  baseStyle: {
    _focusVisible: {
      boxShadow: '0 0 0 3px var(--chakra-colors-purple-400)',
    },
  },
};

export const Tabs: DeepPartial<ComponentStyleConfig> = {
  baseStyle: {
    tab: {
      _focusVisible: {
        boxShadow: '0 0 0 3px var(--chakra-colors-purple-400)',
      },
    },
  },
  defaultProps: {
    variant: 'solid-rounded',
    colorScheme: 'purple',
  },
};
