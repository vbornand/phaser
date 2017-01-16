import CacheEntry from './CacheEntry';

export default class BaseCache
{
    public entries: Map<any, any>;

    constructor()
    {
        this.entries = new Map();
    }

    public add (key, data)
    {
        this.entries.set(key, data);
    }

    public has (key)
    {
        return this.entries.has(key);
    }

    public get (key)
    {
        return this.entries.get(key);
    }

    public remove (key)
    {
        this.entries.delete(key);
    }

    public destroy ()
    {
        this.entries.clear();
    }
}