import './polyfills';

export * from './const';

import * as Math from './math';
import * as Geom from './geom';
import * as Sound from './sound';

import * as GameobjectsFactoryContainer from './gameobjects/FactoryContainer';
import * as LoaderImageFile from './loader/filetypes/ImageFile';
import * as ArrayUtils from './utils/array';
import * as ObjectUtils from './utils/object';

import './gameobjects/image/ImageFactory';
import './gameobjects/container/ContainerFactory';

export { default as Game } from './boot/Game';
export { default as Event } from './events/Event';
export { default as EventDispatcher } from './events/EventDispatcher';

export const GameObjects = {
        Factory: GameobjectsFactoryContainer
}

export const Loader = {
        ImageFile: LoaderImageFile
}

export { Sound, Math, Geom };

export const Utils = {
        Array: ArrayUtils,
        Objects: ObjectUtils
}