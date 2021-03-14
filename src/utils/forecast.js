const request = require('postman-request')

const forecast = (long, lat, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=5bd47abe8726cba84d606237fadf5488&query=' + long + ',' + lat + '&units=m'
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
        const temperature = body.current.temperature
        const feelsLike = body.current.feelslike
        const foreCast = body.current.weather_descriptions[0]
        callback(undefined, foreCast + ' and it is currently ' + temperature + ' but it feels like ' + feelsLike)
        }
    })
}



module.exports = forecast