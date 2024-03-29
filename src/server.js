import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoutes from './route/web'
import path from 'path'

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1111;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))

// setup view engine.
configViewEngine(app)

// init all web routes.
initWebRoutes(app)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})