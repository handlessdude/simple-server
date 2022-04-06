import express from 'express'
//import path from 'path'
import {requestTime, logger} from './middlewares.js'

//const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000
const app = express()

app.set('view engine', 'ejs')

/*app.use(express.static(path.resolve(__dirname, 'static')))*/
app.use(requestTime)
app.use(logger)

app.get('/', (req, res) => {
    res.render('index', {title: 'Main Page', active: 'index'})
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})