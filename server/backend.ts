require('dotenv').config({path: '../client/.env'});
import router from './routes'
import express from 'express';
const cors = require('cors')
const cookies = require('cookie-parser')

const app = express()
// const port: any = process.env.REACT_APP_PORT
// const host: any = process.env.REACT_APP_HOST
const port: any = 3060
const host: any = 'localhost'

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(cookies());
app.use(express.json());
app.use(cors(corsOptions))
app.use(router)

// app.get('/', function(req: any, res: { render: (arg0: string) => void; }) {
//     res.render('signin.html');
// });

// listen
app.listen(port, host, () => {
    console.log(`Management system working on: ${host}:${port}`)
})
