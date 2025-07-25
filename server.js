import express from 'express';
import mongoose  from 'mongoose';
import { shortUrl, getoriginalUrl } from './Controllers/url.js'

const app = express()
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://yashsainishamli12:TxJP1flsNeC9JNCb@cluster0.iwqzpkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    dbName: "urlshorterner"
}).then(()=>{console.log("connected to db")}).catch((err)=>{console.log("error is", err)})
//rendering ejs files
app.get('/', (req,res)=>{
    res.render("index.ejs", {shortUrl : null})
})

//short url logic
app.post('/short', shortUrl)

// redirect or original url : dynamic routing
app.get('/:shortCode', getoriginalUrl)
const port = 1000
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})