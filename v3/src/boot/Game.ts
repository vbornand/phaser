/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

import Config from './Config';
import DebugHeader from './DebugHeader';
import * as Device from '../device';

import AddToDOM from '../dom/AddToDOM';
import RequestAnimationFrame from '../dom/RequestAnimationFrame';
import DOMContentLoaded from '../dom/DOMContentLoaded';

import CreateRenderer from './CreateRenderer';
import RandomDataGenerator from '../math/random-data-generator/RandomDataGenerator';
import StateManager from '../state/StateManager';
import TextureManager from '../textures/TextureManager';

export default class Game
{
    public config: Config;
    public renderer;
    public canvas;
    public context;
    public isBooted: boolean;
    public isRunning: boolean;
    public raf : RequestAnimationFrame;
    public textures;
    public input;
    public state: StateManager;
    public device: typeof Device;
    public rnd : RandomDataGenerator;

    constructor (config)
    {
        this.config = new Config(config);

        this.renderer = null;
        this.canvas = null;
        this.context = null;

        this.isBooted = false;
        this.isRunning = false;

        /**
        * @property {Phaser.RequestAnimationFrame} raf - Automatically handles the core game loop via requestAnimationFrame or setTimeout
        * @protected
        */
        this.raf = new RequestAnimationFrame(this);

        /**
        * @property {Phaser.TextureManager} textures - Reference to the Phaser Texture Manager.
        */
        this.textures = new TextureManager();

        /**
        * @property {Phaser.Cache} cache - Reference to the assets cache.
        */
        // this.cache = new Cache();

        /**
        * @property {Phaser.Input} input - Reference to the input manager
        */
        this.input = null;

        /**
        * @property {Phaser.StateManager} state - The StateManager. Phaser instance specific.
        */
        this.state = new StateManager(this, this.config.stateConfig);

        /**
        * @property {Phaser.Device} device - Contains device information and capabilities (singleton)
        */
        this.device = Device;
        
        //  Wait for the DOM Ready event, then call boot.
        DOMContentLoaded(this.boot.bind(this));

        //  For debugging only
        (<any>window).game = this;
    };

    public boot()
    {
        this.isBooted = true;

        this.config.preBoot();

        //  Probably move within Math
        this.rnd = new RandomDataGenerator(this.config.seed);

        DebugHeader(this);

        CreateRenderer(this);

        AddToDOM(this.canvas, this.config.parent);

        this.state.boot();

        this.isRunning = true;

        this.config.postBoot();

        this.raf.start();
    }

    public update(timestamp)
    {
        this.state.step(timestamp);
    }
}