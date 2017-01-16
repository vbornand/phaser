// A Set is a collection of unique elements.

export default class Set {

    entries;

    constructor(elements?) {
        this.entries = [];

        if (Array.isArray(elements)) {
            for (var i = 0; i < elements.length; i++) {
                this.add(elements[i]);
            }
        }
    }

    add(value) {

    }

    set(value) {
        if (this.entries.indexOf(value) === -1) {
            this.entries.push(value);
        }

        return this;
    }

    get(property, value) {
        for (var i = 0; i < this.entries.length; i++) {
            var entry = this.entries[i];

            if (entry[property] === value) {
                return entry;
            }
        }
    }

    delete(value) {
        var index = this.entries.indexOf(value);

        if (index > -1) {
            this.entries.splice(index, 1);
        }

        return this;
    }

    dump() {
        console.group('Set');

        for (var i = 0; i < this.entries.length; i++) {
            var entry = this.entries[i];
            console.log(entry);
        }

        console.groupEnd();
    }


    //  For when you know this Set will be modified during the iteration
    each(callback) {
        var temp = this.entries.slice();

        for (var i = 0; i < temp.length; i++) {
            if (callback(temp[i]) === false) {
                break;
            }
        }

        return this;
    }

    //  For when you absolutely know this Set won't be modified during the iteration
    iterate(callback) {
        for (var i = 0; i < this.entries.length; i++) {
            if (callback(this.entries[i]) === false) {
                break;
            }
        }

        return this;
    }

    clear() {
        this.entries.length = 0;

        return this;
    }

    contains(value) {
        return (this.entries.indexOf(value) > -1);
    }

    union(set) {
        var newSet = new Set();

        set.values.forEach(function (value) {
            newSet.add(value);
        });

        this.entries.forEach(function (value) {
            newSet.add(value);
        });

        return newSet;
    }

    intersect(set) {
        var newSet = new Set();

        this.entries.forEach(function (value) {
            if (set.contains(value)) {
                newSet.add(value);
            }
        });

        return newSet;
    }

    difference(set) {
        var newSet = new Set();

        this.entries.forEach(function (value) {
            if (!set.contains(value)) {
                newSet.add(value);
            }
        });

        return newSet;
    }


    get size() {
        return this.entries.length;
    }

    set size(value) {
        this.entries.length = value;
    }

}
