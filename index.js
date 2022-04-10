import express from 'express'
import {requestTime, logger} from './middlewares.js'
import { loadLaptops, applyFilters } from './db/laptopsModule.js'

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.locals.laptops = []
app.use(requestTime)
app.use(logger)

//корневой запрос
app.get('/', (req, res) => {
    res.render('index', {   title: 'Catalogue',
                                        active: 'index',
                                        laptops: app.locals.laptops})
})

app.post('/', async (req, res) => {
    app.locals.laptops = await loadLaptops()
    app.locals.laptops = applyFilters(app.locals.laptops, req.body)
    res.redirect('/')
})

//запрос информационной страницы
app.get('/about', (req, res) => {
    res.render('about', {   title: 'About',
                                        active: 'about'})
})

app.listen(PORT, async () => {
    console.log(`Server has been started on port ${PORT}...`)
    app.locals.laptops = await loadLaptops()
    /*console.log(app.locals.laptops)*/
})
