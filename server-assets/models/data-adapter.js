let uuid = require('node-uuid'),
    JsData = require('js-data'),
    Schemator = require('js-data-schema'),
    NeDbAdapter = require('js-data-nedb'),
    schemator = new Schemator(),
    DS = new JsData.DS();

function formatQuery(query) {
    query = query || '';
    return {
        with: query.split(',').join(' ').split(' ')
    }
}

DS.registerAdapter('nedb', NeDbAdapter, { default: true })
//This one line tells the whole server to use NeDB as its default database.
//To change the database service, add a dependency and change this one line.

module.exports = {
    DS,
    uuid,
    schemator,
    formatQuery
}