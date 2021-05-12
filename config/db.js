import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex : true,
            useFindAndModify: false
        })
        console.log('database connected')
    } catch (error) {
        console.log('some error occured while connecting to the database', error)
    }
}

export default connectDB;