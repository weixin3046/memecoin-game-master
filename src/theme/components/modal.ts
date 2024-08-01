import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => {
  return {
    dialog: {
      borderRadius: "md",
      mx: "8",
    },
  };
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
