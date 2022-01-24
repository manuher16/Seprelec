import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const uri = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.bdi5y.mongodb.net/${process.env.NAME_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connected to database ${process.env.NAME_DATABASE}`);
}).catch(err => {
    console.log(err);
});