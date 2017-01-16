/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

import Container from './Container';
import FactoryContainer from '../../gameobjects/FactoryContainer';

var ContainerFactory = {

    KEY: 'container',

    add: function (parent, x, y)
    {
        if (parent === undefined) { parent = this.state; }

        return parent.children.add(new Container(this.state, parent, x, y));
    },

    make: function (parent, x, y)
    {
        return new Container(this.state, parent, x, y);
    }

};

export default FactoryContainer.register(ContainerFactory);
