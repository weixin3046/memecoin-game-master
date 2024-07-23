import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/shallow";

import ClickCoinSound from "@/components/assets/audios/click-coin.mp3";
import { getCharacter } from "./utils/character";
import { extractClickOrTouchEvent } from "@/utils/extractClickOrTouchEvent";
import { boolean } from "zod";

let globalCount = 0;

export interface TeaserCoin {
  id: number;
  type: "normal" | "non-memecoin";
  variant: number;
  initialX: number;
  initialY: number;
  initialTheta: number;
  velocity: number;
  angle: number;
  angularVelocity: number;
}

export interface PlusOneProps {
  id: number;
  initialX: number;
  initialY: number;
  amount: number;
}

type Actions = {
  setGameConfig: (config: GameConfig) => void;
  getCoinThrowAmount: () => number;
  getCoinThrowInterval: () => number;
  getCoinThrowTimeOffset: () => number;
  addCoin: (coin: Omit<TeaserCoin, "id">) => void;
  removeCoin: (coinId: number, reward?: number) => void;
  onCoinClick: (
    coin: TeaserCoin,
    e?: React.MouseEvent | React.TouchEvent
  ) => void;
  onHomeButtonClick: () => void;
  onStartButtonClick: () => void;
  addPlusOne: (plusOne: PlusOneProps) => void;
  removePlusOne: (coinId: number) => void;
  reset: () => void;
  resetAllState: () => void;
};

export interface GameConfig {
  timeAllowed: number;
  targetedScore: number;
}

export const GAME_CONFIG_V1: GameConfig = {
  timeAllowed: 15,
  targetedScore: 0,
};

export type GameStatus =
  | "loading"
  | "initial"
  | "count-down"
  | "in-game"
  | "score-board";

const initialState = {
  state: "initial" as GameStatus,
  gameConfig: GAME_CONFIG_V1 as GameConfig,
  character: getCharacter(),
  countDown: 0,
  coinCount: 0,
  requiredFps: 50,
  maxCoins: 40,
  timeLeft: 0,
  playedAudio: false,
  playingAudio: true,
  browserActive: true,
  coins: [] as TeaserCoin[],
  plusOnes: [] as PlusOneProps[],
};

export type State = typeof initialState;
export interface Transaction {
  hash: string;
  status: string; //1=>成功 2=>panding 0=>失败
}
interface TransactionState {
  transactions: Transaction[];
  targetModal: boolean;
  openTargetModalStatus: () => void;
  closeTargetModalStatus: () => void;
  addTransaction: (hash: string, status: string) => void;
  removeTransaction: (hash: string) => void;
  updateTransactionStatus: (hash: string, status: string) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  targetModal: false,
  openTargetModalStatus: () =>
    set((state) => ({
      targetModal: true,
    })),
  closeTargetModalStatus: () =>
    set((state) => ({
      targetModal: false,
    })),
  addTransaction: (hash, status) =>
    set((state) => ({
      transactions: [...state.transactions, { hash, status }],
    })),

  removeTransaction: (hash) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.hash !== hash
      ),
    })),

  updateTransactionStatus: (hash, status) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.hash === hash ? { ...transaction, status } : transaction
      ),
    })),
}));

export const useBalanceStore = create<{
  balance: string;
  pending: boolean;
  error: null | string;
}>((set) => ({
  balance: "0",
  pending: true,
  error: null,
  // initStatus: (sa) => set({ balance: sa }),
  // removeAllBears: () => set({ balance: 0 }),
}));

