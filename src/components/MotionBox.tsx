import { Box } from '@chakra-ui/react';

import { motion } from 'framer-motion';

import type { BoxProps } from '@chakra-ui/react';
import type { AnimationLifecycles, AnimationProps, LayoutProps, MotionStyle } from 'framer-motion';

// as reference to https://chakra-ui.com/getting-started/with-framer
const MotionBox = motion<Omit<BoxProps, 'transition' | 'style'>>(Box);

export type MotionBoxProps = Omit<
  BoxProps,
  'style' | 'transition' | 'animation' | 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
> &
  AnimationProps & { style?: MotionStyle } & AnimationLifecycles &
  LayoutProps &
  Pick<BoxProps, 'onAnimationStart'>;

export default MotionBox;
