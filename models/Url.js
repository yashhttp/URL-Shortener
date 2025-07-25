import mongoose  from "mongoose";
// import { url} from '../models/Url.js';

const urlSchema = new mongoose.Schema({
    shortCode : String,
    longUrl : String
})

export const url = mongoose.model('shortURL', urlSchema)