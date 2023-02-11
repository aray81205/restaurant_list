const { query } = require('express')
const express = require('express')
const { engine } = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', engine({ extname: '.handlebars' }))
app.set('view engine', 'handlebars')
app.set('views', './views')


// setting static files
app.use(express.static('public'))

//routes setting
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList.results })
})

app.get("/search", (req, res) => {
    const keyword = req.query.keyword;
    let findRestaruant = restaurantList.results.filter((restaurant) =>
        (restaurant.name + restaurant.category)
            .toLowerCase()
            .includes(keyword.toLowerCase().trim())
    )
    res.render("index", { restaurants: findRestaruant, keyword });
})

app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.results.filter(restaurant => restaurant.id == req.params.restaurant_id)
    res.render('show', { restaurant: restaurant[0] })
})

app.listen(port, () =>
    console.log(`App is running on http://localhost:${port}`)
)