import * as CONST from '../const';
import File from '../File';

export default class ImageFile extends File {

    constructor(key, url, path, xhrSettings) {
        if (path === undefined) { path = ''; }

        if (!key) {
            throw new Error('Error calling \'Loader.image\' invalid key provided.');
        }

        if (!url) {
            url = path + key + '.png';
        }
        else {
            url = path.concat(url);
        }

        super('image', key, url, 'blob', xhrSettings);
    }

    onProcess(callback) {
        this.state = CONST.FILE_PROCESSING;

        this.data = new Image();

        this.data.crossOrigin = this.crossOrigin;

        var _self = this;

        this.data.onload = function () {
            URL.revokeObjectURL(_self.data.src);

            _self.onComplete();

            callback(_self);
        };

        this.data.onerror = function () {
            URL.revokeObjectURL(_self.data.src);

            _self.state = CONST.FILE_ERRORED;

            callback(_self);
        };

        this.data.src = URL.createObjectURL(this.xhrLoader.response);
    }
}