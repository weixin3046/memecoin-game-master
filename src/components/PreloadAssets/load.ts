import { backoffRetry } from './backoffRetry';

const audioExts = new Set(['mp3']);

const isAudio = (src: string) => {
  return audioExts.has(src.split('.').slice(-1)[0]);
};

export const load = async <T extends typeof Image | typeof Audio>(src: string, Type: T) => {
  return await backoffRetry({
    func: async () => {
      const media = new Type() as InstanceType<T>;
      return await new Promise<InstanceType<T>>((resolve, reject) => {
        // TODO: Seems not working on iOS in preloading
        media.onload = () => resolve(media);
        media.onloadeddata = () => resolve(media);
        media.onerror = reject;
        media.src = src;
      });
    },
    maxTrials: 3,
  });
};

export const loadMultiple = async (srcs: string[], maxTrials = 3) => {
  await Promise.all(
    srcs.map((src) => {
      return backoffRetry({
        func: async () => {
          return await load(src, isAudio(src) ? Audio : Image);
        },
        maxTrials,
      });
    }),
  );
};
