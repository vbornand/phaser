import Event from '../../events/Event';

export default class LoaderStartEvent extends Event {

    loader;

    constructor(loader) {
        super('LOADER_START_EVENT');

        this.loader = loader;
    }
}