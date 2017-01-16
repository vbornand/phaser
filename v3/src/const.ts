export const VERSION = '3.0.0';
export const AUTO = 0;
export const CANVAS = 1;
export const WEBGL = 2;

export const CONTAINER = 99;

export const IMAGE = 20;

export const state =
{
    PENDING: 0,
    INSTALLED: 1,

    BOOT: 0,
    INIT: 1,
    PRELOAD: 2,
    CREATE: 3,
    UPDATE: 4,
    RENDER: 5,
    SHUTDOWN: 6
}

export const blendModes = {
    NORMAL: 0,
    ADD: 1,
    MULTIPLY: 2,
    SCREEN: 3,
    OVERLAY: 4,
    DARKEN: 5,
    LIGHTEN: 6,
    COLOR_DODGE: 7,
    COLOR_BURN: 8,
    HARD_LIGHT: 9,
    SOFT_LIGHT: 10,
    DIFFERENCE: 11,
    EXCLUSION: 12,
    HUE: 13,
    SATURATION: 14,
    COLOR: 15,
    LUMINOSITY: 16
}

export const scaleModes =  {
    DEFAULT: 0,
    LINEAR: 0,
    NEAREST: 1
}