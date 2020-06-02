const path = require('path')
const geocode = require('./geocode.js')
const forecast = require('./forecast.js')
const express = require('express')
const hbs = require('hbs')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Ashutosh Harkare'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {title : 'About Me', message : 'Hi, I am Ashutosh Harkare. I study in Pune Institute of Computer Technology, Pune. I have interests in back-end development and competitive coding.', name : 'Ashutosh Harkare'})
})

app.get('/help', (req, res) => {
    res.render('help', {message : 'Help menu!', title : 'Help', name : 'Ashutosh Harkare'})
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        res.send({
            Error : 'Address not provided to access weather.'
        })
    }
    else
    {
        const address = req.query.address
        geocode(address, (error, {latitude, longitude, place} = {}) => {
            if(error)
            {
                res.send({
                    Error : error
                })
            }
            else{
                forecast(latitude, longitude, (error, forecastData) => {
                    if(error)
                    {
                        res.send({
                            Error : error
                        })
                    }
                    else{
                        res.send({
                            Place : place,
                            Forecast : forecastData
                        })
                    }
                    
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {message : 'Help page not found.', title : '404', name : 'Ashutosh Harkare'})
})

app.get('*',(req, res) => {
    res.render('404', {message : 'My 404 page.', title : '404', name : 'Ashutosh Harkare'})
})

app.listen(port, () => {
    console.log('Server is up and running on port 3000.')
})
