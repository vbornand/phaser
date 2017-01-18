/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

import EventDispatcher from '../events/EventDispatcher';
import GameObjectFactory from './systems/GameObjectFactory';
// import GameObjectCreator from('./systems/GameObjectCreator';
import Loader from './systems/Loader';
import MainLoop from './systems/MainLoop';
import UpdateManager from './systems/UpdateManager';
import * as Component from '../components';
import Camera from '../camera/Camera';

export default class Systems {

    state;
    config;
    events;
    textures;
    add;
    make;
    input;
    load: Loader;
    tweens;
    mainloop: MainLoop;
    updates: UpdateManager;
    camera: Camera;
    children;
    color: Component.Color;
    data;
    fbo;
    time;
    transform;

    constructor(state, config?) {
        this.state = state;

        this.config = config;

        this.events;

        //  Reference to the global Game level TextureManager.
        this.textures;

        //  State specific managers (Factory, Tweens, Loader, Physics, etc)
        this.add;
        this.make;
        this.input;
        this.load;
        this.tweens;
        this.mainloop;
        this.updates;

        //  State specific properties (transform, data, children, etc)
        this.camera;
        this.children;
        this.color;
        this.data;
        this.fbo;
        this.time;
        this.transform;
    }

    init() {
        console.log('State.Systems.init');

        this.textures = this.state.game.textures;

        //  All of the systems can use the State level EventDispatcher, or their own
        this.events = new EventDispatcher();

        //  State specific managers (Factory, Tweens, Loader, Physics, etc)
        //  All these to be set by a State Config package

        this.add = GameObjectFactory(this.state);
        // this.make = GameObjectCreator(this.state);
        this.mainloop = new MainLoop(this.state, this.state.settings.fps);
        this.updates = new UpdateManager(this.state);
        this.load = new Loader(this.state);

        // this.tweens = new Phaser.TweenManager(this.state);
        // this.input = new Phaser.State.Input(this.state);
        // this.physics = new Phaser.Physics.Arcade(this.state, 800, 600);

        //  State specific properties (transform, data, children, etc)
        this.camera = new Camera(this.state, 0, 0, 800, 600);
        this.children = new Component.Children(this.state);
        this.color = new Component.Color(this.state);
        this.data = new Component.Data(this.state);
        this.transform = this.camera.transform;

        //  Boot

        // this.input.init();

        //  Defaults

        this.state.events = this.events;
        this.state.add = this.add;
        this.state.load = this.load;
        this.state.children = this.children;
        this.state.color = this.color;
        this.state.data = this.data;
        this.state.camera = this.camera;
        this.state.transform = this.camera.transform;
        this.state.textures = this.textures;



        // this.state.input = this.input;
        // this.state.state = this.state.game.state;

        //  Here we can check which Systems to install as properties into the State object
        //  (default systems always exist in here, regardless)
    }

    begin(timestamp, frameDelta) {
    }

    update(timestep, physicsStep) {
    }

    preRender() {
    }

    end(fps, panic) {
        if (panic) {
            // This pattern introduces non-deterministic behavior, but in this case
            // it's better than the alternative (the application would look like it
            // was running very quickly until the simulation caught up to real
            // time).
            var discardedTime = Math.round(this.mainloop.resetFrameDelta());

            console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
        }
    }
}
