let uuid = require('node-uuid'),
    JsData = require('js-data'),
    Schemator = require('js-data-schema'),
    NeDbAdapter = require('js-data-nedb'),
    schemator = new Schemator(),
    DS = new JsData.DS();

DS.registerAdapter('nedb', NeDbAdapter, { default: true })
//This one line tells the whole server to use NeDB as its default database.
//To change the database service, add a dependency and change this one line.

module.exports = {
    DS,
    uuid,
    schemator
}