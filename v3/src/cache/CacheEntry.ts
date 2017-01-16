export default class CacheEntry
{
    public key;
    public url;
    public data;

    constructor(key, url, data)
    {
      this.key = key;
      this.url = url;
      this.data = data;
    };

}