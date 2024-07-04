import DogeStatic from "@/components/assets/images/teaser/characters/doge_static.gif";
import DogeAnimate from "@/components/assets/images/teaser/characters/doge_throwing.gif";
import PepeStatic from "@/components/assets/images/teaser/characters/pepe_static.gif";
import PepeAnimate from "@/components/assets/images/teaser/characters/pepe_throwing.gif";
import StonkStatic from "@/components/assets/images/teaser/characters/stonk_static.gif";
import StonkAnimate from "@/components/assets/images/teaser/characters/stonk_throwing.gif";

import { randomItem, shuffle } from "@/utils/random";

import type { StaticImageData } from "next/image";

export type CharacterType = "stonk" | "doge" | "pepe";

export interface Character {
  name: CharacterType;
  staticImage: StaticImageData;
  animateImage: StaticImageData;
}

export const CHARACTER_DATA: Character[] = [
  {
    name: "stonk",
    staticImage: StonkStatic,
    animateImage: StonkAnimate,
  },
  {
    name: "doge",
    staticImage: DogeStatic,
    animateImage: DogeAnimate,
  },
  {
    name: "pepe",
    staticImage: PepeStatic,
    animateImage: PepeAnimate,
  },
];

let character: Character;

export const getCharacter = (force = false) => {
  if (!force && character) return character;
  if (typeof window === "undefined") return randomItem(CHARACTER_DATA);

  const numCharacters = CHARACTER_DATA.length;

  // @ts-ignore
  const getShuffledOrder = () => shuffle([...Array(numCharacters).keys()]);

  const { choices: characterChoices, index: characterChoiceIndex } = (() => {
    let originalChoices = [];
    let choices = [];

    try {
      choices = originalChoices = JSON.parse(
        window.localStorage.getItem("teaser/character/choices") || ""
      );
      if (
        !Array.isArray(choices) ||
        choices.some((index) => typeof index !== "number")
      ) {
        originalChoices = [];
        choices = getShuffledOrder();
      }
    } catch {
      choices = getShuffledOrder();
    }

    let index = 0;
    try {
      index = JSON.parse(
        window.localStorage.getItem("teaser/character/index") || ""
      );
      if (typeof index !== "number") index = 0;
      else if (index + 1 >= choices.length) {
        choices = getShuffledOrder();
        if (originalChoices[index] === choices[0]) {
          choices = [...choices.slice(1), choices[0]];
        }
        index = 0;
      } else index = index + 1;
    } catch {
      index = 0;
    }

    return { choices, index };
  })();

  const characterChoice = characterChoices[characterChoiceIndex];

  character = CHARACTER_DATA[characterChoice];

  window.localStorage.setItem(
    "teaser/character/choices",
    JSON.stringify(characterChoices)
  );
  window.localStorage.setItem(
    "teaser/character/index",
    String(characterChoiceIndex)
  );

  return character;
};
