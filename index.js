import express from 'express'
import {requestTime, logger} from './middlewares.js'
import {loadLaptops} from './db/laptopsModule.js'

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

//вопросс: сохранится ли содержимое data[] при перезагрузке страницы? если нет, придется:
// в апп.пост(форм): форму запроса сохранять в файл
// в апп.гет считывать файл с ноутбуками
// фильтерить и выводить
app.listen(PORT, async () => {
    console.log(`Server has been started on port ${PORT}...`)
    //тут сделать инит массива
    const laptops = await loadLaptops()
    console.log(laptops)
})
