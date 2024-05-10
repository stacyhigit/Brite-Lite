import { Color } from "../models/color";

export const boxColors = {
  red: "#ff0000",
  ett_orange: "#ff9900",
  ett_yellow: "#ffff00",
  ett_green: "#00ff00",
  ett_blue: "#00ffff",
  dark_blue: "#4076fa",
  ett_purple: "#ff00ff",
};

export const defaultColor = new Color("ett_green", boxColors.ett_green);

export const basicSwatches = Object.entries(boxColors).map(
  ([id, hex]) => new Color(id, hex)
);

export const buttonColors = {
  blue: "#367BF5",
  red: "#EA3D2F",
  green: "#2FA84F",
  yellow: "#F3AA18",
  gray: "#78909C",
};
