const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/86720df2dbab93502b0a4a41b98e687e/" + latitude +  "," + longitude + "?units=si"

    request({url, json: true}, (error, { body } ) => {
        // const { body } = response
        if (error) {
            callback("Can't connect to weather service!", undefined)
        } else if (body.error) {
            callback("Can't find location", undefined)
        } else {
             callback(undefined, {
                 location: body.timezone,
                 summary: body.daily.data[0].summary,
                 temperature: body.currently.temperature,
                 ChancesOfRain: body.currently.precipProbability,
                //  `Location: ${body.timezone},\nSummary: ${body.daily.data[0].summary},\nTemperature: ${body.currently.temperature} °C,\nChance Of Rain: ${body.currently.precipProbability} %`
             }
            )
        }
    })

}

module.exports = forecast

// const url='https://api.darksky.net/forecast/86720df2dbab93502b0a4a41b98e687e/37.8267,-122.4233?units=si'

// request({url: url, json: true}, (error, response) => {
//     if (error) {
//         //low level errors - connectivity issue
//         console.log("Error. Unable to connect to weather service!")
//     } else if (response.body.error) {
//         //input error
//         console.log('Unable to find location.')
//     } else {
//         let msg = response.body.daily.data[0].summary + 'It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + ' % chance of rain.'
//         console.log(msg)
//     }
// })
