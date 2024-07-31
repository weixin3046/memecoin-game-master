import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface MetaHashResponseProps {
  feelInfo: any;
  metaHash: string;
  metaHashB64: string;
  nonceInfo: string;
  nonceInfoDto: string;
  transactionId: string;
}

export const useApproveState = create(
  persist<{
    // meta
    joinGameMetaHash: null | MetaHashResponseProps;
    crossMetaHash: null | MetaHashResponseProps;
    approveMetaHash: null | MetaHashResponseProps;
    setJoinGameMetaHash: (metaHash: null | MetaHashResponseProps) => void;
    setCrossMetaHash: (metaHash: null | MetaHashResponseProps) => void;
    setApproveMetaHash: (metaHash: null | MetaHashResponseProps) => void;
    // 区别用户登录类型
    provider: "google" | "apple" | "credentials" | null;
    setProvider: (types: null | "google" | "apple" | "credentials") => void;
    // 获取三方登录回调token
    joinJwt: null | string;
    approveJwt: null | string;
    crossJwt: null | string;
    setJoinJwt: (token: null | string) => void;
    setCrossJwt: (token: null | string) => void;
    setApproveJwt: (token: null | string) => void;
    // 重置
    reset: () => void;
  }>(
    (set, get) => ({
      joinGameMetaHash: null,
      crossMetaHash: null,
      approveMetaHash: null,
      provider: null,
      joinJwt: null,
      approveJwt: null,
      crossJwt: null,
      setProvider: (types) => set({ provider: types }),
      setJoinGameMetaHash: (metaHash) => set({ joinGameMetaHash: metaHash }),
      setCrossMetaHash: (metaHash) => set({ crossMetaHash: metaHash }),
      setApproveMetaHash: (metaHash) => set({ approveMetaHash: metaHash }),
      setJoinJwt: (jwt) => set({ joinJwt: jwt }),
      setCrossJwt: (jwt) => set({ crossJwt: jwt }),
      setApproveJwt: (jwt) => set({ approveJwt: jwt }),
      reset: () =>
        set({
          joinGameMetaHash: null,
          crossMetaHash: null,
          approveMetaHash: null,
          provider: null,
          joinJwt: null,
          approveJwt: null,
          crossJwt: null,
        }),
    }),
    {
      name: "approve-state", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useGuideState = create(
  persist<{
    open: boolean;
    setOpen: () => void;
  }>(
    (set, get) => ({
      open: true,
      setOpen: () => set({ open: false }),
    }),
    {
      name: "guide-state", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
