import { useWindowStore } from '@/stores/window';

export const useScale = (x_base: number, x_lg?: number, multipler = 2.25) => {
  const vh = useWindowStore(state => state.vh);
  const vw = useWindowStore(state => state.vw);

  const v = vw * 100 >= 992 ? x_base : x_lg ?? x_base * 1.2;

  return Math.min(vh * v, vw * (v * multipler));
};
