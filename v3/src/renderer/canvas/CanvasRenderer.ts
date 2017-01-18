import DrawImage from './utils/DrawImage';
import Renderer from '../Renderer';
import Game from '../../boot/Game';
import State from '../../state/State';

export default class CanvasRenderer implements Renderer {

    game: Game;
    clearBeforeRender: boolean;
    transparent: false;
    autoResize: boolean;
    preserveDrawingBuffer: boolean;
    width: number;
    height: number;
    resolution: number;
    view: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    drawImage: any;
    roundPixels: boolean;
    currentAlpha: number;
    currentBlendMode: number;
    currentScaleMode: number;
    startTime: number;
    endTime: number;
    drawCount: number;
    blendModes: string[];

    constructor(game: Game) {
        /**
        * @property {Phaser.Game} game - A reference to the currently running Game.
        */
        //  Needed?
        this.game = game;

        // this.type = CONST.CANVAS;

        //  Read all the following from game config
        //TODO_VBO: UPDATE TO GET FROM GAME CONFIG
        this.clearBeforeRender = true;
       
        this.transparent = false;

        this.autoResize = false;

        this.preserveDrawingBuffer = false;

        this.width = game.config.width * game.config.resolution;

        this.height = game.config.height * game.config.resolution;

        this.resolution = game.config.resolution;

        this.view = game.canvas;

        /**
         * The canvas 2d context that everything is drawn with
         * @property context
         * @type CanvasRenderingContext2D
         */
        this.context = this.view.getContext('2d', { alpha: true });

        // this.smoothProperty = Phaser.Canvas.getSmoothingPrefix(this.context);

        this.roundPixels = false;

        this.drawImage = DrawImage;

        var so: string = 'source-over';

        this.blendModes = [so, 'lighter', so, so, so, so, so, so, so, so, so, so, so, so, so, so, so];

        this.currentAlpha = 1;
        this.currentBlendMode = 0;
        this.currentScaleMode = 0;

        this.startTime = 0;
        this.endTime = 0;
        this.drawCount = 0;

        // this.tintMethod = this.tintWithPerPixel;

        this.init();
    }

    init() {
        this.mapBlendModes();

        this.resize(this.width, this.height);
    }

    /**
     * Maps Blend modes to Canvas blend modes.
     *
     * @method mapBlendModes
     * @private
     */
    mapBlendModes() {
        // var modes = Phaser.blendModes;

        // this.blendModes[modes.MULTIPLY] = 'multiply';
        // this.blendModes[modes.SCREEN] = 'screen';
        // this.blendModes[modes.OVERLAY] = 'overlay';
        // this.blendModes[modes.DARKEN] = 'darken';
        // this.blendModes[modes.LIGHTEN] = 'lighten';
        // this.blendModes[modes.COLOR_DODGE] = 'color-dodge';
        // this.blendModes[modes.COLOR_BURN] = 'color-burn';
        // this.blendModes[modes.HARD_LIGHT] = 'hard-light';
        // this.blendModes[modes.SOFT_LIGHT] = 'soft-light';
        // this.blendModes[modes.DIFFERENCE] = 'difference';
        // this.blendModes[modes.EXCLUSION] = 'exclusion';
        // this.blendModes[modes.HUE] = 'hue';
        // this.blendModes[modes.SATURATION] = 'saturation';
        // this.blendModes[modes.COLOR] = 'color';
        // this.blendModes[modes.LUMINOSITY] = 'luminosity';
    }

    resize(width: number, height: number) {
        var res: number = this.game.config.resolution;

        this.width = width * res;
        this.height = height * res;

        this.view.width = this.width;
        this.view.height = this.height;

        if (this.autoResize) {
            this.view.style.width = (this.width / res) + 'px';
            this.view.style.height = (this.height / res) + 'px';
        }

        // if (this.smoothProperty)
        // {
        //     this.context[this.smoothProperty] = (this.scaleMode === Phaser.scaleModes.LINEAR);
        // }
    }

    /**
     * Renders the State.
     *
     * @method render
     * @param {Phaser.State} state - The State to be rendered.
     * @param {number} interpolationPercentage - The cumulative amount of time that hasn't been simulated yet, divided
     *   by the amount of time that will be simulated the next time update()
     *   runs. Useful for interpolating frames.
     */
    render(state: State, interpolationPercentage: number) {
        // console.log('%c render start ', 'color: #ffffff; background: #00ff00;');

        //  Add Pre-render hook

        //  TODO: A State should have the option of having its own canvas to draw to

        this.startTime = Date.now();

        this.context.setTransform(1, 0, 0, 1, 0, 0);

        //  If the alpha or blend mode didn't change since the last render, then don't set them again (saves 2 ops)

        if (this.currentAlpha !== 1) {
            this.context.globalAlpha = 1;
        }

        if (this.currentBlendMode !== 0) {
            this.context.globalCompositeOperation = 'source-over';
        }

        this.currentBlendMode = 0;
        this.currentScaleMode = 0;
        this.currentAlpha = 1;

        if (this.clearBeforeRender) {
            this.context.clearRect(0, 0, this.width, this.height);
        }

        this.drawCount = 0;

        //  Could move to the State Systems or MainLoop
        this.game.state.renderChildren(this, state, interpolationPercentage);

        this.endTime = Date.now();

        // console.log('%c render end ', 'color: #ffffff; background: #ff0000;');

        //  Add Post-render hook
    }

    /**
     * Removes everything from the renderer and optionally removes the Canvas DOM element.
     *
     * @method destroy
     * @param [removeView=true] {boolean} Removes the Canvas element from the DOM.
     */
    destroy() {
        //  CanvasPool

        this.view = null;
        this.context = null;
    }
}