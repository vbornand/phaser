import Event from '../../events/Event';

export default class LoaderCompleteEvent extends Event {

    loader;

    constructor(loader) {
        super('LOADER_COMPLETE_EVENT');

        this.loader = loader;
    }
}