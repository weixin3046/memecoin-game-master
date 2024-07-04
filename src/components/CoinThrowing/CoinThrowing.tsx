import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useAnimationFrame, useInView } from 'framer-motion';

import { useTeaserStore } from '@/stores/teaser';

import MotionBox from '@/components/MotionBox';

import { random, randomInt } from '@/utils/random';
import { useScale } from '@/utils/useScale';

import { DOGE_COIN_VARIANT, nonMemeCoinVariants } from './non-memecoin';
import ThrowingCoin from './throwing-coin.svg';

import type { TeaserCoin } from '@/stores/teaser';

interface CoinProps {
  coin: TeaserCoin;
}

const G = 699;
const numNonMemeVariants = nonMemeCoinVariants.length;
let touched = false;

const CoinItem = ({ coin }: CoinProps) => {
  const { initialX, initialY, initialTheta, velocity, angularVelocity, angle } = coin;
  const dom = useRef<HTMLElement>() as React.MutableRefObject<HTMLElement>;
  const vx = useMemo(() => velocity * Math.sin((angle * Math.PI) / 180), [velocity, angle]);
  const vy = useMemo(() => velocity * Math.cos((angle * Math.PI) / 180), [velocity, angle]);

  function f(t: number) {
    // Assuming upwards positive
    // ? vertex[f(t) = at^2 + bt + c]
    // ? vertex = (4ac - b^2) / 4a
    // ? vertex = c - b^2 / 4a
    // const vertex = initialY - vy*vy / (4 * -0.5 * G)
    // vertex -> window.innerHeight, find vy
    // vy = sqrt((vertex - initialY) * 2 * G)
    //
    // velocity = vy / Math.cos((angle * Math.PI) / 180)
    // velocity = sqrt((vertex - initialY) * 2 * G) / Math.cos((angle * Math.PI) / 180)

    return {
      x: initialX + vx * t,
      y: initialY + vy * t - 0.5 * G * t * t,
      theta: initialTheta + angularVelocity * t,
    };
  }

  const [isSeen, setIsSeen] = useState(false);
  const isInView = useInView(dom);
  useEffect(() => {
    if (!isSeen && isInView) {
      setIsSeen(true);
    }
    if (isSeen && !isInView) {
      useTeaserStore.getState().removeCoin(coin.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSeen, isInView]);

  const oldMaxCoins = useMemo(() => useTeaserStore.getState().maxCoins, []);
  const fpsViolateCount = useRef(0);
  const requiredFps = useMemo(() => useTeaserStore.getState().requiredFps, []);
  useAnimationFrame((time, delta) => {
    // reduce max coin by 10 when FPS is low
    const fps = 1000 / delta;
    if (fps < requiredFps) {
      fpsViolateCount.current++;
      if (fpsViolateCount.current > 20) {
        // reset count, it might lower the max coins again
        fpsViolateCount.current = 0;
        // check if maxCoins is updated already to prevent lowering twice
        // it might still lower twice if 2 threads enter the block
        // simultaneously (race conditions), but the possibility is low
        if (oldMaxCoins === useTeaserStore.getState().maxCoins) {
          const maxCoins = Math.max(oldMaxCoins - 10, 15);
          useTeaserStore.setState({ maxCoins });
          console.warn(`FPS low! Reduce max coin from ${oldMaxCoins} to ${maxCoins}.`);
        }
      }
    }
    const { x, y, theta } = f(time / 1000);
    dom.current.style.transform = `translate3d(${x}px, ${-y}px, 0) rotate(${theta}deg)`;
  });

  // tune coin size to ease clicking => larger coin = lower difficulty
  const minSize = useScale(64 * 0.15, 48 * 0.2);
  const maxSize = useScale(148 * 0.125, 96 * 0.2);
  const size = useMemo(() => random(minSize, maxSize), [minSize, maxSize]);
  const onClickEvent = (e: React.MouseEvent | React.TouchEvent) => {
    // remove coin lazily by setting opacity to 0 (more performant)
    dom.current.style.opacity = '0';
    dom.current.style.pointerEvents = 'none';
    useTeaserStore.getState().onCoinClick(coin, e);
  };

  const Coin = coin.type === 'normal' ? ThrowingCoin : nonMemeCoinVariants[coin.variant % nonMemeCoinVariants.length];

  return (
    <MotionBox
      position="absolute"
      onMouseDown={(e) => {
        if (touched) return;
        onClickEvent(e);
      }}
      onTouchStart={(e) => {
        touched = true;
        onClickEvent(e);
      }}
      padding="6px"
      ref={dom}
    >
      <Coin height={`${size}px`} width={`${size}px`} />
    </MotionBox>
  );
};

export const CoinThrowing = ({ style, animation }: any) => {
  const doGnerateCoins = useTeaserStore(state => state.state === 'in-game');
  const coins = useTeaserStore(state => state.coins);

  const timer = useRef<number>(0);
  const maxCoins = 30;
  useEffect(() => {
    // adjust maxCoins according to screen size (large screen has more coins)
    useTeaserStore.setState(() => ({ maxCoins }));
    if (doGnerateCoins && !timer.current) {
      const throwCoins = () => {
        for (let i = 0; i < useTeaserStore.getState().getCoinThrowAmount(); i++) {
          setTimeout(() => {
            if (useTeaserStore.getState().state !== 'in-game') return;

            const width = Math.min(1440, window.innerWidth);
            const height = window.innerHeight;

            const xMaxWindow = 0.15;
            const maxAngleMobile = 15;
            const maxAngleDesktop = 20;
            const maxAngleMobileWidth = 320;
            const maxAngleDesktopWidth = 1024;

            const maxAngle = Math.max(
              maxAngleMobile,
              Math.min(
                maxAngleDesktop,
                ((maxAngleDesktop - maxAngleMobile) / (maxAngleDesktopWidth - maxAngleMobileWidth)) *
                  (width - maxAngleMobileWidth) +
                  maxAngleMobile,
              ),
            );

            const initialX = random(width * (0.5 - xMaxWindow / 2), width * (0.5 + xMaxWindow / 2));
            const initialY = random(0, 0);
            const angle = random(-maxAngle, maxAngle);

            const maxHeight = height * 0.8;
            const minHeight = height * 0.4;
            const velocityMax = Math.sqrt((maxHeight - initialY) * 2 * G) / Math.cos((angle * Math.PI) / 180);
            const velocityMin = Math.sqrt((minHeight - initialY) * 2 * G) / Math.cos((angle * Math.PI) / 180);

            const { timeLeft, gameConfig } = useTeaserStore.getState();
            const type =
              gameConfig.timeAllowed - timeLeft < 10 && // during the first 10 seconds
              Math.random() > 1.0 - 0.2 * (timeLeft / gameConfig.timeAllowed) ** 2
                ? 'non-memecoin'
                : 'normal';

            const character = useTeaserStore.getState().character;
            const variant =
              type === 'non-memecoin'
                ? character.name === 'doge'
                  ? DOGE_COIN_VARIANT
                  : randomInt(0, numNonMemeVariants)
                : 0;

            useTeaserStore.getState().addCoin({
              type,
              variant,
              initialX,
              initialY,
              initialTheta: random(0, 360),
              velocity: random(velocityMin, velocityMax),
              angularVelocity: random(-360, 360),
              angle,
            });
          }, Math.random() * useTeaserStore.getState().getCoinThrowTimeOffset() * 1000);
        }
        startTimer();
      };

      const startTimer = () => {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = 0;
        }
        timer.current = setTimeout(
          throwCoins,
          useTeaserStore.getState().getCoinThrowInterval() * 1000,
        ) as unknown as number;
      };
      startTimer();
      throwCoins();
    }

    if (!doGnerateCoins && timer.current) {
      clearInterval(timer.current);
      useTeaserStore.getState().reset();
      timer.current = 0;
    }
  }, [doGnerateCoins, maxCoins]);

  return (
    <MotionBox position="absolute" display="flex" bottom="48px" width="100%" {...style} {...animation}>
      {coins.map(coin => (
        <CoinItem key={coin.id} coin={coin} />
      ))}
    </MotionBox>
  );
};
