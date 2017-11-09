const db = require('../db')

class Restaurants {
    constructor(collection) {
        this._collection = db.get().collection(collection)
    }

    getRestaurants(config, query) {
        const { limit, page, projection } = config

        return new Promise((resolve, reject) => {
            this._collection
                .find(query, projection)
                .skip((page - 1) * limit)
                .limit(limit)
                .toArray(function(err, docs) {
                    if (err) reject(err)

                    resolve(docs)
                })
            })
    }

    getRestaurantById(query) {
        return new Promise((resolve, reject) => {
            this._collection
                .find(query)
                .toArray(function(err, docs) {
                    if (err) reject(err)

                    resolve(docs)
                })
            })
    }

    getRestaurantsNear(config, query) {
        const { limit, page, projection } = config
        const { id, km } = query

        return new Promise((resolve, reject) => {
            this.getRestaurantById({ restaurant_id: id })
                .then(docs => {                    
                    this._collection
                        .find({
                            restaurant_id: { $ne: id },
                            "address.coord": {
                                $near: {
                                    $geometry: {
                                        type: "Point",
                                        coordinates: docs[0].address.coord
                                    },
        
                                    $maxDistance: km * 1000
                                }
                            }
                        }, projection)
                        .skip((page - 1) * limit)
                        .limit(limit)
                        .toArray(function(err, docs) {
                            if (err) reject(err)
        
                            resolve(docs)
                        })
                })
        })
    }
}

module.exports = Restaurants