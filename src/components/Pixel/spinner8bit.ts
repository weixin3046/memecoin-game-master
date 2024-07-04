import { keyframes } from '@chakra-ui/react';

export const spinner8bit = ({
  period = 1,
  size,
  color = '#000',
}: {
  period?: number;
  size: number;
  color?: string;
}) =>
  `${keyframes`
  0% {
    box-shadow:
      0px -${size * 3}px ${color},
      ${size * 1}px -${size * 3}px ${color},
      ${size * 2}px -${size * 2}px ${color},
      ${size * 3}px -${size * 1}px ${color},
      ${size * 3}px 0px ${color},
      ${size * 3}px ${size * 1}px ${color},
      ${size * 2}px ${size * 2}px ${color},
      ${size * 1}px ${size * 3}px ${color},
      0px ${size * 3}px transparent,
      -${size * 1}px ${size * 3}px transparent,
      -${size * 2}px ${size * 2}px transparent,
      -${size * 3}px ${size * 1}px transparent,
      -${size * 3}px 0px transparent,
      -${size * 3}px -${size * 1}px transparent,
      -${size * 2}px -${size * 2}px transparent,
      -${size * 1}px -${size * 3}px transparent;
  }
  6.25% {
    box-shadow:
      0px -${size * 3}px transparent,
      ${size * 1}px -${size * 3}px ${color},
      ${size * 2}px -${size * 2}px ${color},
      ${size * 3}px -${size * 1}px ${color},
      ${size * 3}px 0px ${color},
      ${size * 3}px ${size * 1}px ${color},
      ${size * 2}px ${size * 2}px ${color},
      ${size * 1}px ${size * 3}px ${color},
      0px ${size * 3}px ${color},
      -${size * 1}px ${size * 3}px transparent,
      -${size * 2}px ${size * 2}px transparent,
      -${size * 3}px ${size * 1}px transparent,
      -${size * 3}px 0px transparent,
      -${size * 3}px -${size * 1}px transparent,
      -${size * 2}px -${size * 2}px transparent,
      -${size * 1}px -${size * 3}px transparent;
  }
  12.5% {
    box-shadow:
      0px -${size * 3}px transparent,
      ${size * 1}px -${size * 3}px transparent,
      ${size * 2}px -${size * 2}px ${color},
      ${size * 3}px -${size * 1}px ${color},
      ${size * 3}px 0px ${color},
      ${size * 3}px ${size * 1}px ${color},
      ${size * 2}px ${size * 2}px ${color},
      ${size * 1}px ${size * 3}px ${color},
      0px ${size * 3}px ${color},
      -${size * 1}px ${size * 3}px ${color},
      -${size * 2}px ${size * 2}px transparent,
      -${size * 3}px ${size * 1}px transparent,
      -${size * 3}px 0px transparent,
      -${size * 3}px -${size * 1}px transparent,
      -${size * 2}px -${size * 2}px transparent,
      -${size * 1}px -${size * 3}px transparent;
  }
  18.75% {
    box-shadow:
      0px -${size * 3}px transparent,
      ${size * 1}px -${size * 3}px transparent,
      ${size * 2}px -${size * 2}px transparent,
      ${size * 3}px -${size * 1}px ${color},
      ${size * 3}px 0px ${color},
      ${size * 3}px ${size * 1}px ${color},
      ${size * 2}px ${size * 2}px ${color},
      ${size * 1}px ${size * 3}px ${color},
      0px ${size * 3}px ${color},
      -${size * 1}px ${size * 3}px ${color},
      -${size * 2}px ${size * 2}px ${color},
      -${size * 3}px ${size * 1}px transparent,
      -${size * 3}px 0px transparent,
      -${size * 3}px -${size * 1}px transparent,
      -${size * 2}px -${size * 2}px transparent,
      -${size * 1}px -${size * 3}px transparent;
  }
  25% {
    box-shadow:
      0px -${size * 3}px transparent,
      ${size * 1}px -${size * 3}px transparent,
      ${size * 2}px -${size * 2}px transparent,
      ${size * 3}px -${size * 1}px transparent,
      ${size * 3}px 0px ${color},
      ${size * 3}px ${size * 1}px ${color},
      ${size * 2}px ${size * 2}px ${color},
      ${size * 1}px ${size * 3}px ${color},
      0px ${size * 3}px ${color},
      -${size * 1}px ${size * 3}px ${color},
      -${size * 2}px ${size * 2}px ${color},
      -${size * 3}px ${size * 1}px ${color},
      -${size * 3}px 0px transparent,
      -${size * 3}px -${size * 1}px transparent,
      -${size * 2}px -${size * 2}px transparent,
      -${size * 1}px -${size * 3}px transparent;
  }
  31.25% {
    box-shadow:
      0px -${size * 3}px transparent,
      ${size * 1}px -${size * 3}px transparent,
      ${size * 2}px -${size * 2}px transparent,
      ${size * 3}px -${size * 1}px transparent,
      ${size * 3}px 0px transparent,
      ${size * 3}px ${size * 1}px ${color},
      ${size * 2}px ${size * 2}px ${color},
      ${size * 1}px ${size * 3}px ${color},
      0px ${size * 3}px ${color},
      -${size * 1}px ${size * 3}px ${color},
      -${size * 2}px ${size * 2}px ${color},
      -${size * 3}px ${size * 1}px ${color},
      -${size * 3}px 0px ${color},
      -${size * 3}px -${size * 1}px transparent,
      -${size * 2}px -${size * 2}px transparent,
      -${size * 1}px -${size * 3}px transparent;
  }
  37.5% {
    box-shadow:
      0px -${size * 3}px transparent,
      ${size * 1}px -${size * 3}px transparent,
      ${size * 2}px -${size * 2}px transparent,
      ${size * 3}px -${size * 1}px transparent,
      ${size * 3}px 0px transparent,
      ${size * 3}px ${size * 1}px transparent,
      ${size * 2}px ${size * 2}px ${color},
      ${size * 1}px ${size * 3}px ${color},
      0px ${size * 3}px ${color},
      -${size * 1}px ${size * 3}px ${color},
      -${size * 2}px ${size * 2}px ${color},
      -${size * 3}px ${size * 1}px ${color},
      -${size * 3}px 0px ${color},
      -${size * 3}px -${size * 1}px ${color},
      -${size * 2}px -${size * 2}px transparent,
      -${size * 1}px -${size * 3}px transparent;
  }
  43.75% {
    box-shadow:
      0px -${size * 3}px transparent,
      ${size * 1}px -${size * 3}px transparent,
      ${size * 2}px -${size * 2}px transparent,
      ${size * 3}px -${size * 1}px transparent,
      ${size * 3}px 0px transparent,
      ${size * 3}px ${size * 1}px transparent,
      ${size * 2}px ${size * 2}px transparent,
      ${size * 1}px ${size * 3}px ${color},
      0px ${size * 3}px ${color},
      -${size * 1}px ${size * 3}px ${color},
      -${size * 2}px ${size * 2}px ${color},
      -${size * 3}px ${size * 1}px ${color},
      -${size * 3}px 0px ${color},
      -${size * 3}px -${size * 1}px ${color},
      -${size * 2}px -${size * 2}px ${color},
      -${size * 1}px -${size * 3}px transparent;
  }
  50% {
    box-shadow:
      0px -${size * 3}px transparent,
      ${size * 1}px -${size * 3}px transparent,
      ${size * 2}px -${size * 2}px transparent,
      ${size * 3}px -${size * 1}px transparent,
      ${size * 3}px 0px transparent,
      ${size * 3}px ${size * 1}px transparent,
      ${size * 2}px ${size * 2}px transparent,
      ${size * 1}px ${size * 3}px transparent,
      0px ${size * 3}px ${color},
      -${size * 1}px ${size * 3}px ${color},
      -${size * 2}px ${size * 2}px ${color},
      -${size * 3}px ${size * 1}px ${color},
      -${size * 3}px 0px ${color},
      -${size * 3}px -${size * 1}px ${color},
      -${size * 2}px -${size * 2}px ${color},
      -${size * 1}px -${size * 3}px ${color};
  }
  56.25% {
    box-shadow:
      0px -${size * 3}px ${color},
      ${size * 1}px -${size * 3}px transparent,
      ${size * 2}px -${size * 2}px transparent,
      ${size * 3}px -${size * 1}px transparent,
      ${size * 3}px 0px transparent,
      ${size * 3}px ${size * 1}px transparent,
      ${size * 2}px ${size * 2}px transparent,
      ${size * 1}px ${size * 3}px transparent,
      0px ${size * 3}px transparent,
      -${size * 1}px ${size * 3}px ${color},
      -${size * 2}px ${size * 2}px ${color},
      -${size * 3}px ${size * 1}px ${color},
      -${size * 3}px 0px ${color},
      -${size * 3}px -${size * 1}px ${color},
      -${size * 2}px -${size * 2}px ${color},
      -${size * 1}px -${size * 3}px ${color};
  }
  62.5% {
    box-shadow:
      0px -${size * 3}px ${color},
      ${size * 1}px -${size * 3}px ${color},
      ${size * 2}px -${size * 2}px transparent,
      ${size * 3}px -${size * 1}px transparent,
      ${size * 3}px 0px transparent,
      ${size * 3}px ${size * 1}px transparent,
      ${size * 2}px ${size * 2}px transparent,
      ${size * 1}px ${size * 3}px transparent,
      0px ${size * 3}px transparent,
      -${size * 1}px ${size * 3}px transparent,
      -${size * 2}px ${size * 2}px ${color},
      -${size * 3}px ${size * 1}px ${color},
      -${size * 3}px 0px ${color},
      -${size * 3}px -${size * 1}px ${color},
      -${size * 2}px -${size * 2}px ${color},
      -${size * 1}px -${size * 3}px ${color};
  }
  68.75% {
    box-shadow:
      0px -${size * 3}px ${color},
      ${size * 1}px -${size * 3}px ${color},
      ${size * 2}px -${size * 2}px ${color},
      ${size * 3}px -${size * 1}px transparent,
      ${size * 3}px 0px transparent,
      ${size * 3}px ${size * 1}px transparent,
      ${size * 2}px ${size * 2}px transparent,
      ${size * 1}px ${size * 3}px transparent,
      0px ${size * 3}px transparent,
      -${size * 1}px ${size * 3}px transparent,
      -${size * 2}px ${size * 2}px transparent,
      -${size * 3}px ${size * 1}px ${color},
      -${size * 3}px 0px ${color},
      -${size * 3}px -${size * 1}px ${color},
      -${size * 2}px -${size * 2}px ${color},
      -${size * 1}px -${size * 3}px ${color};
  }
  75% {
    box-shadow:
      0px -${size * 3}px ${color},
      ${size * 1}px -${size * 3}px ${color},
      ${size * 2}px -${size * 2}px ${color},
      ${size * 3}px -${size * 1}px ${color},
      ${size * 3}px 0px transparent,
      ${size * 3}px ${size * 1}px transparent,
      ${size * 2}px ${size * 2}px transparent,
      ${size * 1}px ${size * 3}px transparent,
      0px ${size * 3}px transparent,
      -${size * 1}px ${size * 3}px transparent,
      -${size * 2}px ${size * 2}px transparent,
      -${size * 3}px ${size * 1}px transparent,
      -${size * 3}px 0px ${color},
      -${size * 3}px -${size * 1}px ${color},
      -${size * 2}px -${size * 2}px ${color},
      -${size * 1}px -${size * 3}px ${color};
  }
  81.25% {
    box-shadow:
      0px -${size * 3}px ${color},
      ${size * 1}px -${size * 3}px ${color},
      ${size * 2}px -${size * 2}px ${color},
      ${size * 3}px -${size * 1}px ${color},
      ${size * 3}px 0px ${color},
      ${size * 3}px ${size * 1}px transparent,
      ${size * 2}px ${size * 2}px transparent,
      ${size * 1}px ${size * 3}px transparent,
      0px ${size * 3}px transparent,
      -${size * 1}px ${size * 3}px transparent,
      -${size * 2}px ${size * 2}px transparent,
      -${size * 3}px ${size * 1}px transparent,
      -${size * 3}px 0px transparent,
      -${size * 3}px -${size * 1}px ${color},
      -${size * 2}px -${size * 2}px ${color},
      -${size * 1}px -${size * 3}px ${color};
  }
  87.5% {
    box-shadow:
      0px -${size * 3}px ${color},
      ${size * 1}px -${size * 3}px ${color},
      ${size * 2}px -${size * 2}px ${color},
      ${size * 3}px -${size * 1}px ${color},
      ${size * 3}px 0px ${color},
      ${size * 3}px ${size * 1}px ${color},
      ${size * 2}px ${size * 2}px transparent,
      ${size * 1}px ${size * 3}px transparent,
      0px ${size * 3}px transparent,
      -${size * 1}px ${size * 3}px transparent,
      -${size * 2}px ${size * 2}px transparent,
      -${size * 3}px ${size * 1}px transparent,
      -${size * 3}px 0px transparent,
      -${size * 3}px -${size * 1}px transparent,
      -${size * 2}px -${size * 2}px ${color},
      -${size * 1}px -${size * 3}px ${color};
  }
  93.75% {
    box-shadow:
      0px -${size * 3}px ${color},
      ${size * 1}px -${size * 3}px ${color},
      ${size * 2}px -${size * 2}px ${color},
      ${size * 3}px -${size * 1}px ${color},
      ${size * 3}px 0px ${color},
      ${size * 3}px ${size * 1}px ${color},
      ${size * 2}px ${size * 2}px ${color},
      ${size * 1}px ${size * 3}px transparent,
      0px ${size * 3}px transparent,
      -${size * 1}px ${size * 3}px transparent,
      -${size * 2}px ${size * 2}px transparent,
      -${size * 3}px ${size * 1}px transparent,
      -${size * 3}px 0px transparent,
      -${size * 3}px -${size * 1}px transparent,
      -${size * 2}px -${size * 2}px transparent,
      -${size * 1}px -${size * 3}px ${color};
  }
  100% {
    box-shadow:
      0px -${size * 3}px ${color},
      ${size * 1}px -${size * 3}px ${color},
      ${size * 2}px -${size * 2}px ${color},
      ${size * 3}px -${size * 1}px ${color},
      ${size * 3}px 0px ${color},
      ${size * 3}px ${size * 1}px ${color},
      ${size * 2}px ${size * 2}px ${color},
      ${size * 1}px ${size * 3}px ${color},
      0px ${size * 3}px transparent,
      -${size * 1}px ${size * 3}px transparent,
      -${size * 2}px ${size * 2}px transparent,
      -${size * 3}px ${size * 1}px transparent,
      -${size * 3}px 0px transparent,
      -${size * 3}px -${size * 1}px transparent,
      -${size * 2}px -${size * 2}px transparent,
      -${size * 1}px -${size * 3}px transparent;
  }
  `} ${period}s linear infinite`;
