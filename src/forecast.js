const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=73947d0981f662fe0db53836d40f6618&query=' + latitude +',' + longitude

    request({url, json : true}, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to the network. Please check your network connection.', undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location.', undefined)
        }
        else{
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees outside and there is ' + body.current.precip + ' % chance of rain.' )
        }
    })
}

module.exports = forecast