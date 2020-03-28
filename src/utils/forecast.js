const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6886b166f6a18946316a7198a053f372/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        const summary = body.daily.data[0].summary
        const temp = body.currently.temperature
        const precip = body.currently.precipProbability
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, summary + ' It is currently ' + temp + ' degress out. There is a ' + precip + '% chance of rain.')
        }
    })
}

module.exports = forecast