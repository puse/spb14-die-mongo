let Die = require('spb14-die');

class Mongo extends Die {
    init (cursor, load, name='_id') {
        let toTable = arr => {
                let [Table, mapKV] = load
                        ? [ Map, e => [e[name], e[load]] ]
                        : [ Set, e => e[name] ];

                let table = new Table(arr.map(mapKV));

                return super.init(table);
            };

        return cursor.toArray()
            .then(toTable);
    }
}

module.exports = Mongo;
