import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://hk5470703:5470703@cluster0.gyqfx3t.mongodb.net/food-del').then(()=>console.log("DB is connected"));
}
