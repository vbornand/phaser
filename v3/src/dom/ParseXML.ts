declare var ActiveXObject;

export default function (data)
{
    var xml = null;

    try
    {
        if (window['DOMParser'])
        {
            var domparser = new DOMParser();
            xml = domparser.parseFromString(data, 'text/xml');
        }
        else
        {
            xml = new ActiveXObject('Microsoft.XMLDOM');
            xml.loadXML(data);
        }
    }
    catch (e)
    {
        xml = null;
    }

    if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length)
    {
        return null;
    }
    else
    {
        return xml;
    }
};