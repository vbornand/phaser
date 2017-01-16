import * as CONST from '../const';
import File from '../File';
import ParseXML from '../../dom/ParseXML';


export default class XMLFile extends File {

    constructor(key, url, path, xhrSettings) {
        if (path === undefined) { path = ''; }

        if (!key) {
            throw new Error('Error calling \'Loader.xml\' invalid key provided.');
        }

        if (!url) {
            url = path + key + '.xml';
        }
        else {
            url = path.concat(url);
        }

        super('xml', key, url, 'text', xhrSettings);
    }

    onProcess(callback) {
        this.state = CONST.FILE_PROCESSING;

        this.data = ParseXML(this.xhrLoader.responseText);

        if (this.data === null) {
            throw new Error('XMLFile: Invalid XML');
        }

        this.onComplete();

        callback(this);
    }
}
