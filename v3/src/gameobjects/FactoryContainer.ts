/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The GameObject Factory is a global level container of Factory instances.
* Factories register themselves with this container (when required)
*
* @class Phaser.GameObject.Factory
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
*/



export class FactoryContainer
{

    private static factories = {};

    // console.log('FactoryContainer is alive');

    register(factory)
    {
        if (FactoryContainer.factories.hasOwnProperty(factory.KEY))
        {
            // console.log('Already registered', factory.KEY);

            return this.getType(factory.KEY);
        }

        // console.log('registering', factory.KEY);

        FactoryContainer.factories[factory.KEY] = {
            add: factory.add,
            make: factory.make
        };

        return factory;
    };

    getType(key)
    {
        return FactoryContainer.factories[key];
    };

    load(dest, isFactory)
    {
        for (var factory in FactoryContainer.factories)
        {
            if (FactoryContainer.factories.hasOwnProperty(factory))
            {
                // console.log('Loading', factory);

                dest[factory] = (isFactory) ? FactoryContainer.factories[factory].add : FactoryContainer.factories[factory].make;
            }
        }

        return dest;
    };
}

export default new FactoryContainer();
