import { FC, ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';

interface GradientLayoutProps extends BoxProps {
  children: ReactNode;
  gradient: string;
}

const GradientLayout: FC<GradientLayoutProps> = ({
  gradient,
  children,
  ...rest
}) => {
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box
      pb={activeSong ? '10vh' : 0}
      minH="89.4vh"
      h="full"
      overflowY="auto"
      background="gray.800"
      bgGradient={gradient}
      {...rest}
    >
      <Box>{children}</Box>
    </Box>
  );
};

export default GradientLayout;
