/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

import * as CONST from '../const';
import CanvasPool from '../dom/CanvasPool';
import Features from '../device/Features';
import CanvasRenderer from '../renderer/canvas/CanvasRenderer';
import WebGLRenderer from '../renderer/webgl/WebGLRenderer';
import Game from './Game';

/**
* Checks if the device is capable of using the requested renderer and sets it up or an alternative if not.
*
* @method Phaser.Game#setUpRenderer
* @protected
*/
export default function (game: Game)
{
    var config = game.config;

    //  Game either requested Canvas,
    //  or requested AUTO or WEBGL but the browser doesn't support it, so fall back to Canvas
    if (config.renderType === CONST.CANVAS || (config.renderType !== CONST.CANVAS && !Features.webGL))
    {
        if (Features.canvas)
        {
            //  They requested Canvas and their browser supports it
            config.renderType = CONST.CANVAS;
        }
        else
        {
            throw new Error('Cannot create Canvas or WebGL context, aborting.');
        }
    }
    else
    {
        //  Game requested WebGL and browser says it supports it
        config.renderType = CONST.WEBGL;
    }

    //  Does the game config provide its own canvas element to use?
    if (config.canvas)
    {
        game.canvas = config.canvas;
    }
    else
    {
        game.canvas = CanvasPool.create(game, config.width, config.height, config.renderType);
    }

    //  Does the game config provide some canvas css styles to use?
    if (config.canvasStyle)
    {
        game.canvas.style = config.canvasStyle;
    }

    //  Create the renderer
    if (config.renderType === CONST.WEBGL)
    {
        console.log('Creating WEBGL Renderer');
        game.renderer = new WebGLRenderer(game);
        game.context = null;
    }
    else
    {
        console.log('Creating Canvas Renderer');
        game.renderer = new CanvasRenderer(game);
        game.context = game.renderer.context;
    }
};
