let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let Creature = DS.defineResource({
    name: 'creature',
    endpoint: 'creatures',
    filepath: __dirname + '/../data/creatures.db',
    relations: {
        hasMany: {
            galaxy: {
                localField: 'galaxies',
                localKeys: 'galaxyIds'
            }
        }
    }
})

function create(creature, cb) {
    let creatureObj = {
        id: uuid.v4(),
        name: creature.name,
        galaxyIds: {}
    }

    Creature.create(creatureObj).then(cb).catch(cb)
}

function getAll(query, cb) {
    //Use the Resource Model to get all Galaxies
    Galaxy.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
    // use the Resource Model to get a single galaxy by its id
    Galaxy.find(id, formatQuery(query)).then(cb).catch(cb)
}


module.exports = {
    create,
    getAll,
    getById
}
