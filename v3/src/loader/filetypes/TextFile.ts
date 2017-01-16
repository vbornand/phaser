import * as CONST from '../const';
import File from '../File';

export default class TextFile extends File {

    constructor(key, url, path, xhrSettings) {
        if (path === undefined) { path = ''; }

        if (!key) {
            throw new Error('Error calling \'Loader.text\' invalid key provided.');
        }

        if (!url) {
            url = path + key + '.text';
        }
        else {
            url = path.concat(url);
        }

        super('text', key, url, 'text', xhrSettings);
    }

    onProcess(callback) {
        this.state = CONST.FILE_PROCESSING;

        this.data = this.xhrLoader.responseText;

        this.onComplete();

        callback(this);
    }
}
