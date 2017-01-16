import * as CONST from '../const';
import File from '../File';

export default class GLSLFile extends File {

    constructor(key, url, path, xhrSettings) {
        if (path === undefined) { path = ''; }

        if (!key) {
            throw new Error('Error calling \'Loader.text\' invalid key provided.');
        }

        if (!url) {
            url = path + key + '.glsl';
        }
        else {
            url = path.concat(url);
        }

        super('glsl', key, url, 'text', xhrSettings);
    }

    onProcess(callback) {
        this.state = CONST.FILE_PROCESSING;

        this.data = this.xhrLoader.responseText;

        this.onComplete();

        callback(this);
    }
}