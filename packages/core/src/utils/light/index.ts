import { LIGHT_COLOR_MODES } from "../../data/light";
import type { LightColorMode, HassEntityWithApi } from "@core";

const modesSupportingColor: LightColorMode[] = [
  LIGHT_COLOR_MODES.HS,
  LIGHT_COLOR_MODES.XY,
  LIGHT_COLOR_MODES.RGB,
  LIGHT_COLOR_MODES.RGBW,
  LIGHT_COLOR_MODES.RGBWW,
];

const modesSupportingBrightness: LightColorMode[] = [
  ...modesSupportingColor,
  LIGHT_COLOR_MODES.COLOR_TEMP,
  LIGHT_COLOR_MODES.BRIGHTNESS,
  LIGHT_COLOR_MODES.WHITE,
];

export const lightSupportsColorMode = (
  entity: HassEntityWithApi<"light">,
  mode: LightColorMode
) => entity.attributes.supported_color_modes?.includes(mode) || false;

export const lightIsInColorMode = (entity: HassEntityWithApi<"light">) =>
  (entity.attributes.color_mode &&
    modesSupportingColor.includes(entity.attributes.color_mode)) ||
  false;

export const lightSupportsColor = (entity: HassEntityWithApi<"light">) =>
  entity.attributes.supported_color_modes?.some((mode) =>
    modesSupportingColor.includes(mode)
  ) || false;

export const lightSupportsBrightness = (entity: HassEntityWithApi<"light">) =>
  entity.attributes.supported_color_modes?.some((mode) =>
    modesSupportingBrightness.includes(mode)
  ) || false;

export const getLightCurrentModeRgbColor = (
  entity: HassEntityWithApi<"light">
): number[] | undefined =>
  entity.attributes.color_mode === LIGHT_COLOR_MODES.RGBWW
    ? entity.attributes.rgbww_color
    : entity.attributes.color_mode === LIGHT_COLOR_MODES.RGBW
    ? entity.attributes.rgbw_color
    : entity.attributes.rgb_color;
