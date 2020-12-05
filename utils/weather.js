const request = require('postman-request')

const forecast = (lat, long, location, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=7c952d00b7894fa977b7173b03499544&query=' + lat + ',' + long
    const weather_options = {
        url: weatherUrl,
        json: true
    }
    request(weather_options, (err, res) => {
        if (err) {
            callback('Unable to connect to weather service.', undefined)
        } else if (res.body.error) {
            callback('Unable to find weather for your location', undefined)
        } else {
            callback('', 'It is ' + res.body.current.weather_descriptions[0] + ' in ' + location + '. It is currently ' + res.body.current.temperature + ' degree celcius.')
        }
    })

}

module.exports = forecast