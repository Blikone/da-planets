(function () {
    angular.module('da-planets')
        .service('DataStore', function (DS) {
            this.Galaxy = DS.defineResource({
                name: 'galaxy',
                endpoint: 'api/galaxies',
                relations: {
                    hasMany: {
                        star: {
                            localField: 'stars',
                            foreignKey: 'galaxyId'
                        },
                        planet: {
                            localField: 'planets',
                            foreignKey: 'galaxyId'
                        },
                        moon: {
                            localField: 'moons',
                            foreignKey: 'galaxyId'
                        },
                        creature: [{
                            localField: 'creatures',
                            foreignKeys: 'locationIds'
                        }, {
                            localField: 'knownCreatures',
                            foreignKeys: 'creatureIds'
                        }]
                    }
                }
            })

            this.Star = DS.defineResource({
                name: 'star',
                endpoint: 'api/stars',
                relations: {
                    belongsTo: {
                        galaxy: {
                            localField: 'galaxy',
                            localKey: 'galaxyId'
                        }
                    },
                    hasMany: {
                        planet: {
                            localField: 'planets',
                            foreignKey: 'starId'
                        },
                        moon: {
                            localField: 'moons',
                            foreignKey: 'starId'
                        },
                        creature: [{
                            localField: 'creatures',
                            foreignKeys: 'locationIds'
                        }, {
                            localField: 'knownCreatures',
                            foreignKeys: 'creatureIds'
                        }]
                    }
                }
            })

            this.Planet = DS.defineResource({
                name: 'planet',
                endpoint: 'api/planets',
                relations: {
                    belongsTo: {
                        star: {
                            localField: 'star',
                            localKey: 'starId',
                            parent: true
                        },
                        galaxy: {
                            localField: 'galaxy',
                            localKey: 'galaxyId'
                        }
                    },
                    hasMany: {
                        moon: {
                            localField: 'moons',
                            foreignKey: 'planetId'
                        },
                        creature: [{
                            localField: 'creatures',
                            foreignKeys: 'locationIds'
                        }, {
                            localField: 'knownCreatures',
                            foreignKeys: 'creatureIds'
                        }]
                    }
                }
            })

            this.Moon = DS.defineResource({
                name: 'moon',
                endpoint: 'api/moons',
                relations: {
                    belongsTo: {
                        planet: {
                            localField: 'planet',
                            localKey: 'planetId',
                            parent: true
                        },
                        star: {
                            localField: 'star',
                            localKey: 'starId',
                        },
                        galaxy: {
                            localField: 'galaxy',
                            localKey: 'galaxyId'
                        }
                    },
                    hasMany: {
                        creature: [{
                            localField: 'creatures',
                            foreignKeys: 'locationIds'
                        }, {
                            localField: 'knownCreatures',
                            foreignKeys: 'creatureIds'
                        }]
                    }
                }
            })

            this.Creature = DS.defineResource({
                name: 'creature',
                endpoint: 'api/creatures',
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
        })
}());