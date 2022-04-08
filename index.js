import express from 'express'
//import path from 'path'
import {requestTime, logger} from './middlewares.js'



const PORT = process.env.PORT ?? 3000
const app = express()
app.set('view engine', 'ejs')

//const __dirname = path.resolve()
/*app.use(express.static(path.resolve(__dirname, 'static')))*/
app.use(requestTime)
app.use(logger)

//корневой запрос
app.get('/', (req, res) => {
    res.render('index', {   title: 'Home',
                                        active: 'index'})
})
//запрос информационной страницы
app.get('/about', (req, res) => {
    res.render('about', {   title: 'About',
                                        active: 'about'})
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})
