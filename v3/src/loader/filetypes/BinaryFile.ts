import * as CONST from '../const';
import File from '../File';

export default class BinaryFile extends File
{
    constructor (key, url, path, xhrSettings) {
        if (path === undefined) { path = ''; }

        if (!key) {
            throw new Error('Error calling \'Loader.binary\' invalid key provided.');
        }

        if (!url) {
            url = path + key + '.bin';
        }
        else {
            url = path.concat(url);
        }

        super('binary', key, url, 'arraybuffer', xhrSettings);
    }

    onProcess (callback) {
        this.state = CONST.FILE_PROCESSING;

        this.data = this.xhrLoader.response;

        this.onComplete();

        callback(this);
    }
}
