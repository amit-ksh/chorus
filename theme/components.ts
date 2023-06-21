import { ComponentStyleConfig, cssVar, DeepPartial } from '@chakra-ui/react';

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

const $startColor = cssVar('skeleton-start-color');
const $endColor = cssVar('skeleton-end-color');
export const Skeleton: DeepPartial<ComponentStyleConfig> = {
  baseStyle: {
    [$startColor.variable]: 'gray.600',
    [$endColor.variable]: 'gray.900',
  },
};

export const Alert: DeepPartial<ComponentStyleConfig> = {
  variants: {
    solid: (props) => {
      const { colorScheme: c } = props;

      return {
        container: {
          bg: `${c}.500`,
          color: 'white',
        },
        icon: {
          color: 'white',
        },
      };
    },
  },
};
