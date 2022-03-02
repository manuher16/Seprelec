import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Collec from "../models/collection";
import Permission from "../models/permissions";

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

const collections = Object.keys(mongoose.connections[0].collections);
collections.forEach(collection => {
    const tempCollection = new Collec({
        name: collection,
        description: '',
    })
    const tempPermission = new Permission({
        name: collection,
        description: '',
    })
    tempPermission.save().then(() => {
        console.log(`Permission ${collection} created`);
    }).catch(err => {
    })
    tempCollection.save().then(() => {
        console.log(`Collection ${collection} created`);
    }).catch(err => {
    })
});