import test from 'ava';

import MongoClient from 'mongodb';

import Die from '..';


let db, col;

test.before(async t => {
    db  = await MongoClient.connect('mongodb://localhost/test');
    col = await db.collection('list');

    await col.insertMany([
        { name: 'exo'  , load: 4 },
        { name: 'hopar', load: 3 },
        { name: 'venus', load: 1 }
    ]);
});


test.beforeEach(t => {
    t.context.cursor = col.find();

    t.context.exo   = 0;
    t.context.hopar = 0;
    t.context.venus = 0;
});


test('Produce less `exo`s', async t => {
    let die = new Die(t.context.cursor, 'load', 'name');

    (await times(die)(1000))
        .forEach(count(t.context));


    t.true(t.context.hopar < t.context.exo);
    t.true(t.context.venus < t.context.hopar);
});


test('Behave fair', async t => {
    let die = new Die(t.context.cursor, null, 'name');

    (await times(die)(1000))
        .forEach(count(t.context));

    t.true(t.context.exo   > 300);
    t.true(t.context.hopar > 300);
    t.true(t.context.venus > 300);
});


test.after(async t => {
    await col.drop();
    db.close();
});


let count = stat => i => stat[i]++;

let times = die => n => {
        let promises = [], p,
            i = 0;

        for (p of die)
            if (i++ < n)
                promises.push(p);
            else
                break;

        return Promise.all(promises);
    };
