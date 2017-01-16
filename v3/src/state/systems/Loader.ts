import * as CONST from '../../loader/const';
import BaseLoader from '../../loader/BaseLoader';
import NumberArray from '../../utils/array/NumberArray';

import ImageFile from '../../loader/filetypes/ImageFile';
import JSONFile from '../../loader/filetypes/JSONFile';
import XMLFile from '../../loader/filetypes/XMLFile';
import BinaryFile from '../../loader/filetypes/BinaryFile';
import GLSLFile from '../../loader/filetypes/GLSLFile';
import TextFile from '../../loader/filetypes/TextFile';
import AtlasJSONFile from '../../loader/filetypes/AtlasJSONFile';


export default class Loader extends BaseLoader
{

    protected _multilist;
    private state;


    constructor(state)
    {
        super();
        this.state = state;
        this._multilist = {};
    }

    image(key, url, xhrSettings)
    {
        var file = new ImageFile(key, url, this.path, xhrSettings);

        return this.addFile(file);
    }

    json(key, url, xhrSettings)
    {
        var file = new JSONFile(key, url, this.path, xhrSettings);

        return this.addFile(file);
    }

    xml(key, url, xhrSettings)
    {
        var file = new XMLFile(key, url, this.path, xhrSettings);

        return this.addFile(file);
    }

    binary(key, url, xhrSettings)
    {
        var file = new BinaryFile(key, url, this.path, xhrSettings);

        return this.addFile(file);
    }

    text(key, url, xhrSettings)
    {
        var file = new TextFile(key, url, this.path, xhrSettings);

        return this.addFile(file);
    };

    glsl(key, url, xhrSettings)
    {
        var file = new GLSLFile(key, url, this.path, xhrSettings);

        return this.addFile(file);
    };

    atlas (key, textureURL, atlasURL, textureXhrSettings?, atlasXhrSettings?)
    {
        //  Returns an object with two properties: 'texture' and 'data'
        var files = AtlasJSONFile(key, textureURL, atlasURL, this.path, textureXhrSettings, atlasXhrSettings);

        this.addFile(files.texture);
        this.addFile(files.data);

        return this;
    };

    multiatlas(key, textureURLs, atlasURLs, textureXhrSettings, atlasXhrSettings)
    {
        if (typeof textureURLs === 'number')
        {
            var total = textureURLs;

            textureURLs = NumberArray(0, total, key + '-', '.png');
            atlasURLs = NumberArray(0, total, key + '-', '.json');
        }
        else
        {
            if (!Array.isArray(textureURLs))
            {
                textureURLs = [ textureURLs ];
            }

            if (!Array.isArray(atlasURLs))
            {
                atlasURLs = [ atlasURLs ];
            }
        }

        var file;
        var i = 0;
        var multiKey;

        this._multilist[key] = [];

        for (i = 0; i < textureURLs.length; i++)
        {
            multiKey = '_MA_IMG_' + key + '_' + i.toString();

            file = new ImageFile(multiKey, textureURLs[i], this.path, textureXhrSettings);

            this.addFile(file);

            this._multilist[key].push(multiKey);
        }

        for (i = 0; i < atlasURLs.length; i++)
        {
            multiKey = '_MA_JSON_' + key + '_' + i.toString();

            file = new JSONFile(multiKey, atlasURLs[i], this.path, atlasXhrSettings);

            this.addFile(file);

            this._multilist[key].push(multiKey);
        }
    }

     processCallback()
     {
        super.processCallback();

        if (this.storage.size === 0)
        {
            return;
        }

        //  The global Texture Manager
        var textures = this.state.sys.textures;

        //  Process multiatlas groups first

        var file;

        for (var key in this._multilist)
        {
            var data = [];
            var images = [];
            var keys = this._multilist[key];

            for (var i = 0; i < keys.length; i++)
            {
                file = this.storage.get('key', keys[i]);

                if (file)
                {
                    if (file.type === 'image')
                    {
                        images.push(file.data);
                    }
                    else if (file.type === 'json')
                    {
                        data.push(file.data);
                    }

                    this.storage.delete(file);
                }
            }

            //  Do we have everything needed?
            if (images.length + data.length === keys.length)
            {
                //  Yup, add them to the Texture Manager

                //  Is the data JSON Hash or JSON Array?
                if (Array.isArray(data[0].frames))
                {
                    textures.addAtlasJSONArray(key, images, data);
                }
                else
                {
                    textures.addAtlasJSONHash(key, images, data);
                }
            }
        }

        this.storage.each(function (file)
        {
            if (file.type === 'image')
            {
                textures.addImage(file.key, file.data);
            }
            else if (file.type === 'atlasjson')
            {
                var fileA = file.fileA;
                var fileB = file.fileB;

                if (fileA.type === 'image')
                {
                    textures.addAtlas(fileA.key, fileA.data, fileB.data);
                }
                else
                {
                    textures.addAtlas(fileB.key, fileB.data, fileA.data);
                }
            }
            else if (file.type === 'json')
            {
                // console.dir(file.data);
            }
        });

        this.storage.clear();
    }
}