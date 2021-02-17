import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  fontFamily: "'Open Sans', sans-serif",
  colors: {
    text: "rgba(255,255,255,0.9)",
    background: "rgb(14, 14, 16)",
    foreground: "rgb(24, 24, 24)",
    item: "rgba(255, 255, 255, 0.2)",
    accent: "#ff3d3d",
    border: "rgba(255,255,255,0.4)",
  },
  margin: {
    m: "1rem",
    s: "0.5rem",
  },
  padding: {
    m: "1rem",
    s: "0.5rem",
  },
};

export const lightTheme: DefaultTheme = {
  fontFamily: "'Open Sans', sans-serif",
  colors: {
    text: "rgba(0,0,0,0.9)",
    background: "rgb(255,255,255)",
    foreground: "rgb(232,232,232)",
    item: "rgba(0, 0, 0, 0.1)",
    accent: "#ff3d3d",
    border: "rgba(0,0,0,0.4)",
  },
  margin: {
    m: "1rem",
    s: "0.5rem",
  },
  padding: {
    m: "1rem",
    s: "0.5rem",
  },
};
