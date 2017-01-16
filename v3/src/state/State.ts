/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

import Settings from './Settings';
import Systems from './Systems';
import Loader from './systems/loader';

/**
* A Base State Class.
*
* @class Phaser.State
* @constructor
*/
export default class State
{

  public game;
  public settings;
  public sys;
  public children;

  public load: Loader;


  constructor(config)
  {
    this.game = null;

    //  Maybe just an object? Doesn't have to instantiate I don't think ...
    this.settings = new Settings(this, config);

    this.sys = new Systems(this, config);

    //  Reference to sys.children, set during sys.init only
    this.children;
  }

   preUpdate()
    {
    }

    //  Can be overridden by your own States
    update()
    {
    }

    //  Can be overridden by your own States
    postUpdate()
    {
    }

    //  Can be overridden by your own States
    render()
    {
    }
}