export const useTeaserStore = create<State & Actions>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    setGameConfig: (config: GameConfig) => {
      set({ gameConfig: config });
    },
    getCoinThrowInterval: () => {
      const { timeLeft, gameConfig } = get();
      return gameConfig.timeAllowed - timeLeft < 10
        ? 2
        : 2 - 1.6 * (1 - (timeLeft / gameConfig.timeAllowed) ** 2);
    },
    getCoinThrowTimeOffset: () => {
      const { timeLeft, gameConfig } = get();
      return 3 - 2.6 * (1 - (timeLeft / gameConfig.timeAllowed) ** 2);
    },
    getCoinThrowAmount: () => {
      const { timeLeft, gameConfig } = get();
      return Math.round(
        12 - 3 * (1 - (timeLeft / gameConfig.timeAllowed) ** 2)
      );
    },
    addCoin: (coin) => {
      const { coins, maxCoins } = get();
      if (coins.length >= maxCoins) return;
      set((state) => ({
        coins: [...state.coins, { id: globalCount++, ...coin }],
      }));
    },
    removeCoin: (coinId) => {
      set((state) => {
        const newCoins = state.coins.filter((c) => c.id !== coinId);
        return { coins: newCoins };
      });
    },
    onCoinClick: (coin, e) => {
      const current = get();
      const amount = onClickAddScore(current, coin);
      onClickPlaySoundAsync(current);
      if (amount && e) {
        const { x, y } = extractClickOrTouchEvent(e, ".teaser");
        current.addPlusOne({
          id: coin.id,
          initialX: x,
          initialY: y,
          amount,
        });
      }
    },
    onHomeButtonClick: () => {
      set({ state: "initial" });
    },
    onStartButtonClick: () => {
      const { state } = get();
      if (state !== "initial") return;
      set({ state: "count-down" });
    },
    addPlusOne: (plusOne) => {
      set((state) => ({ plusOnes: [...state.plusOnes, plusOne] }));
    },
    removePlusOne: (coinId) => {
      set((state) => {
        const plusOnes = state.plusOnes.filter((it) => it.id !== coinId);
        return { plusOnes };
      });
    },
    reset: () => {
      set(() => ({
        plusOnes: [],
        coins: [],
      }));
    },
    resetAllState: () => {
      set(initialState);
    },
  }))
);

let trackCursor = 0;
// @ts-ignore
const preInstantiateTracks = [...Array(20).keys()].map(() => {
  if (typeof Audio !== "undefined") {
    const audio = new Audio(ClickCoinSound);
    audio.preload = "auto";
    audio.volume = 0.08;
    return audio;
  }
  return null;
});
const onClickPlaySoundAsync = (state: State) => {
  if (!state.playingAudio || state.state !== "in-game") return;
  const _audio = preInstantiateTracks[trackCursor];
  if (_audio) {
    trackCursor = (trackCursor + 1) % preInstantiateTracks.length;
    return new Promise(() => {
      _audio.play();
    });
  } else Promise.resolve(); // empty promise
};

const onClickAddScore = (state: State, coin: TeaserCoin) => {
  if (state.state !== "in-game") return;
  let amount = 0;
  switch (coin.type) {
    case "normal":
      amount = 1;
      break;
    case "non-memecoin":
      amount = -1;
      break;
  }
  useTeaserStore.setState((s) => ({
    coinCount: Math.floor(s.coinCount + amount),
  }));
  return amount;
};

// Start Count Down
// eslint-disable-next-line no-lone-blocks
{
  useTeaserStore.subscribe(
    (state) => state.state,
    (state, previousState) => {
      if (state === previousState) return;
      if (state === "count-down")
        useTeaserStore.setState({
          countDown: 3,
          coinCount: 0,
          timeLeft: useTeaserStore.getState().gameConfig.timeAllowed,
        });
    }
  );
}

// Handle Timer
{
  let timer = 0;
  useTeaserStore.subscribe(
    (state) => [state.state, state.timeLeft] as const,
    ([state, timeLeft]) => {
      if (timer) {
        clearInterval(timer);
        timer = 0;
      }
      if (state !== "in-game") return;
      timer = setTimeout(() => {
        if (timeLeft > 1) useTeaserStore.setState({ timeLeft: timeLeft - 1 });
        else if (timeLeft === 1) {
          useTeaserStore.setState({
            timeLeft: 0,
            state: "score-board",
          });
        }
      }, 1000) as unknown as number;
    },
    { equalityFn: shallow }
  );
}

// Handle Count Down
{
  let timer = 0;
  useTeaserStore.subscribe(
    (state) => state.countDown,
    (countDown, previousCountDown) => {
      if (countDown === previousCountDown) return;
      if (countDown >= 1) {
        if (timer) {
          clearInterval(timer);
          timer = 0;
        }
        timer = setTimeout(() => {
          if (countDown > 1)
            useTeaserStore.setState({ countDown: countDown - 1 });
          else if (countDown === 1) {
            useTeaserStore.setState({
              state: "in-game",
              countDown: 0,
            });
          }
        }, 1000) as unknown as number;
      }
    }
  );
}

// Change Character
// eslint-disable-next-line no-lone-blocks
{
  useTeaserStore.subscribe(
    (state) => state.state,
    (state, previousState) => {
      if (state === previousState) return;
      if (state === "initial")
        useTeaserStore.setState({ character: getCharacter(true) });
    }
  );
}

if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    useTeaserStore.setState({ browserActive: !document.hidden });
  });
}
