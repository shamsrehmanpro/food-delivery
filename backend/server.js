import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/FoodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB() ;

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)

app.get('/', (req, res) => {
res.send('Api is working')
})

app.listen(port, ()=>{
    console.log(`app is listening on ${port}`);
})

//mongodb+srv://hk5470703:<password>@cluster0.gyqfx3t.mongodb.net/?