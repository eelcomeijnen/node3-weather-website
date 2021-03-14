const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'eelco'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'eelco'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'eelco',
        message: 'Help I need somebody help, not just anyone'
    })
})


app.get('/weather', (req, res) => {
    var address = req.query.address
    if (!address){
        return res.send({
            error: 'please provide an address'
        })
    }

    geocode(address, (error, { latitude, longtitude, location } = {} ) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: address
            })
            
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query.key)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: 'Help',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: '404',
        message: '404 page not found',
        name: 'eelco'
    })
})

app.get('')
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})