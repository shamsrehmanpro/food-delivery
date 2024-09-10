import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/FoodRoute.js'
import userRouter from './routes/userRoute.js'
import dotenv from 'dotenv';
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
dotenv.config();

//app config
const app = express()
const port = process.env.PORT || 4000



//middleware
app.use(express.json()) //allows us to parse incomming requests: req.body

app.use(cors())

//db connection
connectDB() ;

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get('/', (req, res) => {
res.send('Api is working')
})

app.listen(port, ()=>{
    console.log(`app is listening on ${port}`);
})

//mongodb+srv://hk5470703:<password>@cluster0.gyqfx3t.mongodb.net/?