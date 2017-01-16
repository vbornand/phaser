// The keys of a Map can be arbitrary values.

/*
var map = new Map([
    [ 1, 'one' ],
    [ 2, 'two' ],
    [ 3, 'three' ]
]);
*/

export default class Map
{
    entries;

    constructor(elements?)
    {
        this.entries = {};

        if (Array.isArray(elements))
        {
            for (var i = 0; i < elements.length; i++)
            {
                this.add(elements[i][0], elements[i][1]);
            }
        }
    }

    add(a, b?)
    {
        return this;
    }

    set(key, value)
    {
        if (!this.entries.hasOwnProperty(key))
        {
            this.entries[key] = value;
        }

        return this;
    }

    delete(key)
    {
        if (this.entries.hasOwnProperty(key))
        {
            delete this.entries[key];
        }

        return this;
    }

    keys ()
    {

    }

    values ()
    {

    }

    dump()
    {
        console.group('Map');

        for (var i = 0; i < this.entries.length; i++)
        {
            var entry = this.entries[i];
            console.log(entry);
        }

        console.groupEnd();
    }

    get(property, value)
    {
        for (var i = 0; i < this.entries.length; i++)
        {
            var entry = this.entries[i];

            if (entry[property] === value)
            {
                return entry;
            }
        }
    }

    //  For when you know this Map will be modified during the iteration
    each (callback)
    {
        var temp = this.entries.slice();

        for (var i = 0; i < temp.length; i++)
        {
            if (callback(temp[i]) === false)
            {
                break;
            }
        }
    }

    //  For when you absolutely know this Map won't be modified during the iteration
    iterate (callback)
    {
        for (var i = 0; i < this.entries.length; i++)
        {
            if (callback(this.entries[i]) === false)
            {
                break;
            }
        }
    }

    clear ()
    {
        this.entries.length = 0;
    }

    contains (value)
    {
        return (this.entries.indexOf(value) > -1);
    }

    union (set)
    {
        var newMap = new Map();

        set.values.forEach(function (value)
        {
            newMap.add(value);
        });

        this.entries.forEach(function (value)
        {
            newMap.add(value);
        });

        return newMap;
    }

    intersect(set)
    {
        var newMap = new Map();

        this.entries.forEach(function (value)
        {
            if (set.contains(value))
            {
                newMap.add(value);
            }
        });

        return newMap;
    }

    difference (set)
    {
        var newMap = new Map();

        this.entries.forEach(function (value)
        {
            if (!set.contains(value))
            {
                newMap.add(value);
            }
        });

        return newMap;
    }

    get size()
    {
        return this.entries.length;
    }

    set size(value)
    {
        this.entries.length = value;
    }
}
