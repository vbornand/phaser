import * as CONST from '../const';
import File from '../File';

export default class JSONFile extends File {

    constructor(key, url, path, xhrSettings) {
        if (path === undefined) { path = ''; }

        if (!key) {
            throw new Error('Error calling \'Loader.json\' invalid key provided.');
        }

        if (!url) {
            url = path + key + '.json';
        }
        else {
            url = path.concat(url);
        }

        super('json', key, url, 'text', xhrSettings);
    }

    onProcess(callback) {
        this.state = CONST.FILE_PROCESSING;

        this.data = JSON.parse(this.xhrLoader.responseText);

        this.onComplete();

        callback(this);
    }
}
