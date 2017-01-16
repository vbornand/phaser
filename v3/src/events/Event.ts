export default class Event {

    type;
    target;
    private _propagate;

    constructor(type) {
        this.type = type;

        this.target;

        this._propagate = true;
    }

    reset (target) {
        this.target = target;

        this._propagate = true;
    }

    stopPropagation () {
        this._propagate = false;
    }

}