const express = require('express')

const router = express.Router()
const restaurants = new (require('../services'))('restaurants')

getProjection = function({ show, hide }) {
    const projection = {}
    projection._id = 0

    if (show)
        show.split(',').forEach(field => projection[field] = 1)

    if (hide)
        hide.split(',').forEach(field => projection[field] = 0)

    return projection
}

router.use((req, res, proceed) => {
    const { page, limit, show, hide } = req.query

    req.page = page ? parseInt(page) : 1
    req.limit = limit ? parseInt(limit) : 50
    req.show = show
    req.hide = hide

    proceed()
})

router.get('/', function (req, res) {
    const { page, limit, show, hide } = req
    const projection = getProjection( { show, hide } )

    const config = { 
        limit: limit, 
        page: page, 
        projection: projection
    }

    restaurants.getRestaurants(config)
        .then(docs => {
            res.json({ 
                status: 'ok',
                message: 'restaurants listed succesfully',
                data: docs 
            })
        })
        .catch(error => {
            return res.json({
                status: 'ko',
                message: error.message
            })
        })
})

router.get('/:id', function (req, res) {
    const { id } = req.params

    const query = { 
        restaurant_id: id,
    }

    restaurants.getRestaurantById(query)
        .then(docs => {
            res.json({ 
                status: 'ok',
                message: 'restaurant listed succesfully',
                data: docs 
            })
        })
        .catch(error => {
            return res.json({
                status: 'ko',
                message: error.message
            })
        })
})

router.get('/:node/:filter', function (req, res) {
    const { page, limit, show, hide } = req
    const { node, filter } = req.params
    const projection = getProjection( { show, hide } )

    const config = { 
        limit: limit, 
        page: page, 
        projection: projection
    }

    const query = {}
    query[node] = filter

    restaurants.getRestaurants(config, query)
        .then(docs => {
            if (!docs.length)
                return res.json({ 
                            status: 'ok',
                            message: 'there are no restaurants with the specified query',
                        })

            res.json({ 
                status: 'ok',
                message: 'restaurants listed succesfully',
                data: docs 
            })
        })
        .catch(error => {
            return res.json({
                status: 'ko',
                message: error.message
            })
        })
})

router.get('/:node/not/:filter', function (req, res) {
    const { page, limit, show, hide } = req
    const { node, filter } = req.params
    const projection = getProjection( { show, hide } )

    const config = { 
        limit: limit, 
        page: page, 
        projection: projection
    }

    const query = {}
    query[node] = {
        $ne: filter
    }

    restaurants.getRestaurants(config, query)
        .then(docs => {
            if (!docs.length)
                return res.json({ 
                            status: 'ok',
                            message: 'there are no restaurants with the specified query',
                        })

            res.json({ 
                status: 'ok',
                message: 'restaurants listed succesfully',
                data: docs 
            })
        })
        .catch(error => {
            return res.json({
                status: 'ko',
                message: error.message
            })
        })
})

// mongo --> db.restaurants.ensureIndex({ "address.coord":"2dsphere"})
router.get('/:id/around/:km', function(req, res) {
    const { page, limit, show, hide } = req
    const { id, km } = req.params
    const projection = getProjection( { show, hide } )

    const config = { 
        limit: limit, 
        page: page,
        projection: projection
    }

    restaurants.getRestaurantsNear(config, { id, km })
        .then(docs => {
            if (!docs.length)
                return res.json({ 
                        status: 'ok',
                        message: 'there are no restaurants with the specified query',
                    })

            res.json({ 
                status: 'ok',
                message: 'restaurants listed succesfully',
                data: docs 
            })
        })
        .catch(error => {
            return res.json({
                status: 'ko',
                message: error.message
            })
        })

})

module.exports = router