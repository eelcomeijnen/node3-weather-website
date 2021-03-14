const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWVsY29tODUiLCJhIjoiY2tsdmMyY2x4MmV0bDJ2cW02MWt3bmZuayJ9.EAueti6LURAkvQXtUquCSw&limit=1&language=nl'

    request ({url, json: true}, (error, { body })=> {
        if(error){
            callback('unable to connect to location services', undefined)
        } else if(!body.features[0]){
            callback('unable to find location, try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode