import "styled-components";

interface ColorPalette {}

declare module "styled-components" {
  export interface DefaultTheme {
    fontFamily: string;
    colors: {
      text: string;
      background: string;
      foreground: string;
      item: string;
      accent: string;
      border: string;
    };
    margin: {
      m: string;
      s: string;
    };
    padding: {
      m: string;
      s: string;
    };
  }
}
