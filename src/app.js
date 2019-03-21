const path = require('path')

//load in express, configure it to serve something up and then start the server
//constant express and require to grab the library export.
//What express library exposes is just a single function (not an object). 
//Therefore we need to call it to create a new express application.
const express = require('express');

//load hbs in, to config express for handlebars partials
const hbs = require('hbs')

const geocode= require('./local-modules/geocode')
const forecast = require('./local-modules/forecast')

//create a variable to store express application. To generate the application, we call express.
//Express fn does not take any parameters/arguments - 
//instead we configure the server using various methods provided in application itself
const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views') 
const partialsPath = path.join(__dirname, '../template/partials')

//Set up handlebars engine and view location
//set up handlebars as template engine to render dynamic doc
//pointing express to our custom 'views' directory
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
//a way to customise your server.
//express.static is a function, that takes the path we want to serve up 
app.use(express.static(publicDirPath))

//app.get() lets us configure what the server should do when someone is trying to get resource at a specific route (or url)
//this method takes 2 param : url and function. The fn describes what response to send back to client. The fn takes 2 arguments: object containing incoming request to server (req) and response (to send back to client))
// app.get('', (req, res) => {
//     res.send('<h1>Content</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Cristien'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        description: 'This app is powered by Dark Sky API and Mapbox API. Technology used: Node.js for backend server and Handlebar template engine to render view',
        name: 'Cristien'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: "To use this app, just go to the home page and check the weather in your location!",
        name: 'Cristien',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided, please enter the location.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if(error) {
            return res.send({error}) 
        }
        
        // const { latitude, longitude, location } = geoData;

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: "Can't connect to weather services"
                })
            }
    
            res.send({
                location,
                forecast: forecastData.summary,
                temperature: forecastData.temperature + " degree C",
                chanceOfRain: forecastData.ChancesOfRain + "%",
                
            })
           
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMsg: "Help article not found",
        name: 'Cristien'
    })
})

//route to match anything that hasnt been matched so far
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: "Page not found!",
        name: 'Cristien'
    })
})

//this start up the server
app.listen(3000, () => {
    console.log('Server starts on port 3000')
})