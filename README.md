# Mongo

Loaded die simulator over a MongoDB cursor

### Example

~~~js
const Mongo = require('spb14-mongo');

// let col = await db.collection('col');

let mongo = new Mongo(col.find());

mongo.get().then(console.log); // ObjectID
~~~


## Install

~~~sh
npm install spb14-mongo
~~~


### License

MIT License
