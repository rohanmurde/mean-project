const request = require('postman-request')

const geocode = (address, callback) => {
    // encode changes ? to %3F. Converts all special chars.
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1Ijoicm9oYW5tdXJkZSIsImEiOiJja2k1djB6YmUwM3J3MnFwNjk0d2ZobGk4In0.HaWP9wcThJVWxh1nvkq9SQ'
    const mapbox_options = {
        url: mapboxUrl,
        json: true
    }

    request(mapbox_options, (err, res) => {
        if (err) {
            callback('Unable to connect to geocoding service.', undefined)
        } else if (res.body.features.length === 0) {
            callback('Unable to find lat long. Try another location', undefined)
        } else {
            callback('', {
                lat: res.body.features[0].center[1],
                long: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode