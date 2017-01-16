/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

import * as CONST from '../../const';
import GameObject from '../GameObject';
import ContainerWebGLRenderer from './ContainerWebGLRenderer';
import Children from '../../components/Children';

export default class Container extends GameObject {

    constructor(state, parent, x, y) {
        super(state, x, y, null, null, parent);

        this.type = CONST.CONTAINER;

        this.render = ContainerWebGLRenderer;

        this.children = new Children(this);
    }

    preUpdate() {
        this.children.preUpdate();
    }
}