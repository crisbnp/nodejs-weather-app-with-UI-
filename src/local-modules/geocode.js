const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiY3Jpc2JucCIsImEiOiJjanQ4MDhldDQwM2dhNGJtcjM4M2xvdGJwIn0.8RVgUhcfZLmfXe0ydSZ1CA'

    request({url, json: true}, (error, response) => {
        const { features } = response.body;
        if (error) {
            callback("Can't connect to location services!", undefined)
        } else if (features.length === 0) {
            callback("Can't find the location! Try another search", undefined)
        } else {
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode

//GEOCODING
// const geocodingURL="https://api.mapbox.com/geocoding/v5/mapbox.places/jakarta.json?access_token=pk.eyJ1IjoiY3Jpc2JucCIsImEiOiJjanQ4MDhldDQwM2dhNGJtcjM4M2xvdGJwIn0.8RVgUhcfZLmfXe0ydSZ1CA"

// request({url: geocodingURL, json: true}, (error, response) => {
//     if (error) {
//         console.log("Can't connect to location service!")
//     } else if (response.body.features.length === 0){
//         console.log("Can't find location")
//     }else {
//         console.log(response.body.features[0].center)
//     }
    
// })