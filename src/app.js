const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('/Users/Nikolas/hello/web-server/src/utils/geocode.js')
const forecast = require('/Users/Nikolas/hello/web-server/src/utils/forecast.js')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
// Setup static directoy to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Nick C',
        footer: 'Nikolas Caceres'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Baller',
        name: 'Nick',
        footer: 'Nikolas Caceres'
    })
} )
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('Please provide an address')
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({ error })
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
            return res.send({
             forecast: forecastData,
             location: location,
             address: req.query.address
            })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Cant help you',
        name: 'Yes sir',
        footer: 'Nikolas Caceres'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        footer: 'Nick',
        error: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        footer: 'Nick',
        error: 'Page not found'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})