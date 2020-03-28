const request = require('request')
const forecast = require('/Users/Nikolas/hello/web-server/src/utils/forecast.js')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibmlja2VlZSIsImEiOiJjazg1YnNyNDUwNWViM3Rwb2M1MW9jbXpwIn0.jwloVoLIIc4O2K2RtoToEg'

    request({ url, json: true }, (error, {body}) => {


        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
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
// const address = process.argv[2]
// geocode(address, (error, data) => {
//     console.log(error, 'Error')
//     console.log(data.location, 'Data')
// })




