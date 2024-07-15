import { useLayoutEffect, useState } from "react";
import { create } from "zustand";

const isClientSide = typeof window !== "undefined";

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

type Actions = {};

const initialState = {
  vw: isClientSide ? window.innerWidth / 100 : 12.8,
  vh: isClientSide ? window.innerHeight / 100 : 7.68,

  isMobile: typeof window === "undefined" ? false : window.innerWidth < 992,
};

export type State = typeof initialState;

export const useWindowStore = create<State & Actions>()(() => ({
  ...initialState,
}));

export const initAsMobile =
  typeof window !== "undefined" && window.innerWidth < 992;

if (isClientSide) {
  const updateSize = () => {
    const vh = window.innerHeight / 100;
    const vw = window.innerWidth / 100;
    const { vw: originalVw } = useWindowStore.getState();
    if (!initAsMobile || originalVw !== vw)
      useWindowStore.setState({
        vh,
        vw,
        isMobile: window.innerWidth < 992,
      });
  };

  window.addEventListener("resize", updateSize, { passive: true });
  window.addEventListener("orientationchange", updateSize, { passive: true });
  try {
    window.visualViewport?.addEventListener("resize", updateSize, {
      passive: true,
    });
  } catch {
    //
  }
}

export const Show = (props: { children: JSX.Element; isDesktop: boolean }) => {
  const { isDesktop = true, children } = props;
  const vw = useWindowStore((state) => state.vw);
  if (isDesktop && vw * 100 >= 992) return children;
  if (!isDesktop && vw * 100 < 992) return children;
  return null;
};

export const Hide = (props: { children: JSX.Element; isDesktop: boolean }) => {
  const { isDesktop = true, children } = props;
  const vw = useWindowStore((state) => state.vw);
  if (isDesktop && vw * 100 >= 992) return null;
  if (!isDesktop && vw * 100 < 992) return null;
  return children;
};
