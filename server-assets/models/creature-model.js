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
            location: [{
                localField: 'locations',
                localKeys: 'locationIds'
            }, {
                localField: 'knownLocations',
                foreignKeys: 'creatureIds'
            }]
        }
    }
})

function create(creature, cb) {


    let creatureObj = {
        id: uuid.v4(),
        name: creature.name,
        locationIds: {}
    }

    Creature.create(creatureObj).then(cb).catch(cb)
}



// function inhabitGalaxy(creatureId, galaxyId, cb) {
//     DS.find('galaxy', galaxyId).then(function (galaxy) {
//         Creature.find(creatureId).then(function (creature) {

//             creature.galaxyIds[galaxyId] = galaxyId;
//             galaxy.creatureIds = galaxy.creatureIds || {};
//             galaxy.creatureIds[creatureId] = creatureId;

//             Creature.update(creature.id, creature).then(function () {
//                 DS.update('galaxy', galaxy.id, galaxy)
//                     .then(cb)
//                     .catch(cb)
//             }).catch(cb)

//         }).catch(cb)
//     }).catch(cb)
// }

function inhabitLocation(creatureId, locationId, cb) {
    DS.find('moon', locationId).then(function (moon) {
        Creature.find(creatureId).then(function (creature) {
            creature.locationIds = creature.locationIds || {};
            creature.locationIds[locationId] = locationId;
            moon.creatureIds = moon.creatureIds || {};
            moon.creatureIds[creatureId] = creatureId;
            Creature.update(creature.id, creature).then(function () {
                DS.update('moon', moon.id, moon)
            })
        }).catch(cb)
    }).catch(function () {
        DS.find('planet', locationId).then(function (planet) {
            Creature.find(creatureId).then(function (creature) {
                creature.locationIds = creature.locationIds || {};
                creature.locationIds[locationId] = locationId;
                planet.creatureIds = planet.creatureIds || {};
                planet.creatureIds[creatureId] = creatureId;
                Creature.update(creature.id, creature).then(function () {
                    DS.update('planet', planet.id, planet)
                })
            }).catch(cb)
        }).catch(function () {
            DS.find('star', locationId).then(function (star) {
                Creature.find(creatureId).then(function (creature) {
                    creature.locationIds = creature.locationIds || {};
                    creature.locationIds[locationId] = locationId;
                    star.creatureIds = star.creatureIds || {};
                    star.creatureIds[creatureId] = creatureId;
                    Creature.update(creature.id, creature).then(function () {
                        DS.update('star', star.id, star)
                    })
                }).catch(cb)
            }).catch(function () {
                DS.find('galaxy', locationId).then(function (galaxy) {
                    Creature.find(creatureId).then(function (creature) {
                        creature.locationIds = creature.locationIds || {};
                        creature.locationIds[locationId] = locationId;
                        galaxy.creatureIds = galaxy.creatureIds || {};
                        galaxy.creatureIds[creatureId] = creatureId;
                        Creature.update(creature.id, creature).then(function () {
                            DS.update('galaxy', galaxy.id, galaxy)
                        })
                    }).catch(cb)
                }).catch(cb)
            })
        })
    })
}

function getAll(query, cb) {
    //Use the Resource Model to get all Galaxies
    Creature.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
    // use the Resource Model to get a single galaxy by its id
    Creature.find(id, formatQuery(query)).then(cb).catch(cb)
}


module.exports = {
    create,
    getAll,
    getById,
    inhabitLocation
}
