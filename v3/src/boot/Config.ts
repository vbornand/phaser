/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

import * as CONST from '../const';
import NOOP from '../utils/NOOP';
import GetObjectValue from '../utils/GetObjectValue';
import Game from './Game';
import StateConfig from '../state/StateConfig';

export interface BannerConfig {
    hidePhaser?: boolean;
    text?: string;
    background?: string[];
}

export interface GameCallbacksConfig {
    preBoot?: (this: Game) => void;
    postBoot?: (this: Game) => void;
}

export interface GameConfig {
    width?: number;
    height?: number;
    resolution?: number;
    type?: number;
    parent?: string | Node;
    canvas?: HTMLCanvasElement;
    canvasStyle?: CSSStyleDeclaration;
    state?: StateConfig;
    seed?: string[];
    title?: string;
    url?: string;
    version?: string;
    banner?: BannerConfig;
    forceSetTimeOut?: boolean;
    transparent?: boolean;
    pixelArt?: boolean;
    callbacks?: GameCallbacksConfig;
}

export default class Config 
{
    private static defaultBannerColor: string[] = [
        '#ff0000',
        '#ffff00',
        '#00ff00',
        '#00ffff',
        '#000000'
    ];

    private static defaultBannerTextColor: string = '#ffffff';

    public width: number;
    public height: number;
    public resolution: number;
    public renderType: number; //TODO_VBO: Use enum WEBBL/CANVAS/AUTO
    public parent: string | Node;
    public canvas: HTMLCanvasElement;
    public canvasStyle: CSSStyleDeclaration;
    public stateConfig :StateConfig;
    public seed: string[];
    public gameTitle: string;
    public gameURL: string;
    public gameVersion: string;
    public hideBanner: boolean;
    public hidePhaser: boolean;
    public bannerTextColor: string;
    public bannerBackgroundColor: string[];
    public forceSetTimeOut: boolean;
    public transparent: boolean;
    public pixelArt: boolean;
    public preBoot: (this: Config) => void;
    public postBoot: (this: Config) => void;

    constructor(config: GameConfig = {}) {
        this.width = GetObjectValue(config, 'width', 1024);
        this.height = GetObjectValue(config, 'height', 768);

        this.resolution = GetObjectValue(config, 'resolution', 1);

        this.renderType = GetObjectValue(config, 'type', CONST.AUTO);

        this.parent = GetObjectValue(config, 'parent', null);
        this.canvas = GetObjectValue(config, 'canvas', null);
        this.canvasStyle = GetObjectValue(config, 'canvasStyle', null);

        this.stateConfig = GetObjectValue(config, 'state', null);
        
        this.seed = GetObjectValue(config, 'seed', [(Date.now() * Math.random()).toString()]);

        this.gameTitle = GetObjectValue(config, 'title', '');
        this.gameURL = GetObjectValue(config, 'url', 'http://phaser.io');
        this.gameVersion = GetObjectValue(config, 'version', '');

        //  If you do: { banner: false } it won't display any banner at all
        this.hideBanner = (GetObjectValue(config, 'banner', null) === false);

        this.hidePhaser = GetObjectValue(config, 'banner.hidePhaser', false);
        this.bannerTextColor = GetObjectValue(config, 'banner.text', Config.defaultBannerTextColor);
        this.bannerBackgroundColor = GetObjectValue(config, 'banner.background', Config.defaultBannerColor);

        this.forceSetTimeOut = GetObjectValue(config, 'forceSetTimeOut', false);
        this.transparent = GetObjectValue(config, 'transparent', false);
        this.pixelArt = GetObjectValue(config, 'pixelArt', false);

        //  Callbacks
        this.preBoot = GetObjectValue(config, 'callbacks.preBoot', NOOP);
        this.postBoot = GetObjectValue(config, 'callbacks.postBoot', NOOP);
    }
}