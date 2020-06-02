const request = require('request')

const geocode = (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNodXRvc2hoYXJrYXJlIiwiYSI6ImNrYXF0YnZvbDBjdjAydW5yN2w3b3YycWgifQ.vgBsEUJy8aS_k_cibxLvzw&limit=1'
    request({url, json : true}, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to network.', undefined)
        }
        else if(body.features.length == 0)
        {
            callback('Invalid address provided.', undefined)
        }
        else
        {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                place : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode